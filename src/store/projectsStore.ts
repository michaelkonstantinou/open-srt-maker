import {defineStore} from "pinia";
import {type Ref, watch} from "vue";
import OpenSRTProject from "@/types/OpenSRTProject.ts";
import {ref} from "vue";
import SubtitleItem from "@/types/SubtitleItem.ts";

const STORAGE_PROJECTS_KEY: string = "open_subtitles_maker_projects"

export const useProjectsStore = defineStore('projects', () => {
    const projects: Ref<OpenSRTProject[]> = ref([]);

    /**
     * The function adds an empty project to the application.
     * It is important to keep this function and to keep it asynchronous, as this would be required in case
     * the data will be fetched by an API.
     *
     * Since there is no backend, the function loads items from local storage (if exist)
     */
    const init = () => {
        // Load from localStorage if exists
        const stored: string | null = localStorage.getItem(STORAGE_PROJECTS_KEY)
        if (stored !== null) {
            const parsed = JSON.parse(stored)
            projects.value = parsed.map((p: any) => OpenSRTProject.fromJSON(p))
        } else {
            create("Untitled Project", "https://vjs.zencdn.net/v/oceans.mp4")
        }
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
        const newId = projects.value.length + 1
        const projectToCopy = getById(id)
        if (projectToCopy === null) {
            return false
        }

        projects.value.push(projectToCopy.copy(newId))
        return true
    }

    /**
     * Creates a new (empty) project with the given arguments.
     * Returns the created project as an OpenSRTProject instance
     *
     * @param name
     * @param videoUrl
     */
    const create = (name: string, videoUrl: string): OpenSRTProject => {
        const newId = projects.value.length + 1
        const items = new Array(new SubtitleItem(1000, 10000, "Made using OpenSRTMaker", 1))
        const project: OpenSRTProject = new OpenSRTProject(newId, name, items, videoUrl);

        projects.value.push(project)

        return project
    }

    // Persist changes to localStorage. REMOVE IF CONNECTED WITH BACKEND
    watch(
        projects,
        (newProjects) => {
            localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(newProjects))
        },
        { deep: true }
    )

    return { projects, init, getBySlug, deleteById, createCopy, create }
})