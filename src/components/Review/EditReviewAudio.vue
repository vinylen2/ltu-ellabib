<template>
<v-card>
  <v-container>
    <div v-if="reviewLocal.audioUrl">
      <v-row class="justify-center"><p class="title">Beskrivning</p></v-row>
      <v-row>
        <v-col class="text-left">
          {{reviewLocal.description}}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <audio-editor class="editor"
            @cut="updateData"
            :dataUrl="formattedAudioUrl(local.audio.description, local.source.description)"
            :source="local.source.description"
            :isEditing="true">
          </audio-editor>
        </v-col>
      </v-row>
    </div>
    <v-row class="justify-center"><p class="title">Recension</p></v-row>
    <v-row>
      <v-col class="text-left">
        {{reviewLocal.review}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <audio-editor class="editor"
          @cut="updateData"
          :dataUrl="formattedAudioUrl(local.audio.review, local.source.review)"
          :source="local.source.review"
          :isEditing="true">
        </audio-editor>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn class="ma-3" color="red lighten-2" @click="$emit('closeDialog')">Stäng</v-btn>
      <v-btn class="ma-3" color="blue lighten-2" @click="editReview">Spara</v-btn>
    </v-row>
  </v-container>
</v-card>
</template>


<script>
// still needs work
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Reviews from '@/api/services/reviews';
import AudioEditor from '@/components/Audio/AudioEditor';
import Urls from '@/assets/urls';
import moment from 'moment';

export default {
  name: 'edit-review-audio',
  components: {
    'audio-editor': AudioEditor,
  },
  data() {
    return {
      reviewLocal: this.review,
      audioUrl: Urls.audio,
      local: {
        audio: {
          description: this.review.descriptionAudioUrl,
          review: this.review.reviewAudioUrl,
        },
        blobs: {
          description: '',
          review: '',
        },
        source: {
          description: 'description',
          review: 'review',
        },
        isCut: {
          description: false,
          review: false,
        },
      },
    };
  },
  props: {
    review: Object,
  },
  computed: {
    reviewFormData() {
      const formdata = new FormData();
      formdata.append('reviewId', this.reviewLocal.id);
      formdata.append('descriptionRecording', this.local.blobs.description, this.reviewLocal.slug);
      formdata.append('reviewRecording', this.local.blobs.review, this.reviewLocal.slug);
      return formdata;
    },
  },
  methods: {
    formattedAudioUrl(url, source) {
      if (this.local.isCut[source]) {
        return this.local.audio[source];
      }
      return `${this.audioUrl}${url}`;
    },
    updateData(blob, source) {
      this.local.isCut[source] = true;
      const dataUrl = URL.createObjectURL(blob);
      this.local.audio[source] = dataUrl;
      this.local.blobs[source] = blob;
    },
    formattedDate(date) {
      return moment(date).format('Do MMMM');
    },
    editReview() {
      Reviews.editReviewAudio(this.reviewFormData)
        .then(() => {
          this.$emit('closeDialog');
        });
        // }).catch(e => console.log(e));
    },
  },
};
</script>
