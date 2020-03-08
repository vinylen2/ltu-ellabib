<template>
<v-card>
  <v-card-title class="justify-center">
    <span class="headline">Betygsätt {{book.title}}</span>
  </v-card-title>
  <v-card-text class="pb-0">
    <span>Vad tyckte du om boken?</span>
    <v-container>
      <v-rating
        v-model="rating"
        dense
        ripple
        hover
        large>
      </v-rating>
    </v-container>
  </v-card-text>
  <v-card-text v-if="!book.pages">
    <v-row>
      <v-col>
        <v-text-field
          label="Hur många sidor har boken?"
          required
          v-model="pages"></v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="red darken-1" text @click="$emit('closeDialog')">Stäng</v-btn>
    <v-btn color="blue darken-1" text @click="publish">Betygssätt</v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>
</v-card>
</template>

<script>
import Reviews from '@/api/services/reviews';
import Books from '@/api/services/books';

import { mapGetters } from 'vuex';
/* eslint-disable no-console */
export default {
  name: 'simple-review',
  props: {
    book: Object,
  },
  data: () => ({
    rating: 0,
    pages: null,
  }),
  computed: {
    ...mapGetters([
      'token',
    ]),
  },
  methods: {
    publish() {
      if (this.rating == 0) {
        this.$store.commit('errorSnackbar', 'Du måste sätta betyg på boken.');
      } else if (this.pages < 1 && this.book.pages < 1) {
        this.$store.commit('errorSnackbar', 'Ange hur många sidor boken har.');
      } else if (this.pages > 300) {
        this.$store.commit('errorSnackbar', 'Du har angivit för många sidor!');
      } else {
        if (!this.book.pages) {
          this.editPages();
        }
        this.publishSimpleReview();
      }
    },
    editPages() {
      Books.editPages({ bookId: this.book.id, pages: this.pages }, this.token)
        .then();
    },
    publishSimpleReview() {
      Reviews.publishSimple({
        rating: this.rating,
        bookId: this.book.id,
        userId: this.$store.state.user.id,
      }, this.token).then((result) => {
        this.$emit('closeDialog', result);
      });
    },
  },
};
</script>