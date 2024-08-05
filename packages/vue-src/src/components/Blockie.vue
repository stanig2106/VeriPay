<script lang="ts" setup>
import { computed } from 'vue'
import * as blockies from 'blockies-ts'

const props = defineProps<{
  address: string
  size?: string
}>()

const size = props.size || '10'

const blockieSrc = computed(() => {
  return blockies.create({ seed: props.address }).toDataURL()
})
</script>

<template>
  <div class="flex">
    <img :src="blockieSrc" :class="`!w-${size} !h-${size}`" alt="pp"
      class="aspect-square"
    />
  </div>
</template>

