import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import {createPinia} from "pinia";
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import {useProjectsStore} from "@/store/projectsStore.ts";

const app = createApp(App)
    .use(createPinia())
    .use(autoAnimatePlugin)

const projectsStore = useProjectsStore()
projectsStore.init()

app.use(router)
    .mount('#app')