<script setup lang="ts">

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import SubtitleItem from "@/types/SubtitleItem.ts";
import SubtitleEditorRecord from "@/components/editors/SubtitleEditorRecord.vue";
import {type Ref, ref} from "vue";
import {Pencil, Save} from "lucide-vue-next";

const props = defineProps({
  currentTimestamp: {
    type: Number,
    default: 0,
    required: false,
  }
})
const subtitleItems: Ref<SubtitleItem[]> = ref(new Array(new SubtitleItem(5000, 10000, "Hello", 1)));
const isGlobalEditEnabled: Ref<Boolean> = ref(false);

function addNewItem() {
  subtitleItems.value.push(
      new SubtitleItem(props.currentTimestamp, props.currentTimestamp + 2000, "", subtitleItems.value.length + 1)
  )
}

function removeItem(itemId: number) {
  subtitleItems.value = subtitleItems.value.filter(el => el.id !== itemId)
}
</script>

<template>
  <!-- Buttons Container -->
  <div class="flex justify-center gap-4 mb-6">
    <Button @click="addNewItem" size="lg" class="px-4 py-2 rounded-lg shadow">
      Add text for timestamp
    </Button>

    <Button v-show="!isGlobalEditEnabled"
            @click="isGlobalEditEnabled = true"
            size="lg"
            class="px-4 py-2 rounded-lg shadow bg-yellow-500 hover:bg-yellow-600">
      <Pencil v-show="!isGlobalEditEnabled"/>
      Edit all
    </Button>
    <Button v-show="isGlobalEditEnabled"
            @click="isGlobalEditEnabled = false"
            size="lg"
            class="px-4 py-2 rounded-lg shadow bg-blue-500 hover:bg-blue-600">
      <Save v-show="isGlobalEditEnabled"/>
      Save all
    </Button>
  </div>


  <!-- Subtitles List -->
  <Card class="w-full max-w-3xl bg-white rounded-lg shadow p-4">

    <h2 class="text-lg font-semibold mb-4 text-gray-700">!Subtitles</h2>
    <ul class="divide-y divide-gray-200">
      <SubtitleEditorRecord v-for="item in subtitleItems" :item="item" :key="item.id" :globalEdit="isGlobalEditEnabled" @removed="removeItem"/>
    </ul>
  </Card>
</template>

<style scoped>

</style>