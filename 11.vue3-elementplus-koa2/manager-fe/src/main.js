import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

console.log("环境变量=>", import.meta.env);
// createApp(App).mount('#app')

const app = createApp(App)
app.use(router).use(ElementPlus)
app.mount('#app')