<template>
  <video ref="elVideoPlayer" class="video-js"></video>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import {onBeforeUnmount, onMounted, useTemplateRef, watch} from "vue";
import type Player from "video.js/dist/types/player";
import VideoJsPlayerService from "@/services/VideoJsPlayerService.ts";

// Services
let playerService: VideoJsPlayerService | null = null

// Component properties
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  cues: {
    type: Array<VTTCue>,
    required: false,
    default: []
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
  },
}

const emit = defineEmits(['timeUpdate']);

// Non-reactive values that control the video player
const elVideoPlayer = useTemplateRef('elVideoPlayer')
let player: Player | null = null;

/**
 * When the component is mounted, a new VideoJs Player instance is created that will emit an event each time its
 * time has been updated.
 *
 * Additionally, the PlayerService is initialized, which is responsible for the core functionalities and management
 * of the instantiated VideoJs Player
 */
onMounted(() => {
  player = videojs(elVideoPlayer.value, videoOptions, () => {
    // Listen for timeupdate
    player.on('timeupdate', () => {
      emit('timeUpdate', player?.currentTime())
    });

    playerService = new VideoJsPlayerService(player)

    // Add subtitles' track (if any exist)
    if (props.cues.length > 0) {
      playerService.updateSubtitles(props.cues);
    }
  });
});

onBeforeUnmount(() => {
  playerService?.destroy()
});

// Update the player's source url if the props are changed
watch(() => props.src, newValue => playerService?.setSourceUrl(newValue))

// Update the player's track to include the up-do-date subtitles if the props are changed
watch(() => props.cues, (newValue) => playerService?.updateSubtitles(newValue));

</script>