import {defineStore} from "pinia";
import type {Ref} from "vue";
import OpenSRTProject from "@/types/OpenSRTProject.ts";
import {ref} from "vue";
import SubtitleItem from "@/types/SubtitleItem.ts";

export const useProjectsStore = defineStore('projects', () => {
    const projects: Ref<OpenSRTProject[]> = ref([]);

    /**
     * The function adds an empty project to the application.
     * It is important to keep this function and to keep it asynchronous, as this would be required in case
     * the data will be fetched by an API
     */
    const init = async () => {
        create("Untitled Project", "https://vjs.zencdn.net/v/oceans.mp4")
    }

    /**
     * Searches the store for 1 project instance that contains the given slug
     * Returns null if no such project is found.
     *
     * @param slug
     */
    const getBySlug = (slug: string): OpenSRTProject | null => {
        return projects.value.find(item => item.slug === slug) ?? null
    }

    const getById = (id: number): OpenSRTProject | null => {
        return projects.value.find(item => item.id === id) ?? null
    }

    const deleteById = (id: number): boolean => {
        const projectsBefore = projects.value.length
        projects.value = projects.value.filter(item => item.id !== id)

        return projectsBefore > projects.value.length
    }

    const createCopy = (id: number): boolean => {
        const projectToCopy = getById(id)
        if (projectToCopy === null) {
            return false
        }

        projects.value.push(projectToCopy.copy(id))
        return true
    }

    const create = (name: string, videoUrl: string): void => {
        const newId = projects.value.length + 1
        const items = new Array(new SubtitleItem(1000, 10000, "Made using OpenSRTMaker", 1))
        const project: OpenSRTProject = new OpenSRTProject(newId, name, items, videoUrl);

        projects.value.push(project)
    }

    return { projects, init, getBySlug, deleteById, createCopy, create }
})