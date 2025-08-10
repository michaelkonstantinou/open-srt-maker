<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import OpenSRTProject from "@/types/OpenSRTProject.ts";

const props = defineProps({
  project: {
    type: OpenSRTProject,
    required: true,
  }
});

function exportSrtFile() {
  console.log(props.project.subtitleItems)
}
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Import file</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Export as...</MenubarItem>
        <MenubarSeparator />
        <MenubarItem @click="exportSrtFile">Export .SRT</MenubarItem>
        <MenubarItem>Export .VTT</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Video</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Set video url</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Project</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Create copy</MenubarItem>
        <MenubarItem>Delete project</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>