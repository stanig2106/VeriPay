import {createConfig, http, WagmiPlugin} from '@wagmi/vue'
import {mainnet} from '@wagmi/vue/chains'
import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query'


import {App} from "vue";

export const config = createConfig({
    chains: [mainnet],
    connectors: [
    ],
    transports: {
        [mainnet.id]: http(),
    },
})


const queryClient = new QueryClient()

export default function install_wagmi(app: App) {
    app.use(WagmiPlugin, {config})
        .use(VueQueryPlugin, {queryClient})

}
