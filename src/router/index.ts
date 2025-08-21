import { useProjectsStore } from "@/store/projectsStore";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/", name: "static.about", component: () => import("@/views/static/About.vue")},
    {path: '/:pathMatch(.*)*', name: "static.notFound", component: () => import("@/views/static/NotFound.vue") },
    {
        path: "/projects/:slug",
        name: "projects.edit",
        component: () => import("@/views/ProjectEditor.vue"),
        beforeEnter: (to) => {
            if (typeof to.params.slug === "string" && to.params.slug.trim().length > 0) {
                if (useProjectsStore().getBySlug(to.params.slug) !== null) {
                    return true
                }
            }

            return {name: "static.notFound"}
        }
    },
]

const router = createRouter({
    history: createWebHistory("/open-srt-maker/"),
    routes: routes,
})

export default router