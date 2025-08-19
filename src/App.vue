<script lang="ts">
export const description
    = "A sidebar that collapses to icons."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full"
</script>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import TheSidebar from "@/layout/TheSidebar.vue";
import {SidebarProvider} from "@/components/ui/sidebar";
import {useProjectsStore} from "@/store/projectsStore.ts";

const projectsStore = useProjectsStore()
projectsStore.init()
</script>

<template>
  <Toaster richColors position="top-center" />
  <SidebarProvider>
    <TheSidebar />
    <RouterView />
  </SidebarProvider>
</template>
