<template>
<v-container>
  <v-dialog v-model="dialog"
    max-width="300px">
    <simple-review :currentBook="currentBook"
      @closeDialog="closeDialog"></simple-review>
  </v-dialog>
  <v-row>
    <v-spacer class="d-none d-sm-flex"></v-spacer>
    <v-btn icon :to="{ name: 'books', params: { genre: genre }}"
      width="auto" height="auto" class="ma-2"
      >
      <v-avatar size="60">
        <img class="genre-icon"
          :src="`${imagesUrl}${genre.slug}.png`">
      </v-avatar>
    </v-btn>
    <div v-if="$store.getters.isLoggedIn && !isReviewedByUser">
      <v-btn :to="{ name: 'publish-review', params: { book: currentBook }}"
        color="purple lighten-2" class="ma-2"
        fab>
        <v-icon class="pt-2" large>mdi-border-color</v-icon>
      </v-btn>
      <v-btn fab color="blue lighten-2" class="ma-2"
        @click="dialog = true"
        @closeDialog="closeDialog">
        <v-icon large>mdi-star</v-icon>
      </v-btn>
    </div>
    <!-- Edit book - should move to admin page
    <v-btn class="ma-2"
      v-if="$store.state.isAdmin"
      fab
      @click.stop="dialog = true"
      color="pink lighten-2">
      <v-icon dark>mdi-border-color</v-icon>
    </v-btn> -->
  </v-row>
</v-container>
</template>

<script>
import Urls from '@/assets/urls';
import SimpleReview from '@/components/Review/SimpleReview';

import Books from '@/api/services/books';


export default {
/* eslint-disable no-console */
  name: 'book-toolbar',
  components: {
    SimpleReview,
  },
  props: {
    currentBook: Object,
    genre: Object,
  },
  data: () => ({
    dialog: false,
    imagesUrl: Urls.images,
    isReviewedByUser: true,
  }),
  created() {
    Books.isReviewed(this.$route.params.slug, this.$store.state.user.id)
      .then((result) => {
        this.isReviewedByUser = result.isReviewedByUser;
      });
  },
  methods: {
    closeDialog(data) {
      if (data) {
        this.$emit('bookReviewed');
      }
      this.dialog = false;
    },
  },
};
</script>