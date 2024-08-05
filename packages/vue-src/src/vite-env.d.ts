/// <reference types="vite/client" />

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
