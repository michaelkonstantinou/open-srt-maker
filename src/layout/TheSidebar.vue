<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup, SidebarGroupAction, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar'
import {Github, Info, Plus} from "lucide-vue-next";
import logo from "@/assets/logo.png"
import { type Ref } from 'vue';

defineProps({
  projects: {
    type: Array<Ref>,
    required: true
  }
});
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
        <SidebarGroupAction>
          <Plus /> <span class="sr-only">Add Project</span>
        </SidebarGroupAction>
        <SidebarMenu>
          <SidebarMenuItem v-for="project in projects" :key="project.value.name">
            <SidebarMenuButton asChild>
              <RouterLink :to="{name: 'projects.edit', params: {slug: project.value.slug}}">
                <span>{{project.value.name}}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
<!--    <SidebarFooter />-->
  </Sidebar>
</template>