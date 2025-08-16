<template>
  <video ref="elVideoPlayer" class="video-js"></video>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import {onBeforeUnmount, onMounted, useTemplateRef, watch} from "vue";
import type Player from "video.js/dist/types/player";

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
});

/**
 * Watch for a change in the provided src.
 * If a new video url is given, then invoke the VideoJS' API to change the src value
 */
watch(
    () => props.src,
    (newValue) => {
      if (player !== null) {
        player.src({src: newValue})
      }
    }
)

</script>