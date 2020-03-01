<template>
<v-card>
  <v-card-title>Välj genre</v-card-title>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col v-for="genre in genres"
        :key="genre.id">
        <v-tooltip bottom color="blue">
          <template v-slot:activator="{on}">
            <v-btn v-on="on" class="ma-2" icon
              width="auto" height="auto">
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
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-text-field
          label="Genre, välj med knapparna"
          required
          disabled
          v-model="selected.name"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-btn color="blue darken-1" text @click="addGenre">Spara</v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Urls from '@/assets/urls';
import Books from '@/api/services/books';

export default {
  name: 'edit-genre-dialog',
  props: {
    book: {},
  },
  data: () => ({
    selected: '',
    imagesUrl: Urls.images,
  }),
  computed: {
    ...mapGetters([
      'genres',
    ]),
  },
  methods: {
    toggleSelected(genre) {
      if (this.selected === genre) {
        this.selected = '';
      } else {
        this.selected = genre;
      }
    },
    addGenre() {
      Books.addGenre({
        bookId: this.book.id,
        genreId: this.selected.id
      }).then(() => {
        this.$emit('submitted', this.genreId);
      });
    },
  },
};
</script>

<style>
.genre-icon {
  border-radius: 100%;
  border: 3px solid transparent;
  cursor: pointer;
}

img.selected {
  border-color: #002d72;
}

</style>