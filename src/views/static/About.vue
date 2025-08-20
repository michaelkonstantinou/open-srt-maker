<script setup lang="ts">

import TheBaseLayout from "@/layout/TheBaseLayout.vue";
</script>

<template>
  <TheBaseLayout>
    <div class="min-h-screen flex flex-col items-center p-6">
      <div class="flex flex-col items-center gap-4 text-center">
        <h1 class="text-3xl font-bold text-gray-800">About project</h1>
        <p class="max-w-xl text-gray-600">
          This is a project designed to learn more about <span class="font-bold">Vue 3, Typescript, Vite and VideoJS</span>.
          Made by <a href="https://mkonst.com" target="_blank" class="font-medium text-primary underline underline-offset-4">Michael Konstantinou</a>
        </p>

        <h1 class="mt-10 text-2xl font-bold text-gray-800">How to use</h1>
        <p class="max-w-xl text-gray-600">
          Create a new project by clicking on the "+" icon that is located next to "Projects" section in the <span class="font-bold">sidebar</span>
        </p>

        <h1 class="mt-10 text-2xl font-bold text-gray-800">How it's made</h1>
        <p class="text-gray-700 text-left leading-relaxed">
          This project was built using Vue.js 3 with the Composition API for reactivity and modularity.
          Tailwind CSS provides the styling, while ShadCN components are used for reusable UI elements.
          The main goal of this application is to allow users to add, edit, and export subtitles for videos
          in multiple formats, such as SRT and VTT. The project also demonstrates integration with
          video.js for playback and dynamic subtitle handling.
        </p>

        <p class="text-gray-700 text-left leading-relaxed">
          All components are designed to be reactive, maintainable, and reusable.
          Vue Router handles navigation between different project views, and state management
          is handled locally using reactive refs and props. This approach ensures smooth interaction
          with the video player and instant updates of subtitle changes.
        </p>

        <p class="text-gray-700 text-left leading-relaxed">
          <span class="font-bold">Integration with Back-end</span> is NOT available as the purpose of this project, is
          to demonstrate an example of VueJS integrated with VideoJS for live subtitle editing. However, if you are
          interested in developing a full working application out of it, please let me know.
        </p>

        <h1 class="text-3xl font-bold text-gray-800">Known limitations</h1>
        <p class="text-gray-600 text-left leading-relaxed">
          This is demo application and not a complete application. However, even if you are using this project for learning purposes,
          you might need to pay attention to the following limitations:
        </p>
        <ol class="text-gray-600 text-left leading-relaxed">
          <li>-> Routes for projects require a slug... but not validation is made to keep the slug unique</li>
          <li>-> Slug is only generated when the project is created... but not when the project's name is updated</li>
          <li>-> There are no tests for the project</li>
        </ol>
      </div>
    </div>

  </TheBaseLayout>

</template>

<style scoped>

</style>