<script lang="ts" setup>

import '@worldcoin/idkit-standalone'
import {onMounted, onUnmounted} from "vue";
import {useAccount, useWriteContract} from "@wagmi/vue";
import {baseSepolia} from "@wagmi/vue/chains";
import VeriPayContractAbi from "@/contracts/VeriPayContract.abi";
import VeriPayContractAddress from "@/contracts/VeriPayContract.address";
import {decodeAbiParameters, parseAbiParameters} from 'viem'


declare global {
  interface Window {
    IDKit: any
  }
}
const {address} = useAccount()
const {writeContractAsync} = useWriteContract()

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
      console.log(args)

      const write = await writeContractAsync({
        abi: VeriPayContractAbi,
        address: VeriPayContractAddress,
        chain: baseSepolia,
        chainId: baseSepolia.id,
        functionName: 'verifyId',
        args
      })
      console.log(write)


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
</script>

<template>
  <div>
    <h1 class="font-bold text-3xl ml-4 mt-4">
      Identity
    </h1>

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
          <v-btn class="font-bold" color="black" @click="verify()">
            Verify with World ID
          </v-btn>
        </div>
      </div>

    </div>
  </div>

</template>

