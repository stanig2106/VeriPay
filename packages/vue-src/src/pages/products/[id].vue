<script lang="ts" setup>

import {useRoute} from "vue-router";
import {useProductsStore} from "@/stores/products_store";
import {baseSepolia, optimismSepolia} from "@wagmi/vue/chains";
import router from "@/router";
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWriteContract
} from "@wagmi/vue";
import BaseVeriPayContractAbi
  from "@/contracts/baseSepolia/VeriPayContract.abi";
import BaseVeriPayContractAddress
  from "@/contracts/baseSepolia/VeriPayContract.address";
import OpVeriPayContractAbi
  from "@/contracts/optimismSepolia/VeriPayContract.abi";
import OpVeriPayContractAddress
  from "@/contracts/optimismSepolia/VeriPayContract.address";
import {computed, ComputedRef} from "vue";

const route = useRoute()

const product = useProductsStore().getProduct(route.params.id as string)
const {switchChainAsync} = useSwitchChain()
const {address} = useAccount()

// Debugging
//@ts-ignore
window.removeProduct = () => {
  useProductsStore().removeProduct(route.params.id as string)
  router.push('/products')
}

const baseChainProduct = useReadContract({
  abi: BaseVeriPayContractAbi,
  address: BaseVeriPayContractAddress,
  chainId: baseSepolia.id,
  functionName: 'getProductId',
  args: [route.params.id]
})

const optimismChainProduct = useReadContract({
  abi: OpVeriPayContractAbi,
  address: OpVeriPayContractAddress,
  chainId: optimismSepolia.id,
  functionName: 'getProductId',
  args: [route.params.id]
})

function isPresent(obj: any) {
  return obj && obj.timestamp != 0n
}

const soldOnBase = computed(() => isPresent(baseChainProduct.data.value))
const soldOnOptimism = computed(() => isPresent(optimismChainProduct.data.value))

const onBase = computed(() => product.value?.chainId == 0 ||
    product.value?.chainId == baseSepolia.id)

const onOptimism = computed(() => product.value?.chainId == 0 ||
    product.value?.chainId == optimismSepolia.id)
const on: ComputedRef<any> = computed(() => isPresent(baseChainProduct.data.value) ? baseChainProduct.data.value :
    isPresent(optimismChainProduct.data.value) ? optimismChainProduct.data.value : null)


const {writeContractAsync} = useWriteContract()

async function buy(chain: typeof baseSepolia | typeof optimismSepolia) {
  await switchChainAsync({chainId: chain.id})
  writeContractAsync({
    abi: chain.id === optimismSepolia.id ? OpVeriPayContractAbi : BaseVeriPayContractAbi,
    address: chain.id === optimismSepolia.id ? OpVeriPayContractAddress : BaseVeriPayContractAddress,
    chain,
    chainId: chain.id,
    functionName: 'createProduct',
    // id, price (convert to wei), seller
    args: [route.params.id, BigInt(product.value!.price * 1e18), product.value!.seller],
    value: BigInt(product.value!.price * 1e18)
  }).then(() => {
    router.push('/awaiting')
  })
}

async function confirmTransaction(type: 'buyer' | 'seller') {
  // verify timestamp in case of double sell
  await switchChainAsync({chainId: soldOnBase.value ? baseSepolia.id : optimismSepolia.id})
  await writeContractAsync({
    abi: soldOnBase.value ? BaseVeriPayContractAbi : OpVeriPayContractAbi,
    address: soldOnBase.value ? BaseVeriPayContractAddress : OpVeriPayContractAddress,
    chain: soldOnBase.value ? baseSepolia : optimismSepolia,
    chainId: soldOnBase.value ? baseSepolia.id : optimismSepolia.id,
    functionName: type + 'Validate',
    args: [route.params.id]
  })
  router.go(0)
}

async function claim() {
  await switchChainAsync({chainId: soldOnBase.value ? baseSepolia.id : optimismSepolia.id})
  await writeContractAsync({
    abi: soldOnBase.value ? BaseVeriPayContractAbi : OpVeriPayContractAbi,
    address: soldOnBase.value ? BaseVeriPayContractAddress : OpVeriPayContractAddress,
    chain: soldOnBase.value ? baseSepolia : optimismSepolia,
    chainId: soldOnBase.value ? baseSepolia.id : optimismSepolia.id,
    functionName: 'sellerClaim',
    args: [route.params.id]
  })
  await useProductsStore().removeProduct(route.params.id as string)
  router.push('/products')
}
</script>

<template>
  <div v-if="!address">
    <h1>You need to connect your wallet to view this page</h1>
  </div>

  <div v-else-if="product">
    <h1>Product {{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>{{ product.price }} ETH</p>

    <hr class="my-4 border border-black">
    <template v-if="soldOnBase && onBase || soldOnOptimism && onOptimism">

      <div v-if="on?.buyer == address">
        <h2>You bought this product</h2>
        <p v-if="!on?.sellerValidation">
          Waiting for the seller to confirm the transaction
        </p>

        <template v-else-if="!on?.buyerValidation">
          <p>
            The seller has confirmed the transaction, validate the transaction
            once you have received the product
          </p>
          <v-btn @click="confirmTransaction('buyer')">
            Confirm transaction
          </v-btn>
        </template>

        <template v-else>
          <p>
            You have confirmed the transaction, the seller will receive the
            funds
          </p>
        </template>

      </div>

      <div v-else-if="on?.seller == address">
        <template v-if="!on?.sellerValidation">
          <!-- TODO: check that all info are good !, price, chain etcc -->
          <h2>Someone bought this product</h2>
          <v-btn @click="confirmTransaction('seller')">Confirm transaction
          </v-btn>
        </template>
        <template v-else-if="!on?.buyerValidation">
          <h2>You sold this product</h2>
          <p>
            Ship the product to the buyer, once he recieves it, he will
            confirm the transaction and you will be able to claim your funds
          </p>
        </template>
        <template v-else>
          <h2>You sold this product</h2>
          <p>
            The buyer has confirmed the transaction, you can now claim your
            funds
          </p>
          <v-btn @click="claim">Claim funds</v-btn>
        </template>
      </div>

      <div v-else>
        <h2>Sorry, a transaction is pending for this product</h2>
        <p>Check back later</p>
      </div>
    </template>


    <div v-else-if="address && product.seller != address"
         class="flex space-x-4 mt-4">
      <v-btn v-if="onBase" :loading="!baseChainProduct.isFetched"
             @click="buy(baseSepolia)">
        Buy on base
      </v-btn>
      <v-btn
          v-if="onOptimism" :loading="!optimismChainProduct.isFetched"
          @click="buy(optimismSepolia)">
        Buy on optimism
      </v-btn>
    </div>

  </div>

  <div v-else>
    <h1>Loading...</h1>
  </div>

</template>
