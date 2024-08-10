<script lang="ts" setup>

import {useRoute} from "vue-router";
import {useProductsStore} from "@/stores/products_store";

const route = useRoute()

const product = useProductsStore().getProduct(route.params.id as string)

</script>

<template>
  <div v-if="product">
    <h1>Product {{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>{{ product.price }} ETH</p>
  </div>

  <div v-else>
    <h1>Loading...</h1>
  </div>

</template>
