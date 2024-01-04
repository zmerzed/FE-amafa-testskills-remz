import Datepicker from 'vue-datepicker-next';
export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(Datepicker);
});
