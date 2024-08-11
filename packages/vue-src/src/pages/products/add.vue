<script lang="ts" setup>
import {ref} from 'vue';
import {Product, useProductsStore} from "@/stores/products_store";
import {useAccount} from "@wagmi/vue";
import {storeToRefs} from "pinia";
import {useIdentityStore} from "@/stores/identity_store";
import {baseSepolia, optimismSepolia} from "@wagmi/vue/chains";

const {addProduct} = useProductsStore();

// Create refs for each form field
const productName = ref('');
const productPrice = ref<number | null>(null);
const productDescription = ref('');
const {address, isConnected} = useAccount()


const loading = ref(false)
const doneId = ref('')


const {isVerified} = storeToRefs(useIdentityStore())

// Submit form data
const submitForm = async () => {
  if (
      productName.value &&
      productPrice.value &&
      productDescription.value
  ) {
    loading.value = true
    doneId.value = await addProduct({
      name: productName.value,
      price: productPrice.value!,
      description: productDescription.value,
      seller: address.value!,
      chainId: chain.value as Product['chainId']
    });
    loading.value = false
    productName.value = ''
    productPrice.value = null
    productDescription.value = ''
  } else {
    alert('Please fill in all the fields in the form.');
  }
};

const chains = [
  {title: 'Any chain', value: 0},
  {title: 'Base Sepolia', value: baseSepolia.id},
  {title: 'Optimism Sepolia', value: optimismSepolia.id}
]
const chain = ref(chains[0].value)

</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-bold mb-4">Add a Product</h1>
    <v-form ref="form" :disabled="loading || !isConnected || !isVerified"
            @submit.prevent="submitForm">

      <v-alert v-if="!isConnected" class="mb-4" type="error">
        Please connect your wallet to add a product.
      </v-alert>
      <v-alert v-if="!isVerified" class="mb-4" type="error">
        Please
        <router-link class="link" to="/identity">verify</router-link>
        your identity to add a product.
      </v-alert>


      <v-alert v-if="doneId" class="mb-4" type="success">
        Product added successfully, see it
        <router-link :to="`/products/${doneId}`" class="link text-white">
          here
        </router-link>
      </v-alert>
      <v-text-field
          v-model="productName"
          label="Product Name"
          outlined
          required
      ></v-text-field>

      <v-text-field
          v-model.number="productPrice"
          label="Price (in ETH)"
          outlined
          required
          type="number"
      ></v-text-field>

      <v-textarea
          v-model="productDescription"
          label="Description"
          outlined
          required
      ></v-textarea>

      <v-file-input
          label="Image (Not implemented now)"
          outlined
          readonly
          required
      ></v-file-input>

      <v-select v-model="chain" :items="chains"
                label="On witch chain you want to get payed" outlined/>


      <v-btn class="mt-4" color="primary" type="submit">Add Product</v-btn>
    </v-form>

  </div>
</template>
