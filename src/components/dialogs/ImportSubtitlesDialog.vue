<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {type Ref, ref} from "vue";
import type SubtitleItem from "@/types/SubtitleItem.ts";
import SubtitleFileService from "@/services/SubtitleFileService.ts";
import {toast} from "vue-sonner";

const subtitleFileService: SubtitleFileService = new SubtitleFileService();

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const emit = defineEmits(['close', 'subtitlesUploaded'])

const file: Ref<File | null> = ref<File | null>(null);

function onFileChanged(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  file.value = target.files[0]
}

function uploadSubtitles() {
  if (file.value === null) {
    toast.warning("Select file with subtitles")
    return
  }

  subtitleFileService.readSubtitleItemsFromFile(file.value)
      .then(subtitles => {
        emit('subtitlesUploaded', subtitles);
        emit('close')
      })

}
</script>

<template>
  <Dialog :open="open">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Import subtitles</DialogTitle>
        <DialogDescription>
          Select the file that contains the subtitles for this video. Click on the button when you are ready to import
          its content.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Label for="picture">Picture</Label>
          <Input
              id="picture"
              type="file"
              accept=".srt,.vtt"
              @change="onFileChanged"
              ref="fileInput"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" size="sm" class="px-3" @click="uploadSubtitles">
          Save changes
        </Button>
        <Button type="button" variant="secondary" @click="emit('close')">
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>