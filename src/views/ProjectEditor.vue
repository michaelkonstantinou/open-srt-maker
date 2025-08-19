<script setup lang="ts">
import TheNavbar from "@/layout/TheNavbar.vue";
import TheEditor from "@/components/TheEditor.vue";
import TheBaseLayout from "@/layout/TheBaseLayout.vue";
import {useProjectsStore} from "@/store/projectsStore.ts";
import {useRoute} from "vue-router";

const projectsStore = useProjectsStore()
const route = useRoute()

const project = projectsStore.getBySlug(route.params.slug)
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


