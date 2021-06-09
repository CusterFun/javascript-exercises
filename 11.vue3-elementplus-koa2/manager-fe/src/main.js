import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

import axios from 'axios'
import config from './config'
axios.get(config.mockApi+'/login').then((res)=>{
  console.log(res);
})

console.log("环境变量=>", import.meta.env);
// createApp(App).mount('#app')

const app = createApp(App)
app.use(router).use(ElementPlus)
app.mount('#app')