<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {type Ref, ref} from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  defaultFilename: {
    type: String,
    required: false,
    default: "mysubtitles.srt"
  }
});

const filename: Ref<String> = ref(props.defaultFilename)
const emit = defineEmits(['close', 'confirm'])

function onConfirm() {
  emit('confirm', filename.value);
  emit('close')
}
</script>

<template>
  <Dialog :open="open">
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Export</DialogTitle>
      <DialogDescription>
        Please provide the filename of the exported file.
      </DialogDescription>
    </DialogHeader>
    <div class="flex items-center space-x-2">
      <div class="grid flex-1 gap-2">
        <Label for="link" class="sr-only">Filename</Label>
        <Input id="link" v-model="filename"/>
      </div>
    </div>
    <DialogFooter class="sm:justify-start">
      <Button type="submit" size="sm" class="px-3" @click="onConfirm">Save</Button>
      <DialogClose as-child>
        <Button type="button" variant="secondary" @click="emit('close')">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
  </Dialog>
</template>