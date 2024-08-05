<script lang="ts" setup>
import {useAccount, useDisconnect} from "@wagmi/vue";
import Address from "@/components/Address.vue";

const {address, isConnected} = useAccount()
const {disconnect} = useDisconnect();

</script>

<template>
  <v-app-bar rounded>
    <v-app-bar-title>
      VeriPay
    </v-app-bar-title>

    <template v-slot:append>
      <div class="mr-4">
        <template v-if="isConnected">
          <v-btn size="big">
            <Address :address="address!">
            </Address>

            <v-menu activator="parent">
              <v-list>

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
          <v-btn>
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
