<template>
<v-card>
  <v-card-title class="justify-center">
    <span class="headline">Betygsätt {{currentBook.title}}</span>
  </v-card-title>
  <v-card-text>
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
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="red darken-1" text @click="$emit('closeDialog')">Stäng</v-btn>
    <v-btn color="blue darken-1" text @click="publishSimpleReview">Betygssätt</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import Reviews from '@/api/services/reviews';
/* eslint-disable no-console */
export default {
  name: 'simple-review',
  props: {
    currentBook: Object,
  },
  data: () => ({
    rating: 0,
  }),
  methods: {
    publishSimpleReview() {
      Reviews.publishSimple({
        rating: this.rating,
        bookId: this.currentBook.id,
        userId: this.$store.state.user.id,
      }).then((result) => {
        this.$emit('closeDialog', result);
      });
    },
  },
};
</script>