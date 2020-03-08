<template>
<v-container>
  <v-row>
    <v-col>
      <div v-if="!isEditing">
        <v-btn v-if="isRecording"
          fab
          class="ma-2 green lighten-2"
          @click="stopRecording">
          <v-icon large>mdi-stop</v-icon>
        </v-btn>
        <v-btn v-else
          fab
          class="ma-2 green lighten-2"
          @click="startRecording">
          <v-icon large>mdi-microphone</v-icon>
        </v-btn>
        <v-btn v-show="isRecording" 
          fab
          class="ma-2 green lighten-2"
         >
          {{ recordingLength }}
        </v-btn>
      </div>
      <audio-editor class="editor"
        ref="editor"
        v-if="dataUrl.length > 0"
        @cut="updateData"
        @trashRecording="trashRecording"
        :dataUrl="dataUrl"
        :source="source"
        :isEditing="isEditing">
      </audio-editor>
    </v-col>
  </v-row>

  <div>
  </div>
</v-container>
</template>

<script>
/* eslint-disable */
import RecordRTC from 'recordrtc';
import Store from '@/stores/store';
import timer from 'minimal-timer';
import AudioEditor from '@/components/Audio/AudioEditor';

export default {
  components: {
    'audio-editor': AudioEditor,
  },
  props: {
    blob: '',
    source: '',
    options: {
      default() {
        return {
          type: 'audio',
          mimeType: 'video/webm',
          bufferSize: 0,
          sampleRate: 44100,
          leftChannel: false,
          disableLogs: false,
        }
      }
    }
  },
  data() {
    return {
      localBlob: this.blob,
      dataUrl: '',
      maxLength: 30,
      Timer: timer(),
      recordingLength: '',
      isRecording: false,
      isEditing: false,
      newRecording: 0
    }
  },
  watch: {
    recordingLength() {
      if (this.recordingLength > this.maxLength) {
        this.stopRecording();
      };
    },
  },
  methods: {
    trashRecording() {
      this.isEditing = false;
      this.dataUrl = '';
      this.$emit('updateBlob', null, this.source);
    },
    updateData(blob) {
      this.dataUrl = URL.createObjectURL(blob);
      this.localBlob = blob;
      this.$emit('updateBlob', blob, this.source);
    },
    startTimer() {
      this.Timer.start();
      this.recordingLength = 0;
      this.interval = window.setInterval(() => {
        const time = this.Timer.elapsedTime();
        this.recordingLength = (time / 1000).toFixed(1);
      }, 500);
    },
    stopTimer(blob) {
      this.updateData(blob);
      window.clearInterval(this.interval);
      this.isEditing = true;
    },
    captureUserMedia(mediaConstraints, successCallback, errorCallback) {
      var isBlackBerry = !!(/BB10|BlackBerry/i.test(navigator.userAgent || ''));
      if(isBlackBerry && !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.mozGetUserMedia)) {
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;
          navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);
          return
      }
      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(successCallback)
        .catch(errorCallback)
    },
    _addStreamStopListener(stream, callback) {
      var streamEndedEvent = 'ended'

      if ('oninactive' in stream) {
        streamEndedEvent = 'inactive'
      }

      this._stream.addEventListener(streamEndedEvent, function() {
        callback()
        callback = function() {}
      }, false)

      this._stream.getAudioTracks().forEach(function(track) {
        track.addEventListener(streamEndedEvent, function() {
          callback()
          callback = function() {}
        }, false)
      })
    },
    // CORE
    startRecording() {
      this.captureUserMedia(
        { audio: true },
        (audioStream) => {
          this.$emit('record:start')
          this.isRecording = true
          this._stream = audioStream
          this._recordRTC = RecordRTC(audioStream, this.options)
          this._recordRTC.startRecording()

          this._addStreamStopListener(audioStream, () => {
            this.isRecording = false
          })
        },
        (error) => {
          this.$emit('record:error')
          this.isRecording = false
        });
        this.startTimer();

    },
    stopRecording() {
      // commented out url in stopRecording
      this._recordRTC.stopRecording(() => {
        this._stream.stop()
        // this.$emit('record:success', url)
        // this.dataUrl = url;

        // save Blob and Blob URL to Store for API post, playback and editing
        // this.saveToStore(this._recordRTC.getBlob());
        this.stopTimer(this._recordRTC.getBlob());
      });
      // removed this to fix getBlob() function above
      // this._recordRTC = null
    },
    deleteRecording() {
      this.isEditing = false;
    },
  },
  destroyed() {
    this.stopRecording()
  }
}

</script>