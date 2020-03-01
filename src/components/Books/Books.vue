<template>
<v-container>
  <search-books></search-books>
  <v-container>
    <v-row>
      <v-col
        v-for="book in paginatedBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        >
        <book-small :book="book" :align="'center'"
          class="justify-center"></book-small>
      </v-col>
    </v-row>
  </v-container>

  <mugen-scroll :handler="incrementPage"
    v-if="!allBooksFetched"
    :should-handle="!$store.getters.isLoading">
  </mugen-scroll>
</v-container>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import MugenScroll from 'vue-mugen-scroll';
import Urls from '@/assets/urls';

import SearchBooks from '@/components/Books/SearchBooks';
import BookSmall from '@/components/Books/BookSmall';

require('vue2-animate/dist/vue2-animate.min.css');

export default {
  name: 'books',
  metaInfo: {
    title: 'Alla böcker',
  },
  components: {
    'book-small': BookSmall,
    'search-books': SearchBooks,
    MugenScroll,
  },
  props: [
    'genre',
    'forceSearch',
  ],
  data() {
    return {
      searchTerm: '',
      displaySearch: false,
      selected: '',
      imagesUrl: Urls.images,
      busy: false,
      image: '',
      genres: [],
      queryParams: { genre: [] },
      page: 1,
      booksToDisplay: 10,
    };
  },
  computed: {
    paginatedBooks() {
      return this.$store.state.books.slice(0, this.page * this.booksToDisplay);
    },
    allBooksFetched() {
      if (this.$store.state.books.length === this.paginatedBooks.length) {
        return true;
      }
      return false;
    },
  },
  methods: {
    incrementPage() {
      this.page += 1;
    },
  },
};
</script>

<style>
</style>
