import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import {createPinia} from "pinia";
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

createApp(App)
    .use(createPinia())
    .use(autoAnimatePlugin)
    .use(router)
    .mount('#app')