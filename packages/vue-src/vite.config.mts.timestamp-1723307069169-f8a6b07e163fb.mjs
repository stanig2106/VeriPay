// vite.config.mts
import Components from "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/node_modules/unplugin-vue-components/dist/vite.js";
import Vue from "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Vuetify, { transformAssetUrls } from "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/node_modules/vite-plugin-vuetify/dist/index.mjs";
import ViteFonts from "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/node_modules/unplugin-fonts/dist/vite.mjs";
import VueRouter from "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig } from "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/packages/vue-src/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///Users/stani/Documents/blockchain/superhack2024/VeriPay/packages/vue-src/vite.config.mts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    })
  ],
  define: {
    "process.env": {
      DEV: process.env.NODE_ENV !== "production"
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3N0YW5pL0RvY3VtZW50cy9ibG9ja2NoYWluL3N1cGVyaGFjazIwMjQvVmVyaVBheS9wYWNrYWdlcy92dWUtc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3RhbmkvRG9jdW1lbnRzL2Jsb2NrY2hhaW4vc3VwZXJoYWNrMjAyNC9WZXJpUGF5L3BhY2thZ2VzL3Z1ZS1zcmMvdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zdGFuaS9Eb2N1bWVudHMvYmxvY2tjaGFpbi9zdXBlcmhhY2syMDI0L1ZlcmlQYXkvcGFja2FnZXMvdnVlLXNyYy92aXRlLmNvbmZpZy5tdHNcIjsvLyBQbHVnaW5zXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBWdWV0aWZ5LCB7IHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknO1xuaW1wb3J0IFZpdGVGb250cyBmcm9tICd1bnBsdWdpbi1mb250cy92aXRlJztcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJztcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBWdWVSb3V0ZXIoKSxcbiAgICBWdWUoe1xuICAgICAgdGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH1cbiAgICB9KSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnktbG9hZGVyL3RyZWUvbWFzdGVyL3BhY2thZ2VzL3ZpdGUtcGx1Z2luI3JlYWRtZVxuICAgIFZ1ZXRpZnkoe1xuICAgICAgYXV0b0ltcG9ydDogdHJ1ZSxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBjb25maWdGaWxlOiAnc3JjL3N0eWxlcy9zZXR0aW5ncy5zY3NzJ1xuICAgICAgfVxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoKSxcbiAgICBWaXRlRm9udHMoe1xuICAgICAgZ29vZ2xlOiB7XG4gICAgICAgIGZhbWlsaWVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1JvYm90bycsXG4gICAgICAgICAgICBzdHlsZXM6ICd3Z2h0QDEwMDszMDA7NDAwOzUwMDs3MDA7OTAwJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudic6IHtcbiAgICAgIERFVjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH0sXG4gICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmpzb24nLCAnLmpzeCcsICcubWpzJywgJy50cycsICcudHN4JywgJy52dWUnXVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVcsMEJBQTBCO0FBQzVDLE9BQU8sZUFBZTtBQUN0QixPQUFPLGVBQWU7QUFHdEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlLFdBQVc7QUFUc04sSUFBTSwyQ0FBMkM7QUFZMVMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsSUFBSTtBQUFBLE1BQ0YsVUFBVSxFQUFFLG1CQUFtQjtBQUFBLElBQ2pDLENBQUM7QUFBQTtBQUFBLElBRUQsUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ04sWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxNQUNSLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxVQUNSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsVUFDVjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZTtBQUFBLE1BQ2IsS0FBSyxRQUFRLElBQUksYUFBYTtBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sU0FBUyxRQUFRLFFBQVEsT0FBTyxRQUFRLE1BQU07QUFBQSxFQUNwRTtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
