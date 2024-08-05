<script lang="ts" setup>
import axios from 'axios';
import router from "@/router";
import { useAccount, useEnsName } from '@wagmi/vue'


const w = window;


const { address, isConnected } = useAccount()
const { data, error, status } = useEnsName({ address })

</script>

<template>
  <div>
    hello
  </div>
<!--
  <div class="flex flex-col items-start">
    hello
    <v-btn color="primary" variant="outlined" @click="router.push('/about')">
      Go to About
    </v-btn>

    <v-btn
        @click="() => axios.get('/').then(({ data }) => w.alert(data.hello))">
      Test Axios
    </v-btn>
  </div>

  <div v-if="status === 'pending'">Loading ENS name</div>
  <div v-else-if="status === 'error'">
    Error fetching ENS name: {{error!.message}}
  </div>
  <div v-else>ENS name: {{data}}</div>

  <Account v-if="isConnected" />
  <Connect v-else />
-->


</template>
