<template>
<v-container class="pt-0">
    <v-row class="waveform"
    :id="waveformId"
    @click="setTime"></v-row>
  <v-row>
    <v-col>
      <v-btn v-if="!isPlaying"
        fab
        @click="play">
        <v-icon large>mdi-play</v-icon>
      </v-btn>
      <v-btn v-if="isPlaying"
        fab
        @click="pause">
        <v-icon large>mdi-pause</v-icon>
      </v-btn>
      <v-btn v-show="isEditing" fab> {{ roundedTime }}</v-btn>
      <v-btn fab
        @click="cutBlob">      
        <v-icon>mdi-content-cut</v-icon>
      </v-btn>
      <v-btn v-if="history.length > 0"
        fab
        @click="undoSlice">
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <v-btn fab
        @click="trashRecording">      
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</v-container>
</template>


<script>
import WaveSurfer from 'wavesurfer.js';
import audioBufferSlice from 'audiobuffer-slice';
import toWav from 'audiobuffer-to-wav';
// eslint-disable-next-line no-use-before-define
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
/* eslint-disable no-console */

export default {
  name: 'audio-editor',
  data() {
    return {
      wavesurfer: null,
      history: [],
      time: {
        selected: 0,
        length: '',
      },
      isPlaying: false,
    };
  },
  props: {
    dataUrl: String,
    source: String,
    isEditing: Boolean,
  },
  computed: {
    roundedTime() {
      return this.time.selected.toFixed(1);
    },
    waveformId() {
      return `waveform-${this.source}`;
    },
  },
  watch: {
    dataUrl() {
      this.resetWavesurfer();
    },
  },
  created() {
    this.$nextTick(() => {
      this.initiateWavesurfer();
    });
  },
  methods: {
    trashRecording() {
      this.$emit('trashRecording');
    },
    resetWavesurfer() {
      this.wavesurfer.destroy();
      this.initiateWavesurfer();
    },
    cutBlob() {
      const { start, end } = this.wavesurfer.regions.list[1];
      this.newSlice(start * 1000, end * 1000);
      this.isEdited = true;
    },
    undoSlice() {
      this.audiobufferToWav(this.history.pop());
    },
    newSlice(start, end) {
      audioBufferSlice(this.wavesurfer.backend.buffer, start, end, (error, sliced) => {
        this.history.push(this.wavesurfer.backend.buffer);
        this.audiobufferToWav(sliced);
        // if (error) {
        // } else {
        //   this.history.push(this.wavesurfer.backend.buffer);
        //   this.audiobufferToWav(sliced);
        // }
      });
    },
    audiobufferToWav(buffer) {
      const wav = toWav(buffer);
      const blob = new Blob([new DataView(wav)], {
        type: 'audio/wav',
      });
      this.$emit('cut', blob, this.source);
    },
    initiateWavesurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: `#${this.waveformId}`,
        waveColor: 'violet',
        plugins: [
          RegionsPlugin.create({
            enableDragSelection: false,
          }),
        ],
      });
      this.wavesurfer.load(this.dataUrl);
      this.wavesurfer.on('ready', () => {
        const duration = this.wavesurfer.getDuration();
        this.wavesurfer.addRegion({
          id: 1,
          start: duration * 0.05,
          end: duration * 0.95,
          resize: true,
          drag: false,
          color: 'rgba(0, 0, 0, 0.3)',
        });
      });
    },
    play() {
      if (this.isEditing) {
        this.wavesurfer.playPause();
        this.isPlaying = true;
        this.interval = setInterval(() => {
          const time = parseFloat((this.wavesurfer.getCurrentTime()));
          this.$set(this.time, 'selected', time);
        }, 100);
      }
    },
    pause() {
      if (this.isEditing) {
        this.wavesurfer.pause();
        this.isPlaying = false;
        clearInterval(this.interval);
      }
    },
    setTime() {
      this.$nextTick(() => {
        const time = parseFloat((this.wavesurfer.getCurrentTime()));
        this.$set(this.time, 'selected', time);
      });
    },
  },
};

</script>

<style>
.waveform .wavesurfer-handle {
  background-color: grey;
  width: 15%;
  max-width: 50px;
}

.waveform {
  display:block;
}
</style>
