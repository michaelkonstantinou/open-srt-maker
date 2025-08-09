<script setup lang="ts">

import {Button} from "@/components/ui/button";
import { Pencil, Save } from "lucide-vue-next"
import SubtitleItem from "@/types/SubtitleItem.ts";
import {ref} from "vue";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {NumberField, NumberFieldContent, NumberFieldIncrement, NumberFieldInput, NumberFieldDecrement} from "@/components/ui/number-field";

defineProps({
  item: {
    type: SubtitleItem,
    required: true
  }
})

let isInEditMode = ref(false)
</script>

<template>
  <li class="flex justify-between items-center py-3">
    <div v-show="isInEditMode">
      <div class="flex items-end gap-4">
        <NumberField v-model="item.startingTimestamp" :step="500">
          <Label>Starting timestamp</Label>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput/>
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <NumberField v-model="item.endingTimestamp" :step="500">
          <Label>Ending timestamp</Label>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
      <div class="mt-3">
        <div class="grid w-full items-center gap-1.5">
          <Label for="email">Content</Label>
          <Input v-model="item.content" @keydown.enter="isInEditMode = false"/>
        </div>
      </div>
    </div>
    <div v-show="!isInEditMode">
      <p class="text-sm text-gray-800">{{ item.toTimeRange()}}</p>
      <p class="text-gray-600">{{ item.getContentText() }}</p>
    </div>
    <Button @click="isInEditMode = !isInEditMode"
            class="px-3 py-1 text-white text-sm"
            :class="{
              'bg-yellow-500 hover:bg-yellow-600': !isInEditMode,
              'bg-blue-500 hover:bg-blue-600': isInEditMode
            }">
      <Pencil v-show="!isInEditMode"/>
      <Save v-show="isInEditMode"/>
    </Button>
  </li>
</template>

<style scoped>

</style>