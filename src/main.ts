import registerVueModule from '@/plugins/vue-module';
import '@/styles/main.scss';
import App from '@/App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

registerVueModule(App, { VueQueryPlugin });