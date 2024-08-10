/// <reference types="vite/client" />

import {MetaMaskInpageProvider} from "@metamask/providers";

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import {config} from "@/plugins/wagmi";
declare module '@wagmi/vue' {

  interface Register {
    config: typeof config
  }
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

