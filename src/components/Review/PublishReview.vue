<template>
<v-card>
  <v-card-title class="justify-center">
    <span class="headline">Recensera {{currentBook.title}} </span>
  </v-card-title>
<v-container>
  <v-form>
    <v-row v-if="currentBook.description">
      <v-col class="text-left">
        {{ currentBook.description }}
      </v-col>
    </v-row>
    <v-row class="pa-0" v-if="currentBook.description">
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
          placeholder="Skriv din egna bokrecension här."
          auto-grow
          v-model="review.review">
        </v-textarea>
      </v-col>
    </v-row>
    <v-row class="pa-0 justify-center" v-if="!book.pages">
      <v-col cols="6">
        <v-text-field
          label="Hur många sidor har boken?"
          required
          v-model="pages"></v-text-field>
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
        <v-btn color="red darken-1" text @click="$emit('closeDialog')">Stäng</v-btn>
        <v-btn color="blue darken-1" text @click="postReview" :loading="publishing">Skicka</v-btn>
      </v-col>
    </v-row>
  </v-form>
</v-container>
</v-card>
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
      pages: 0,
      currentBook: {},
      review: {
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
    editPages() {
      Books.editPages({ bookId: this.book.id, pages: this.pages })
        .then();
    },
    resetFields() {
      this.review.review = '';
      this.review.rating = 0;
      this.audio.description = null;
      this.audio.review = null;
    },
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
      if (this.review.rating == 0 || this.review.review.length == 0) {
        this.$store.commit('errorSnackbar', 'Du måste skriva en recension och ge boken ett betyg innan du kan skicka.');
      } else if (!this.book.pages && this.pages == 0) {
        this.$store.commit('errorSnackbar', 'Ange hur många sidor boken har.');
      } else if (!this.book.pages && this.pages > 300) {
        this.$store.commit('errorSnackbar', 'Du har angivit för många sidor!');
      } else {
        if (!this.book.pages) {
          this.editPages();

        }
        this.publishing = true;
        Reviews.create(this.reviewFormData)
          .then((result) => {
            this.$emit('closeDialog', result);
            this.resetFields();
            this.publishing = false;
          })
          .catch(() => {
            this.publishing = false;
            this.$store.commit('errorSnackbar', 'Något gick fel.');
          });
      }
    },
  },
};
</script>
