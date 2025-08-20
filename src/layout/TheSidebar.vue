<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup, SidebarGroupAction, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar'
import {Github, Info, Plus} from "lucide-vue-next";
import logo from "@/assets/logo.png"
import {useProjectsStore} from "@/store/projectsStore.ts";
import {ref, type Ref} from "vue";
import CreateNewProjectDialog from "@/components/dialogs/CreateNewProjectDialog.vue";
import type OpenSRTProject from "@/types/OpenSRTProject.ts";
import {useRouter} from "vue-router";
const projectsStore = useProjectsStore()

const openCreateProjectDialog: Ref<Boolean> = ref(false);
const router = useRouter()

function createNewProject(project: OpenSRTProject) {
  router.push({name: "projects.edit", params: {slug: project.slug}})
  openCreateProjectDialog.value = false
}
</script>

<template>
  <Sidebar>
    <SidebarHeader class="px-4 py-6">
      <div class="flex items-center gap-10">
        <img :src="logo" alt="" class="h-8 w-8" />
        <span class="text-lg font-semibold text-gray-900">
          Open SRT
        </span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application Info</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <RouterLink :to="{name: 'static.about'}">
                <Info />
                <span>About</span>
              </RouterLink>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <a href="https://github.com/michaelkonstantinou/open-srt-maker" target="_blank">
                <Github />
                <span>Github</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupAction @click="openCreateProjectDialog = true">
          <Plus /> <span class="sr-only">Add Project</span>
        </SidebarGroupAction>
        <SidebarMenu>
          <SidebarMenuItem v-for="project in projectsStore.projects" :key="project.name">
            <SidebarMenuButton asChild>
              <RouterLink :to="{name: 'projects.edit', params: {slug: project.slug}}">
                <span>{{project.name}}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
<!--    <SidebarFooter />-->
  </Sidebar>

  <CreateNewProjectDialog :open="openCreateProjectDialog" @close="openCreateProjectDialog = false" @created="createNewProject"/>
</template>