<template>
<v-form v-model="valid">
  <v-dialog v-model="authorDialog" persistent max-width="300">
    <add-author @closeDialog="closeDialog"></add-author>
  </v-dialog>
  <v-dialog v-model="scannerDialog" max-width="500">
    <barcode-scanner @closeDialog="closeScannerDialog"></barcode-scanner>
  </v-dialog>
  <v-container>
    <v-row justify="center">
      <h1>Lägg till bok</h1>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col v-for="genre in $store.state.genres"
        :key="genre.id">
        <v-tooltip bottom color="blue">
          <template v-slot:activator="{on}">
            <v-btn v-on="on" class="ma-2" icon
              width="auto" height="auto">
              <v-avatar
                size="55">
                <img class="genre-icon"
                  @click="toggleSelected(genre);"
                  v-bind:class="{ selected: book.genre == genre }"
                  :src="`${imagesUrl}${genre.slug}.png`"/>
              </v-avatar>
            </v-btn>
          </template>
          <span>{{genre.name}}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-text-field
          label="Genre, välj med knapparna"
          required
          disabled
          v-model="book.genre.name"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-text-field
          v-model="book.isbn"
          :rules="rules"
          label="ISBN"
          append-outer-icon="mdi-barcode-scan"
          @click:append-outer="scannerDialog = true"
          required
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <v-text-field
          :rules="rules"
          v-model="book.title"
          label="Titel"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          :rules="rules"
          v-model="book.pages"
          label="Antal sidor"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-autocomplete
          append-outer-icon="mdi-plus"
          @click:append-outer="authorDialog = true"
          :items="$store.state.authors"
          item-text="fullName"
          item-value="id"
          v-model="book.authors"
          label="Författare"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2">
        <v-btn color="error"
          @click="resetFields">Återställ fält</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn @click="publishBook">Lägg till bok</v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-form>
</template>


<script>
import Books from '@/api/services/books';
import Urls from '@/assets/urls';

import AddAuthor from '@/components/Admin/AddAuthor';
import BarcodeScanner from '@/components/BarcodeScanner';

// import Urls from '@/assets/urls';


export default {
  name: 'post-book',
  components: {
    AddAuthor,
    BarcodeScanner,
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    genreId() {
      return this.selectedGenre.id;
    },
  },
  data() {
    return {
      selected: '',
      scannerDialog : false,
      authorDialog: false,
      valid: false,
      rules: [
        v => !!v || 'Fältet måste fyllas i',
      ],
      book: {
        isbn: '',
        title: '',
        pages: null,
        genre: '',
        authors: [],
      },
      imagesUrl: Urls.images,
    };
  },
  methods: {
/* eslint-disable no-console */
    closeScannerDialog(data) {
      console.log(data);
    },
    closeDialog(data) {
      if (data) {
        this.$store.commit('addAuthor', data);
        this.book.authors = data.id;
        this.authorDialog = false;
      }
      this.authorDialog = false;
    },
    toggleSelected(genre) {
      if (this.book.genre === genre) {
        this.book.genre = '';
      } else {
        this.book.genre = genre;
      }
    },
    resetFields() {
      this.book = {
        isbn: '',
        title: '',
        pages: null,
        genre: '',
        authors: [],
      };
    },
    publishBook() {
      Books.publishBook({
        isbn: this.book.isbn,
        title: this.book.title,
        pages: this.book.pages,
        genreId: this.book.genre.id,
        authorId: this.book.authors[0],
      })
        .then((result) => {
          let data = result.data[0];
          this.$store.commit('showSnackbar',{
            status: true,
            value: 'Boken är publicerad',
            color: 'green lighten-2',
            timeout: 3000,
            hasLink: true,
            linkUrl: `localhost:8080/book/${data.slug}`,
          });
          this.resetFields();
        });
    },
  },
};
</script>

<style scoped>
.genre-icon {
  border-radius: 100%;
  border: 3px solid transparent;
  cursor: pointer;
}

img.selected {
  border-color: #002d72;
}
</style>
