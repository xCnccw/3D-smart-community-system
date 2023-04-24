import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
// import 'element-plus/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store/index';
import VueParticles from 'vue-particles'
// import VueLocalStorage from 'vue-localstorage'

//注意use要在mount之前
// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(VueParticles)
// app.use(VueLocalStorage)
app.mount('#app')

// createApp(App).mount('#app')

