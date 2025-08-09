<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar'
import {Github, Info, Plus} from "lucide-vue-next";
import logo from "@/assets/logo.png"

const sidebarLinks = [
  {name: "About us", icon: Info, url: ""},
  {name: "Github", icon: Github, url: ""}
]
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
          <SidebarMenuItem v-for="sidebarLink in sidebarLinks" :key="sidebarLink.name">
            <SidebarMenuButton asChild>
              <a :href="sidebarLink.url">
                <component :is="sidebarLink.icon" />
                <span>{{sidebarLink.name}}</span>
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
        <SidebarGroupContent></SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
<!--    <SidebarFooter />-->
  </Sidebar>
</template>