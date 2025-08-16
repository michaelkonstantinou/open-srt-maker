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
import {Trash, Copy, FileDown, FileUp, Link } from "lucide-vue-next";
import {ExportActionType} from "@/types/ExportActionType.ts";
import FilenameValidator from "@/validators/FilenameValidator.ts";
import ImportSubtitlesDialog from "@/components/dialogs/ImportSubtitlesDialog.vue";
import type SubtitleItem from "@/types/SubtitleItem.ts";
import SetVideoUrlDialog from "@/components/dialogs/SetVideoUrlDialog.vue";

const props = defineProps({
  project: {
    type: OpenSRTProject,
    required: true,
  }
});

const openExportAsModal: Ref<Boolean> = ref(false);
const openImportModal: Ref<Boolean> = ref(false);
const openSetVideoUrlModal: Ref<Boolean> = ref(false);
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
    content = props.project.toVttContent()
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
 * Triggered when the user has used the Imports Subtitle Dialog which will return an array
 * of SubtitleItem instances to replace the current project's subtitles
 * @param subtitles
 */
function setSubtitles(subtitles: SubtitleItem[]) {
  props.project.subtitleItems = subtitles;
  toast.success("Subtitles added from file successfully");
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

function setVideoUrl(url: string) {
  props.project.url = url;
}

</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem @click="openImportModal = true"><FileUp />Import file</MenubarItem>
        <MenubarSeparator />
        <MenubarItem @click="openModalForExport(ExportActionType.GENERIC)"><FileDown />Export as plain text</MenubarItem>
        <MenubarItem @click="openModalForExport(ExportActionType.SRT)"><FileDown />Export .SRT</MenubarItem>
        <MenubarItem @click="openModalForExport(ExportActionType.VTT)"><FileDown />Export .VTT</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Video</MenubarTrigger>
      <MenubarContent>
        <MenubarItem @click="openSetVideoUrlModal = true"><Link />Set video url</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Project</MenubarTrigger>
      <MenubarContent>
        <MenubarItem><Copy />Create copy</MenubarItem>
        <MenubarItem><Trash />Delete project</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>

  <ExportFilenameDialog :open="openExportAsModal" @close="openExportAsModal = false" @confirm="exportFile"/>
  <SetVideoUrlDialog :open="openSetVideoUrlModal" @close="openSetVideoUrlModal = false" @confirm="setVideoUrl"/>
  <ImportSubtitlesDialog :open="openImportModal" @close="openImportModal = false" @subtitlesUploaded="setSubtitles"/>
</template>