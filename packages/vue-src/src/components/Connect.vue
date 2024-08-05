<script setup lang="ts">
import { useConnect, useChainId } from '@wagmi/vue';

const chainId = useChainId();
const { connectors, connect } = useConnect();
</script>

<template>
  <div class="flex gap-4 flex-col max-w-64">

  <v-btn
      v-for="connector in connectors"
      @click="connect({ connector, chainId })"
      :key="connector.uid"
  >
    Connect with {{ connector.name }}
  </v-btn>
  </div>
</template>
