import {createConfig, http, WagmiPlugin} from '@wagmi/vue'
import {base, baseSepolia, localhost, optimismSepolia} from '@wagmi/vue/chains'
import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query'


import {App} from "vue";
import {mainnet} from "viem/chains";

export const config = createConfig({
    chains: [baseSepolia, optimismSepolia, mainnet, localhost],
    transports: {
        [baseSepolia.id]: http(),
        [optimismSepolia.id]: http(),
        [base.id]: http(), // for production
        [mainnet.id]: http(), // for ens resolving only !
        [localhost.id]: http('http://localhost:8545'),
    },
})


const queryClient = new QueryClient()

export default function install_wagmi(app: App) {
    app.use(WagmiPlugin, {config})
        .use(VueQueryPlugin, {queryClient})

}
