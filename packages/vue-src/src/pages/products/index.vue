<script lang="ts" setup>
import ProductCard from "@/components/ProductCard.vue";
import {useProductsStore} from "@/stores/products_store";
import {storeToRefs} from "pinia";

const {products} = storeToRefs(useProductsStore());

</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-bold">Products</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <ProductCard v-for="product in products" :id="product.id"
                   :key="product.id"
                   :description="product.description"
                   :name="product.name"
                   :price="product.price"
      />
    </div>

  </div>
</template>
