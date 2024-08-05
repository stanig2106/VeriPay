<script setup lang="ts">
import { useConnect, useChainId } from '@wagmi/vue';

const chainId = useChainId();
const { connectors, connect } = useConnect();
</script>

<template>
  <v-btn
      v-for="connector in connectors"
      @click="connect({ connector, chainId })"
  >
    {{ connector.name }}
  </v-btn>
</template>
