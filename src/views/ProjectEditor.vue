<script setup lang="ts">
import TheNavbar from "@/layout/TheNavbar.vue";
import TheEditor from "@/components/TheEditor.vue";
import { ref } from "vue"
import TheBaseLayout from "@/layout/TheBaseLayout.vue";

const project = ref({ name: "Demo Project" })
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


