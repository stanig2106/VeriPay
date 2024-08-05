<script lang="ts" setup>
import Header from "@/layouts/header.vue";
import {watchConnections} from '@wagmi/core'


import {config} from "@/plugins/wagmi";
import {useSignatureStore} from "@/stores/signature_store";
import {useAccount} from "@wagmi/vue";
import {waitRef} from "@/utils/reactivity";

const {updateSignature, getSignature} = useSignatureStore()

const {address} = useAccount()

const signature = getSignature(address)

watchConnections(config, {
  async onChange() {
    await waitRef(address, 'infinite', false)
    await updateSignature(address)
  }
})


</script>

<template>

  <v-app>
    <v-main>
      <Header/>
      <router-view/>
      {{ signature }}
    </v-main>
  </v-app>
</template>

<style lang="scss">
</style>
