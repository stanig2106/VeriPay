<script lang="ts" setup>

import {useRoute} from "vue-router";
import {useProductsStore} from "@/stores/products_store";
import {baseSepolia, optimismSepolia} from "@wagmi/vue/chains";
import router from "@/router";

const route = useRoute()

const product = useProductsStore().getProduct(route.params.id as string)

// Debugging
//@ts-ignore
window.removeProduct = () => {
  useProductsStore().removeProduct(route.params.id as string)
  router.push('/products')
}

</script>

<template>
  <div v-if="product">
    <h1>Product {{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>{{ product.price }} ETH</p>

    <div class="flex space-x-4 mt-4">
      <v-btn v-if="product.chainId == 0 || product.chainId == baseSepolia.id">
        Buy on base
      </v-btn>
      <v-btn
          v-if="product.chainId == 0 || product.chainId == optimismSepolia.id">
        Buy on optimism
      </v-btn>
    </div>


  </div>

  <div v-else>
    <h1>Loading...</h1>
  </div>

</template>
