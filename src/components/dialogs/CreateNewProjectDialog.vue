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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {toast} from "vue-sonner";
import {useProjectsStore} from "@/store/projectsStore.ts";
import type OpenSRTProject from "@/types/OpenSRTProject.ts";

interface ProjectFormData {
  projectName: string,
  videoUrl: string
}

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const projectsStore = useProjectsStore()
const emit = defineEmits(['close', 'created'])

const formSchema = toTypedSchema(z.object({
  projectName: z.string().min(3),
  videoUrl: z.string().url().min(5)
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values: ProjectFormData) => {
  // Create a new project and inform the user about it
  const createdProject: OpenSRTProject = projectsStore.create(values.projectName, values.videoUrl)
  toast.success("Project has been created successfully!")
  emit('created', createdProject)
})
</script>

<template>
  <Dialog :open="open" >
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Create new project</DialogTitle>
      <DialogDescription>
        Please provide the name of the new project.
      </DialogDescription>
    </DialogHeader>
    <form @submit.prevent="onSubmit" class="flex flex-col space-y-2">
      <FormField class="grid gap-2" name="projectName" v-slot="{ componentField }">
        <FormItem v-auto-animate>
          <FormLabel>Project name</FormLabel>
          <FormControl>
            <Input id="projectName" placeholder="My awesome project" v-bind="componentField"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField class="grid gap-2" name="videoUrl" v-slot="{ componentField }">
        <FormItem v-auto-animate>
          <FormLabel>Video URL</FormLabel>
          <FormControl>
            <Input id="projectName" placeholder="https://example.com/my-video.mp4" v-bind="componentField"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </form>

    <DialogFooter>
      <Button type="submit" size="sm" class="px-3" @click="onSubmit">Create</Button>
      <DialogClose as-child>
        <Button type="button" variant="secondary" @click="emit('close')">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
  </Dialog>
</template>