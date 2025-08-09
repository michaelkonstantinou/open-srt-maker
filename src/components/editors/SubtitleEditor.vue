<script setup lang="ts">

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import SubtitleItem from "@/types/SubtitleItem.ts";
import SubtitleEditorRecord from "@/components/editors/SubtitleEditorRecord.vue";
import {type Ref, ref} from "vue";

const subtitleItems: Ref<SubtitleItem[]> = ref(new Array(new SubtitleItem(5000, 10000, "Hello")));

function addNewItem() {
  let startingTimestamp = 10000;
  subtitleItems.value.push(
      new SubtitleItem(startingTimestamp, startingTimestamp + 2000, "", subtitleItems.value.length + 1)
  )
}
</script>

<template>
  <!-- Add Text Button -->
  <Button @click="addNewItem" size="lg" class="mb-6 px-4 py-2 rounded-lg shadow">
    Add text for timestamp
  </Button>

  <!-- Subtitles List -->
  <Card class="w-full max-w-3xl bg-white rounded-lg shadow p-4">

    <h2 class="text-lg font-semibold mb-4 text-gray-700">!Subtitles</h2>
    <ul class="divide-y divide-gray-200">
      <SubtitleEditorRecord v-for="item in subtitleItems" :item="item" :key="item.orderId"/>
    </ul>
  </Card>
</template>

<style scoped>

</style>