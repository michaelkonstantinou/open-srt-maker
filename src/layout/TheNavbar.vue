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
import ExportFilenameDialog from "@/components/dialogs/ExportFilenameDialog.vue";
import {ref, type Ref} from "vue";
import {toast} from "vue-sonner";
import {ExportActionType} from "@/types/ExportActionType.ts";
import FilenameValidator from "@/validators/FilenameValidator.ts";

const props = defineProps({
  project: {
    type: OpenSRTProject,
    required: true,
  }
});

const openExportAsModal: Ref<Boolean> = ref(false);
let exportAction: ExportActionType = ExportActionType.GENERIC;
const validator: FilenameValidator = new FilenameValidator();

/**
 * Generates a file with the subtitles, formatted based on the exportAction
 * Invokes the 'download' function for the user
 *
 * @param filename
 */
function exportSubtitlesToFile(filename: string) {
  let content: string;
  if (exportAction === ExportActionType.SRT || exportAction === ExportActionType.GENERIC) {
    content = props.project.toSrtContent()
  } else {
    content = props.project.toSrtContent()
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function exportFile(filename: string) {

  // Validate that the filename is appropriate and valid for the given action
  try {
    validator.fileIsNotEmpty(filename);
    validator.fileExtensionSupportsAction(filename, exportAction);
  } catch (e: any) {
    toast.error('Incorrect filename!', {description: e.message});

    return;
  }

  exportSubtitlesToFile(filename)
}

/**
 * Sets the exportAction of this component to be equal to the action invoked.
 * Sets the flag that is responsible to open the filename modal to true
 *
 * @param action
 */
function openModalForExport(action: ExportActionType) {
  exportAction = action;
  openExportAsModal.value = true;
}

</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Import file</MenubarItem>
        <MenubarSeparator />
        <MenubarItem @click="openModalForExport(ExportActionType.GENERIC)">Export as plain text</MenubarItem>
        <MenubarSeparator />
           <MenubarItem @click="openModalForExport(ExportActionType.SRT)">Export .SRT</MenubarItem>
        <MenubarItem @click="openModalForExport(ExportActionType.VTT)">Export .VTT</MenubarItem>
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

  <ExportFilenameDialog :open="openExportAsModal" @close="openExportAsModal = false" @confirm="exportFile"/>
</template>