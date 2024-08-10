<script lang="ts" setup>
import Header from "@/layouts/header.vue";
import {watchConnections} from '@wagmi/core'


import {config} from "@/plugins/wagmi";
import {useSignatureStore} from "@/stores/signature_store";
import {useAccount} from "@wagmi/vue";
import {waitRef} from "@/utils/reactivity";
import {gunAuth} from "@/plugins/gun";

const {updateSignature, getSignature} = useSignatureStore()

const {address} = useAccount()

watchConnections(config, {
  async onChange(connection, prevConnection) {
    await waitRef(address, 'infinite', false)
    await updateSignature(address)
    console.log('Gun auth : ' + address.value + ' password : ' + getSignature(address).value)

    if (address.value && getSignature(address).value)
      gunAuth(address.value!, getSignature(address).value!).then((res) => {
        console.log('Gun auth : ', res)
      }).catch((err) => {
        console.log('Gun auth : ' + err)
      })

  }
})


</script>

<template>

  <v-app>
    <v-main>
      <Header/>
      <div class="p-4">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss">
</style>
