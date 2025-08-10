<template>
  <video ref="elVideoPlayer" class="video-js"></video>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import {onBeforeUnmount, onMounted, useTemplateRef} from "vue";
import type Player from "video.js/dist/types/player";
import {ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem} from "@/components/ui/context-menu";

const props = defineProps({
  src: {
    type: String,
    required: true
  }
});

const videoOptions = {
  autoplay: false,
  controls: true,
  sources: [
    {
      src: props.src,
      type: 'video/mp4'
    }
  ],
  controlBar: {
    skipButtons: {
      backward: 10,
      forward: 10,
    }
  }
}

const emit = defineEmits(['timeUpdate']);


const elVideoPlayer = useTemplateRef('elVideoPlayer')

let player: Player | null = null;

onMounted(() => {
  player = videojs(elVideoPlayer.value, videoOptions, () => {
    // player?.log('onPlayerReady', this);
  });

  // Listen for timeupdate
  player.on('timeupdate', () => {
    emit('timeUpdate', player?.currentTime())
  })
});

onBeforeUnmount(() => {
  if (player) {
    player.dispose();
  }
})

</script>