import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1270E2',
            'primary-1': '#0D4F9F',
            'primary-2': '#E7F0FC',
            'primary-3': '#F3F8FE',
            background: '#F9F9F9',
            surface: '#FFFFFF',
            card: '#FFFFFF',
            'field-tag': '#EEEEF0',
            stroke: '#E5E5E5',
            success: '#27B378',
            warning: '#F2C13A',
            error: '#FF5558',
            info: '#1C83FC',
            'text-primary': '#010822',
            'text-secondary': '#414659',
            'text-tertiary': '#808390',
            disabled: '#CCCED3',
          },
        },
      },
    },
    defaults: {
      global: {
        ripple: false,
      },
      VBtn: {
        rounded: 'lg',
        style: 'text-transform: none;',
      },
      VTextField: {
        class: 'bordered-input',
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
