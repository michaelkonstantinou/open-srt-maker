<script setup lang="ts">
import TheNavbar from "@/layout/TheNavbar.vue";
import TheEditor from "@/components/TheEditor.vue";
import TheBaseLayout from "@/layout/TheBaseLayout.vue";
import {useProjectsStore} from "@/store/projectsStore.ts";
import {useRoute} from "vue-router";
import {computed} from "vue";

const projectsStore = useProjectsStore()
const route = useRoute()

const project = computed(() =>
    projectsStore.getBySlug(route.params.slug as string)
)

</script>

<template>
  <TheBaseLayout>
    <!-- Navbar slot -->
    <template #navbar>
      <TheNavbar :project="project" />
    </template>

    <!-- Main content slot -->
    <TheEditor :project="project" />
  </TheBaseLayout>

</template>


