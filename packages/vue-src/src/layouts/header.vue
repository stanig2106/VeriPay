<script lang="ts" setup>
import {
  useAccount,
  useDisconnect,
} from "@wagmi/vue";
import Address from "@/components/Address.vue";
import router from "@/router";
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useIdentityStore} from "@/stores/identity_store";

const {address, isConnected} = useAccount()
const {disconnect} = useDisconnect();

const {isVerified} = storeToRefs(useIdentityStore())


const firstWatch = ref(true)
watch(isConnected, () => {
  if (firstWatch.value)
    firstWatch.value = false
  else
    router.go(0)
})

</script>

<template>
  <v-app-bar rounded>
    <v-app-bar-title>
      <div class="w-full flex gap-4 items-center">
        <v-btn class="font-bold" @click="router.push('/')">
          VeriPay
        </v-btn>
        <v-btn prepend-icon="mdi-cash" @click="router.push('/products')">
          Products
        </v-btn>
        <v-btn prepend-icon="mdi-plus" @click="router.push('/products/add')">
          Add a product
        </v-btn>
      </div>
    </v-app-bar-title>

    <template v-slot:append>
      <div class="mr-4">
        <template v-if="isConnected">
          <v-btn size="big">
            <Address :address="address!">
            </Address>

            <v-menu activator="parent">
              <v-list>
                <v-list-item value="identity"
                             @click="() => router.push('/identity')">
                  <v-list-item-title>
                    <div class="flex items-center w-full justify-between">
                      Prove your identity

                      <v-badge :color="isVerified ? 'green' : 'red'" inline/>
                    </div>
                  </v-list-item-title>
                </v-list-item>


                <v-list-item value="disconnect" @click="disconnect()">
                  <v-list-item-title>
                    Disconnect
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>

        <template v-else>
          <v-btn @click="firstWatch = false">
            Connect
            <v-dialog activator="parent" width="500">
              <v-card>
                <v-card-title>
                  Connect
                </v-card-title>
                <v-card-text>
                  <Connect/>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-btn>
        </template>
      </div>
    </template>
  </v-app-bar>
</template>
