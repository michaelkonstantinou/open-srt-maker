import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/", name: "static.about", component: () => import("@/views/static/About.vue")},
    {path: '/:pathMatch(.*)*', name: "static.notFound", component: () => import("@/views/static/NotFound.vue") },
    {path: "/projects/:slug", name: "projects.edit", component: () => import("@/views/ProjectEditor.vue")},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router