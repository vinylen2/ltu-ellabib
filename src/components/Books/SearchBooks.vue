<template>
<v-container>
  <v-row justify="center"
    no-gutters>
    <v-col v-for="genre in $store.state.genres"
      :key="genre.id">
      <v-tooltip bottom color="blue">
        <template v-slot:activator="{on}">
          <v-btn fab v-on="on" class="ma-2">
            <v-avatar
              size="55">
              <img class="genre-icon"
                @click="toggleSelected(genre);"
                v-bind:class="{ selected: selected == genre }"
                :src="`${imagesUrl}${genre.slug}.png`"/>
            </v-avatar>
          </v-btn>
        </template>
        <span>{{genre.name}}</span>
      </v-tooltip>
    </v-col>
    <v-col
      xs="12">
      <v-btn class="ma-2" 
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
    this.$store.commit('isLoading');
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
          this.$store.commit('isNotLoading');
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