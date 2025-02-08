import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
      },
    }),
    vuetify(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 8888,
    host: true,
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'en/app/js/[name].js',
        entryFileNames: 'en/app/js/[name].js',
        assetFileNames: 'en/app/[ext]/[name].[ext]',
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : undefined,
    sourcemap: process.env.NODE_ENV === 'development',
    keepNames: true,
  },
});
