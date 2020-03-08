<template>
<v-container>
  <v-dialog v-model="dialogSimple"
    max-width="400px">
    <simple-review :book="book"
      @closeDialog="closeDialog"></simple-review>
  </v-dialog>
  <v-dialog v-model="dialogAdvanced" persistent>
    <publish-review :book="book"
      @closeDialog="closeDialog"></publish-review>
  </v-dialog>
  <v-row justify="center">
    <!-- <v-spacer class="d-none d-sm-flex"></v-spacer> -->
    <div v-if="$store.getters.isLoggedIn && !isReviewedByUser">
      <v-btn fab color="purple lighten-3" class="ma-2"
        @click="dialogAdvanced = true"
        @closeDialog="closeDialog">
        <v-icon large>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab color="blue lighten-2" class="ma-2"
        @click="dialogSimple = true"
        @closeDialog="closeDialog">
        <v-icon large>mdi-star</v-icon>
      </v-btn>
    </div>
  </v-row>
</v-container>
</template>

<script>
import Urls from '@/assets/urls';
import SimpleReview from '@/components/Review/SimpleReview';
import PublishReview from '@/components/Review/PublishReview';



export default {
/* eslint-disable no-console */
  name: 'book-toolbar',
  components: {
    SimpleReview,
    PublishReview,
  },
  props: {
    book: Object,
    isReviewedByUser: Boolean,
  },
  data: () => ({
    dialogSimple: false,
    dialogAdvanced: false,
    imagesUrl: Urls.images,
  }),
  methods: {
    closeDialog(data) {
      if (data) {
        this.isReviewedByUser = true;
        this.$emit('bookReviewed');
      }
      this.dialogSimple = false;
      this.dialogAdvanced = false;
    },
  },
};
</script>