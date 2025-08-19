<script lang="ts">
export const description
    = "A sidebar that collapses to icons."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full"
</script>

<script setup lang="ts">
import {ref, type Ref} from "vue";
import OpenSRTProject from "@/types/OpenSRTProject.ts";
import SubtitleItem from "@/types/SubtitleItem.ts";
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import TheSidebar from "@/layout/TheSidebar.vue";
import {SidebarProvider} from "@/components/ui/sidebar";

const projects: Ref<OpenSRTProject[]> = ref([]);
const items = new Array(new SubtitleItem(1000, 10000, "Made using OpenSRTMaker", 1))
const project: Ref<OpenSRTProject> = ref(new OpenSRTProject(1, "Untitled Project", items, "https://vjs.zencdn.net/v/oceans.mp4"));
projects.value.push(project)

</script>

<template>
  <Toaster richColors position="top-center" />
  <SidebarProvider>
    <TheSidebar :projects="projects" />
    <RouterView />
  </SidebarProvider>
</template>
