<template>
<v-container>
  <v-progress-linear class="ma-0" :color="'green lighten-2'"
    :indeterminate="true"
    v-if="$store.state.genres.length == 0">
  </v-progress-linear>
  <v-row>
    <v-col v-for="genre in $store.state.genres"
      :key="genre.id">
      <a>
        <img class="genre-icon"
          @click="toggleSelected(genre);"
          v-bind:class="{ selected: selected == genre }"
          :src="`${imagesUrl}${genre.slug}.png`"/>
      </a>
    </v-col>
    <v-col>
      <v-btn class="mx-2" 
        fab 
        dark 
        color="blue"
        @click="toggleSearch">
        <v-icon dark>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-slide-x-transition>
    <v-row v-if=displaySearch>
      <v-col xs="12">
        <v-text-field
          v-model="searchTerm"
          label="Sök..."
        ></v-text-field>
      </v-col>
    </v-row>
  </v-slide-x-transition>
</v-container>
</template>


<script>
/* eslint-disable no-console */
import Urls from '@/assets/urls';
import _ from 'lodash';
import Genres from '@/api/services/genres';
import Books from '@/api/services/books';

export default {
  name: 'search-books',
  data: () => ({
    imagesUrl: Urls.images,
    selected: '',
    displaySearch: false,
    searchTerm: '',
    genres: [],
    queryParams: { genre: [] },
  }),
  watch: {
    searchTerm: _.debounce(function () {
      this.searchBooks();
    }, 500),
  },
  created() {
    this.getGenres();
    if (this.$route.params.genre) {
      this.addGenreToQuery(this.$route.params.genre);
    } else if (this.$route.params.forceSearch) {
      this.displaySearch = true;
      this.searchTerm = this.$route.params.forceSearch;
      this.searchBooks();
    } else {
      this.getBooks();
    }

  },
  methods: {
    toggleSelected(genre) {
      if (this.selected === genre) {
        this.selected = '';
      } else {
        this.selected = genre;
      }
      this.addGenreToQuery(genre);
    },
    toggleSearch() {
      this.displaySearch = !this.displaySearch;
      this.searchTerm = '';
    },
    addGenreToQuery(genre) {
      if (this.queryParams.genre[0] === genre.slug) {
        this.getBooks();
        this.queryParams.genre.pop();
      } else {
        this.queryParams.genre[0] = genre.slug;
        this.searchBooks();
      }
    },
    getGenres() {
      Genres.getAll()
        .then((result) => {
          this.$store.commit('genres', result.data);
          if (this.$route.params.genre) {
            this.$store.state.genres.forEach((genre) => {
              if (genre.id === this.$route.params.genre.id) {
                this.selected = genre;
              }
            });
          }
        });
    },
    getBooks() {
      Books.getAll()
        .then((result) => {
          this.$store.commit('books', result.data);
        });
    },
    searchBooks() {
      if (this.queryParams.genre.length > 0) {
        Books.searchFromGenre(this.queryParams.genre, this.searchTerm)
          .then((result) => {
            this.$store.commit('books', result.data);
          });
      } else {
        Books.search(this.searchTerm)
          .then((result) => {
            this.$store.commit('books', result.data);
          });
      }
    },
  }
}

</script>

<style>
.genre-icon {
  border-radius: 100%;
  border: 3px solid transparent;
  width: 60px;
  cursor: pointer;
}

img.selected {
  border-color: #002d72;
}

</style>