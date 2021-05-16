import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";

import router from './router';
import auths from './assets/auth';
Vue.use(auths);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

window._tcbEnv = window._tcbEnv || {};

export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;

Vue.config.productionTip = false;

Vue.use(Cloudbase, {
  env: 'test-8gzsbnsi974ecbea',
  region: 'api-shanghai'
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
