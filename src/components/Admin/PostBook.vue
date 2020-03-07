<template>
<v-form v-model="valid">
  <v-dialog v-model="authorDialog" persistent max-width="300">
    <add-author @closeDialog="closeDialog"></add-author>
  </v-dialog>
  <scanner-button></scanner-button>
  <v-container>
    <v-row justify="center" class="pb-6">
      <h1 class="headline" v-if="newBook">Lägg till bok</h1>
      <h1 class="headline" v-else>Ändra bok</h1>
    </v-row>
    <v-row justify="center" no-gutters class="pb-6">
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
      <v-slide-x-transition>
        <v-col cols="12" sm="4"
          v-if="book.imageUrl.length > 0">
          <v-img :src="book.imageUrl"
            height="300px"
            max-width="220px">
          </v-img>
        </v-col>
      </v-slide-x-transition>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col>
            <v-text-field
              label="Genre, välj med knapparna"
              required
              disabled
              v-model="book.genre.name"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="">
            <v-text-field
              v-model="isbn"
              :rules="rules"
              label="ISBN"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="">
            <v-text-field
              :rules="rules"
              v-model="book.title"
              label="Titel"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="">
            <v-text-field
              :rules="rules"
              v-model="book.pages"
              label="Antal sidor"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="left">
          <v-col>
            <v-autocomplete
              append-outer-icon="mdi-plus"
              :class="'text-left'"
              dense
              @click:append-outer="authorDialog = true"
              :items="$store.state.authors"
              item-text="fullName"
              item-value="id"
              v-model="book.authors"
              label="Författare"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              :rules="rules"
              auto-grow
              v-model="book.description"
              label="Beskrivning"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="">
            <v-btn color="error"
              @click="resetFields">Återställ fält</v-btn>
          </v-col>
          <v-col cols="">
            <v-btn v-if="newBook" @click="publishBook">Lägg till bok</v-btn>
            <v-btn v-else @click="updateBook">Uppdatera bok</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</v-form>
</template>


<script>
import Books from '@/api/services/books';
import Urls from '@/assets/urls';
import _ from 'lodash';

import AddAuthor from '@/components/Admin/AddAuthor';
import ScannerButton from '@/components/ScannerButton';

import Genres from '@/api/services/genres';

export default {
  name: 'post-book',
  components: {
    AddAuthor,
    ScannerButton,
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  watch: {
    isbn: _.debounce(function () {
      this.book.isbn = this.isbn;
      this.fetchBookInfo();
    }, 500),
  },
  data() {
    return {
      isbn: '',
      selected: '',
      scannerDialog : false,
      authorDialog: false,
      valid: false,
      rules: [
        v => !!v || 'Fältet måste fyllas i',
      ],
      book: {
        isbn: '',
        id: '',
        title: '',
        pages: null,
        genre: '',
        authors: [],
        imageUrl: '',
        description: '',
      },
      newBook: true,
      imagesUrl: Urls.images,
    };
  },
  created() {
    if (!this.$store.state.genres) {
      Genres.getAll()
        .then((result) => {
          this.$store.commit('genres', result.data);
        });
    }
    if (this.$route.params.slug) {
      this.getBookFromSlug(this.$route.params.slug);
    }
  },
  methods: {
/* eslint-disable no-console */
    barcodeScanned(data) {
      console.log(data);
    },
    getBookFromSlug(slug) {
      Books.getFromSlug(slug)
        .then((result) => {
          this.newBook = false;
          this.book.title = result.data.book.title;
          this.book.pages = result.data.book.pages;
          this.book.description = result.data.book.description;
          this.book.imageUrl = result.data.book.imageUrl;
          this.book.authors = result.data.book.authorId;
          this.book.genre = {
            id: result.data.book.id,
            slug: result.data.book.genreSlug,
            name: result.data.book.genreDisplayName,
          }
        });
    },
    updateBook() {
      Books.edit({
        bookId: this.book.id,
        authorId: this.book.authors,
        genreId: this.book.genre.id,
        title: this.book.title,
        pages: this.book.pages,
        description: this.book.description,
      })
      .then(() => {
        this.$store.commit('showSnackbar', {
          status: true,
          value: 'Bok uppdaterad',
          color: 'green lighten-2',
          timeout: 5000,
          hasLink: false,
          linkUrl: '',
        });
      });
    },
    fetchBookInfo() {
      Books.getFromIsbn(this.book.isbn).then((result) => {
        if (!result.data) {
          this.resetFields();
          this.newBook = true;
          this.$store.commit('showSnackbar', {
            status: true,
            value: 'Ingen bok hittad, fyll i manuellt',
            color: 'red lighten-2',
            timeout: 5000,
            hasLink: false,
            linkUrl: '',
          });
        }
        else if (result.data) {
          this.book.title = result.data.title;
          this.book.pages = result.data.pages;
          this.book.description = result.data.description;
          this.book.imageUrl = result.data.imageUrl;

          if (result.newBook) {
            if (result.data.author.newlyCreated) {
              this.$store.commit('addAuthor', result.data.author)
              this.book.authors = result.data.author.id
            } 
          } else {
            this.newBook = false;
            this.book.id = result.data.id;
            this.book.authors = result.data.authors[0].id;
            this.book.genre = result.data.genres[0];
          }
        } else {
          this.resetFields();
        }
      });
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
        imageUrl: '',
      };
    },
    publishBook() {
      Books.postBook({
        isbn: this.book.isbn,
        title: this.book.title,
        pages: this.book.pages,
        genreId: this.book.genre.id,
        authorId: this.book.authors,
      })
        .then((result) => {
          this.$store.commit('showSnackbar',{
            status: true,
            value: `${this.book.title} är publicerad`,
            color: 'green lighten-2',
            timeout: 3000,
            hasLink: true,
            linkUrl: `localhost:8080/book/${result.data.slug}`,
          });
          // this.resetFields();
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
