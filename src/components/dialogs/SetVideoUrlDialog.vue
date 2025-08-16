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
import {toast} from "vue-sonner";

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  currentUrl: {
    type: String,
    required: false,
    default: ""
  }
});

const videoUrl: Ref<String> = ref(props.currentUrl)
const emit = defineEmits(['close', 'confirm'])

/**
 * Verifies that the URL given is valid and sets the url of the video accordingly
 */
function onConfirm() {
  if (videoUrl.value.length <= 5 || !videoUrl.value.startsWith("http")) {
    toast.warning("Please provide a valid url (starting with http...)")
    return
  }

  emit('confirm', videoUrl.value);
  emit('close')
  toast.success("A new video url has been set successfully!")
}
</script>

<template>
  <Dialog :open="open" >
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Video URL</DialogTitle>
      <DialogDescription>
        Please write the link of the video you wish to append subtitles to.
      </DialogDescription>
    </DialogHeader>
    <div class="flex items-center space-x-2">
      <div class="grid flex-1 gap-2">
        <Label for="url" class="sr-only">Video URL</Label>
        <Input id="url" type="url" v-model="videoUrl" placeholder="https://my-awesome-website.com/video.mp4"/>
      </div>
    </div>
    <DialogFooter>
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