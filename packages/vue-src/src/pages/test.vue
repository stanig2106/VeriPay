<script lang="ts" setup>
import {ref} from 'vue';
import YourContractABI from '@/contracts/YourContract.abi';
import contractAddress from '@/contracts/YourContract.address';

import {useReadContract, useWriteContract} from '@wagmi/vue'
import {baseSepolia} from "@wagmi/vue/chains";

const wantedPurpose = ref('')
const {data: purpose, error} = useReadContract({
  abi: YourContractABI,
  address: contractAddress,
  chainId: baseSepolia.id,
  functionName: 'getPurpose',
})

const {writeContractAsync} = useWriteContract()

async function updatePurpose() {
  const write = await writeContractAsync({
    abi: YourContractABI,
    address: contractAddress,
    chain: baseSepolia,
    chainId: baseSepolia.id,
    functionName: 'setPurpose',
    args: [wantedPurpose.value],
  })
  console.log(write)


}

</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-bold">Test</h1>

    <v-text-field v-model="wantedPurpose" label="Update value"/>
    <v-btn @click="updatePurpose">
      Update
    </v-btn>

    <p>Current Purpose: {{ purpose }}</p>
    <p>Error: {{ error }}</p>
  </div>
</template>
