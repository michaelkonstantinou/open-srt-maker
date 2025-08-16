<script lang="ts">
export const description
    = "A sidebar that collapses to icons."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full"
</script>

<script setup lang="ts">
import TheSidebar from "@/layout/TheSidebar.vue";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import TheEditor from "@/components/TheEditor.vue";
import TheNavbar from "@/layout/TheNavbar.vue";
import {ref, type Ref} from "vue";
import OpenSRTProject from "@/types/OpenSRTProject.ts";
import SubtitleItem from "@/types/SubtitleItem.ts";
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

const projects: Ref<OpenSRTProject[]> = ref([]);
const items = new Array(new SubtitleItem(1000, 10000, "Made using OpenSRTMaker", 1))
const project: Ref<OpenSRTProject> = ref(new OpenSRTProject(1, "Untitled Project", items, "https://vjs.zencdn.net/v/oceans.mp4"));
projects.value.push(project)

</script>

<template>
  <Toaster richColors position="top-center" />
  <SidebarProvider>
    <TheSidebar :projects="projects" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <TheNavbar :project="project" />
        </div>
      </header>
      <div class="gap-4 p-4 pt-0">
        <TheEditor :project="project" />
<!--        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />-->
      </div>
    </SidebarInset>
  </SidebarProvider>

</template>
