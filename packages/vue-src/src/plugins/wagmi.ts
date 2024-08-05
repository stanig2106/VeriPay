import {createConfig, http, WagmiPlugin} from '@wagmi/vue'
import {base, baseSepolia} from '@wagmi/vue/chains'
import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query'


import {App} from "vue";

export const config = createConfig({
    chains: [baseSepolia],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
    },
})


const queryClient = new QueryClient()

export default function install_wagmi(app: App) {
    app.use(WagmiPlugin, {config})
        .use(VueQueryPlugin, {queryClient})

}
