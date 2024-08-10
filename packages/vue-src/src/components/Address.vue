<script lang="ts" setup>
import {ref, computed, watch} from 'vue'
import Blockie from './Blockie.vue'
import {useEnsName} from "@wagmi/vue";
import {mainnet} from "viem/chains";

const props = defineProps<{
  address: `0x${string}`
  size?: 'short' | 'long'
  small?: boolean
}>()

const ens = useEnsName({
  address: computed(() => props.address),
  chainId: mainnet.id,
})

const copying = ref(false)

const displayAddress = computed(() => {
  if (!props.address)
    return ''

  if (props.size === 'short')
    return props.address.slice(-4)

  if (props.size === 'long')
    return props.address

  return props.address.slice(0, 6)
})

let timeout: NodeJS.Timeout | undefined = undefined

async function copy() {
  copying.value = true;
  clearTimeout(timeout)

  await navigator.clipboard.writeText(props.address || '')
  timeout = setTimeout(() => {
    copying.value = false
  }, 1000)
}

const ensCache =
    localStorage.getItem(`ens-${props.address}`)

watch(ens.data, (value) => {
  if (value)
    localStorage.setItem(`ens-${props.address}`, value)
  else
    localStorage.removeItem(`ens-${props.address}`)
})
</script>

<template>
  <div class="flex items-center gap-2 px-2">

    <v-icon
        :icon="copying ? 'mdi-clipboard-check-outline' : 'mdi-clipboard-file-outline'"
        @click.stop="copy"/>
    <span :class="{ 'text-2xl': !small }" class="font-bold mb-1">
      {{ ens.data.value || ensCache || displayAddress }}
    </span>
    <Blockie :address="address" :size="small ? '6' : '10'" class="shrink-0"/>
  </div>
</template>

