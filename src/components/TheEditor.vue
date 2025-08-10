<script setup lang="ts">
import { Save } from "lucide-vue-next"
import {ref} from "vue";
import SubtitleEditor from "@/components/editors/SubtitleEditor.vue";
import VideoJsPlayer from "@/components/VideoJsPlayer.vue";

const projectTitle = ref("Untitled Project");
let isInEditMode = ref(false)
let currentTimestamp = ref(0)

function updateTimestamp(value: number) {
  currentTimestamp.value = value * 1000
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center p-6">
    <!-- Header -->
    <div class="mb-6 flex justify-center">
      <div v-if="isInEditMode" class="group flex items-center gap-2">
        <div class="flex items-center gap-2">
          <!-- Input for editing title -->
          <input
              type="text"
              v-model="projectTitle"
              @keydown.enter="isInEditMode = false"
              class="border border-gray-300 rounded-lg px-3 py-1.5 text-lg font-medium
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             shadow-sm"
              placeholder="Enter project title..."
          />
          <button @click="isInEditMode = !isInEditMode"
                  class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 text-sm shadow"
          >
            <Save class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div v-if="!isInEditMode" class="group flex items-center gap-2">
        <h1 class="text-3xl font-bold text-gray-800">
          {{ projectTitle }}
        </h1>
        <button @click="isInEditMode = !isInEditMode"
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-200
             bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-1"
                title="Rename title"
        >
          <!-- Heroicons pencil icon -->
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L8.71 17.94a4.5
                 4.5 0 01-1.897 1.13l-2.685.805a.375.375 0
                 01-.47-.47l.805-2.685a4.5 4.5 0
                 011.13-1.897l12.268-12.269z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Video Placeholder -->
    <div class="w-full max-w-4xl mb-4">
      <div class="bg-gray-300 aspect-video flex items-center justify-center rounded-lg shadow px-5">
        <VideoJsPlayer src="https://vjs.zencdn.net/v/oceans.mp4" @timeUpdate="updateTimestamp" class="w-max rounded-lg"/>
      </div>
    </div>

    <SubtitleEditor :currentTimestamp="currentTimestamp"/>
  </div>
</template>