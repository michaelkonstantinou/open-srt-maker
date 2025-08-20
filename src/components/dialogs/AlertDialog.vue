<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  classConfirm: {
    type: String,
    requited: false,
    default: "",
  }
});

const emit = defineEmits(['close', 'confirm'])

function onConfirm() {
  emit('confirm');
  emit('close')
}
</script>

<template>
  <AlertDialog :open="open">
    <AlertDialogContent >
      <AlertDialogHeader>
        <AlertDialogTitle>
          <slot name="title">
            Are you absolutely sure?
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot>This action is not reversible!</slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('close')">Cancel</AlertDialogCancel>
        <AlertDialogAction :class="classConfirm" @click="onConfirm">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>