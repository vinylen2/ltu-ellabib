<template>
<v-form v-model="valid">
  <v-container>
    <v-row justify="center">
      <h1>Lägg till bok</h1>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col v-for="genre in $store.state.genres"
        :key="genre.id">
        <v-tooltip bottom color="blue">
          <template v-slot:activator="{on}">
            <v-btn fab v-on="on" class="ma-2">
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
      <v-col cols="2">
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
          @click:append-outer="scan"
          required
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-text-field
          :rules="rules"
          v-model="book.title"
          label="Titel"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
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
          @click:append-outer="addAuthor"
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
import Authors from '@/api/services/authors';
import Urls from '@/assets/urls';

// import Urls from '@/assets/urls';


export default {
  name: 'post-book',
  components: {
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
      selected: '',
      authors: [],
      imagesUrl: Urls.images,
    };
  },
  methods: {
/* eslint-disable no-console */
    scan() {
      console.log('scan');
    },
    addAuthor() {
      console.log('new author');
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
    postAuthor(firstname, lastname) {
      Authors.create(firstname, lastname)
        .then((result) => {
          this.authors.push(result.data);
          this.authorId = result.data.id;
        });
    },
  },
};
</script>

<style scoped>
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
