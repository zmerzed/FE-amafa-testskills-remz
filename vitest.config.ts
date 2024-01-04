import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
    AutoImport({
      imports: [
        'vitest',
        'vue',
        {
          '#imports': [
            'useNuxtApp',
            'useBaseFetch',
            'useRuntimeConfig',
            'useState',
            'useLazyAsyncData',
            'useLocalisationOptions',
            'useFavoriteLocalisation',
            'useInputValidation',
          ],
        },
      ],
    }),
  ],
  mode: 'development',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vuetify.config.ts',
    deps: {
      inline: [/vuetify/],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  define: { 'process.env': {} },
  css: {
    preprocessorOptions: {
      scss: { additionalData: ` @import "@/styles/variables.scss";` },
    },
  },
});
