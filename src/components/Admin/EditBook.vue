<template>
  <v-card>
    <v-card-title>
      <span class="headline">Redigera bok</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field label="Titel" required v-model="local.title"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Antal sidor" required v-model="local.pages"></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
            <v-select
              :items="$store.state.genres"
              item-text="name"
              item-value="id"
              v-model="local.genre"
              label="Genre"
            ></v-select>
          </v-col>
          <v-col cols="6" sm="6">
            <v-autocomplete
              :items="authors"
              item-text="fullName"
              item-value="id"
              v-model="local.author"
              label="Författare"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red darken-1" text @click="$emit('closeDialog')">Stäng</v-btn>
      <v-btn color="blue darken-1" text @click="editBook">Spara</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Books from '@/api/services/books';
import Authors from '@/api/services/authors';
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  /* eslint-disable no-console */
  name: 'edit-book',
  props: {
    book: Object,
  },
  data() {
    return {
      loading: false,
      authors: [],
      local: {
        bookId: this.book.id,
        title: this.book.title,
        pages: this.book.pages,
        author: this.book.authors[0].id,
        genre: this.book.genres[0].id,
      },
    };
  },
  computed: {
    ...mapGetters([
      'token',
    ]),
  },
  created() {
    this.getAuthors();
  },
  methods: {
    editBook() {
      console.log(this.token);
      Books.edit({
        bookId: this.local.bookId,
        authorId: this.local.author,
        genreId: this.local.genre,
        title: this.local.title,
        pages: this.local.pages,
      }, this.token)
      .then(() => {
        let author = _.find(this.authors, {id: this.local.author});
        let genre = _.find(this.$store.state.genres, {id: this.local.genre});
        this.$emit('closeDialog', {
          title: this.local.title,
          pages: this.local.pages,
          author,
          genre,
        });
      });
    },
    getAuthors() {
      Authors.getAll()
        .then((result) => {
          this.authors = result.data;
        });
    },
  },
};

</script>

<style scoped>
.wrapper {
  text-align: center;
}

.button {
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  border:none;
  text-align: center;
  cursor: pointer;
}

.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}
.float {
  float: left;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-left {
  width: 15%;
  margin-bottom: 5px;
  margin-left: 12%;
  font-weight: bold;
  text-align:left;
  line-height: 34px;
}

.flex-right {
  width: 48%;
  margin-bottom: 5px;
  text-align: left;
}

.flex-box{
  width: 100%;
  align-items:center;
}

h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.select-style {
  width: 356px;
}

input {
  padding-left: 5px;
  font-size: 15px;
  height: 34px;
  width: 350px;
}

.flex-box button {
  margin: 10px 0;
}

.menu {
  display: inline-block;
  margin: 0 auto;
  margin-top: 15px;
}

.sync-loader {
  margin-top: 15px;
}

</style>
