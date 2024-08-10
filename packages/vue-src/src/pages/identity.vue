<script lang="ts" setup>

import '@worldcoin/idkit-standalone'
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useAccount, useWriteContract, useSwitchChain} from "@wagmi/vue";
import {baseSepolia, optimismSepolia} from "@wagmi/vue/chains";
import {decodeAbiParameters, parseAbiParameters} from 'viem'
import {useIdentityStore} from "@/stores/identity_store";
import {storeToRefs} from "pinia";
import BaseVeriPayContractAbi
  from "@/contracts/baseSepolia/VeriPayContract.abi";
import BaseVeriPayContractAddress
  from "@/contracts/baseSepolia/VeriPayContract.address";
import OpVeriPayContractAbi
  from "@/contracts/optimismSepolia/VeriPayContract.abi";
import OpVeriPayContractAddress
  from "@/contracts/optimismSepolia/VeriPayContract.address";
import router from "@/router";


declare global {
  interface Window {
    IDKit: any
  }
}
const {address, chainId: currentChainId} = useAccount()
const {writeContractAsync} = useWriteContract()
const {chains: allowedChain, switchChain} = useSwitchChain()
const loading = ref(false)

const error = ref<string | null>(null)

if (!window.IDKit.isInitialized)
  window.IDKit.init({
    app_id: 'app_staging_7af85f0adf7afaf3d1428c5fb49d328f',
    action: 'verify-id',
    signal: address.value,
    onSuccess: async (e: any) => {
      console.log('success', e)
      const args = [
        address.value, // signal
        BigInt(e!.merkle_root),
        BigInt(e!.nullifier_hash),
        decodeAbiParameters(
            parseAbiParameters('uint256[8]'),
            e!.proof
        )[0],
      ]

      loading.value = true
      console.log("Sending with", chain.value)
      const data = await writeContractAsync({
        abi: chain.value.id === optimismSepolia.id ? OpVeriPayContractAbi : BaseVeriPayContractAbi,
        address: chain.value.id === optimismSepolia.id ? OpVeriPayContractAddress : BaseVeriPayContractAddress,
        chain: chain.value,
        chainId: chain.value.id,
        functionName: 'verifyId',
        args
      }).catch((e) => {
        console.error(e)
        error.value = 'The verification failed, It could be that you have already verified ' +
            'your identity with another address or that the process was interrupted. ' +
            'Please try again.'
        return null
      })
      if (data)
        router.go(0)
      loading.value = false
    },
  })

async function verify() {
  await window.IDKit.open()
}

onMounted(() => {
  document.querySelector('header')?.classList.add('!z-10')
})
onUnmounted(() => {
  document.querySelector('header')?.classList.remove('!z-10')
})


const {isVerified, fetching} = storeToRefs(useIdentityStore())

const chains = [
  {title: 'Base Sepolia', value: baseSepolia},
  {title: 'Optimism Sepolia', value: optimismSepolia}
].filter((c) => allowedChain.value.some((ac) => ac.id === c.value.id))
const chain = ref(
    (chains.find((c) => c.value.id === currentChainId.value)?.value as
        typeof chains[number]['value']) ?? chains[0].value)

watch(chain, async () => {
  switchChain({chainId: chain.value.id})
}, {immediate: true})

watch(currentChainId, () => {
  chain.value = currentChainId.value === baseSepolia.id ? baseSepolia : optimismSepolia
}, {immediate: true})

</script>

<template>
  <div>
    <h1 class="font-bold text-3xl ml-4 mt-4">
      Identity
    </h1>

    <v-alert v-if="error" class="max-w-4xl mx-auto mt-4" type="error">
      {{ error }}
    </v-alert>
    <div class="max-w-4xl mx-auto px-6 mt-4">
      <!--      explain that the account have to be verify with world id to ensure that personne doesnt abuse of the platform-->
      <div class="flex flex-col gap-2">
        <p>
          To ensure that the platform is not abused, we require that you verify
          your identity with WorldID.
        </p>
        <p>
          WorldID is a decentralized identity system that allows you to verify
          your identity without sharing your personal information.
        </p>
        <p>
          To verify your identity, click the button below.
        </p>
        <div class="text-center mt-2">
          <div class="flex justify-center">
            <div class="w-[400px] grow-0">
              <v-select v-if="!isVerified" v-model="chain" :items="chains"
                        :loading="fetching || loading"
                        label="On witch chain you want to verify" outlined/>
            </div>
          </div>
          <v-btn v-if="!isVerified" :loading="fetching || loading"
                 class="font-bold"
                 color="black" @click="verify()">
            Verify with World ID
          </v-btn>

          <div v-else>
            <p class="text-green-500">You are verified, enjoy the platform</p>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

