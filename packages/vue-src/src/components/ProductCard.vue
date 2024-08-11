<script lang="ts" setup>
// product card
import router from "@/router";

const props = defineProps<{
  id: string,
  name: string,
  price: number,
  description: string
  // image: string[],
  // category: string
}>();
</script>

<template>

  <v-card>
    <!--
        <v-carousel cycle height="200"
                    hide-delimiter-background
                    show-arrows="hover">
          <v-carousel-item
              v-for="(image, i) in props.image"
              :key="i">
            <img :src="image" alt="Product" class="w-full h-full object-contain
            object-center">
          </v-carousel-item>
        </v-carousel>
    -->

    <v-card-title>
      <h2 class="font-bold">
        <a class="hover:underline" href="javascript:// Go to product"
           @click="router.push(`/products/${props.id}`)">
          {{ props.name }}
        </a>
      </h2>
    </v-card-title>

    <v-card-subtitle class="mb-3">
      <div class="text-wrap w-full">
        {{ props.description }}

      </div>
      <div class="flex justify-between items-center">
        <!--        <v-chip>{{ props.category }}</v-chip>-->
        <span class="text-muted mt-1">{{ props.price }} ETH</span>
      </div>
    </v-card-subtitle>
  </v-card>

</template>
