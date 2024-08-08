<script lang="ts" setup>
import ProductCard from "@/components/ProductCard.vue";

</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-bold">Products</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard
          :name="'Product 1'"
          category="🎮 Gaming"
          :price="0.1"
          :image="['https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
              'https://cdn.vuetifyjs.com/images/carousel/sky.jpg']"
      />

    </div>

  </div>
</template>
