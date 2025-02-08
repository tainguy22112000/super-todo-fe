import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';

export default function registerVueModule(
  defineComponent: any,
  plugins: any,
  modules: any = [],
) {
  const pinia = createPinia();
  const app = createApp({
    setup() {
    },
    render() {
      return (h(defineComponent));
    },
  });

  modules.map((Module: any) => new Module(router).install(app));
  app.use(router);
  app.use(pinia);
  Object.values(plugins).forEach((plugin: any) => app.use(plugin));
  app.mount('#app');
}