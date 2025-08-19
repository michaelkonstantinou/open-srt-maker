import {defineStore} from "pinia";
import type {Ref} from "vue";
import OpenSRTProject from "@/types/OpenSRTProject.ts";
import {ref} from "vue";
import SubtitleItem from "@/types/SubtitleItem.ts";

export const useProjectsStore = defineStore('projects', () => {
    const projects: Ref<OpenSRTProject[]> = ref([]);

    const init = async () => {
        const items = new Array(new SubtitleItem(1000, 10000, "Made using OpenSRTMaker", 1))
        const project: OpenSRTProject = new OpenSRTProject(1, "Untitled Project", items, "https://vjs.zencdn.net/v/oceans.mp4");
        projects.value.push(project)
    }

    const getBySlug = (slug: string): OpenSRTProject | null => {
        return projects.value.find(item => item.slug === slug) ?? null
    }

    return { projects, init, getBySlug }
})