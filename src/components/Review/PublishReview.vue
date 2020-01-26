<template>
<v-container>
  <v-row>
    <v-col>
      <span class="headline">Publicera recension</span>
    </v-col>
  </v-row>
  <v-row v-if="publishing">
    <v-col>
      <v-progress-circular
        indeterminate
        :size="50">
      </v-progress-circular>
      <span class="ma-5">Publicerar...</span>
    </v-col>
  </v-row>
  <v-form v-else>
    <v-row class="pb-0">
      <v-col class="pb-0">
        <span class="">Beskrivning</span>
        <v-textarea
          outlined
          placeholder="Skriv vad boken handlar om här."
          auto-grow
          v-model="review.description">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-col class="pa-0">
        <vue-record class="pt-0 audio-recorder"
          v-if="$store.getters.isDeviceWithMic"
          :source="'description'"
          @updateBlob="updateAudio"
          :blob="audio.description">
        </vue-record>
      </v-col>
    </v-row>
    <v-row class="pb-0">
      <v-col class="pb-0">
        <span class="pb-2">Recension</span>
        <v-textarea
          outlined
          placeholder="Skriv din bokrecension här."
          auto-grow
          v-model="review.review">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row class="pa-0">
      <v-col class="pa-0">
        <vue-record class="pt-0 audio-recorder"
          v-if="$store.getters.isDeviceWithMic"
          :source="'review'"
          @updateBlob="updateAudio"
          :blob="audio.review">
        </vue-record>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-rating v-model="review.rating" large ripple hover dense/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="postReview">Skicka</v-btn>
      </v-col>
    </v-row>
  </v-form>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import Reviews from '@/api/services/reviews';
import VueRecord from '@/components/Audio/VueRecord';

export default {
  name: 'publish-review',
  components: {
    'vue-record': VueRecord,
  },
  props: ['book'],
  data() {
    return {
      currentBook: {},
      review: {
        description: '',
        review: '',
        rating: 0,
        userId: this.$store.state.user.id,
        bookId: null,
      },
      audio: {
        description: null,
        review: null,
      },
      publishing: false,
      published: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    reviewFormData() {
      const reviewFormData = new FormData();
      Object.keys(this.review).forEach((key) => {
        reviewFormData.append(key, this.review[key]);
      });

      if (this.audio.description) {
        reviewFormData.append('descriptionRecording', this.audio.description, this.$route.params.slug);
      }
      if (this.audio.review) {
        reviewFormData.append('reviewRecording', this.audio.review, this.$route.params.slug);
      }
      return reviewFormData;
    },
  },
  methods: {
    updateAudio(blob, source) {
      this.audio[source] = blob;
    },
    getData() {
      if (!this.book) {
        this.getBookFromSlug();
      } else {
        this.currentBook = this.book;
        this.review.bookId = this.book.id;
      }
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          this.currentBook = result.data;
          this.review.bookId = result.data.id;
        });
    },
    postReview() {
      this.publishing = true;
      Reviews.create(this.reviewFormData)
        .then(() => {
          this.published = true;
          this.publishing = false;
        });
    },
  },
};
</script>
