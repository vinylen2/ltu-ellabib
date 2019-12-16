<template>
<v-row justify="center">
  <v-card>
    <v-card-title>
      <span class="headline">Redigera bok</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Titel" required v-model="this.book.title"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Antal sidor" required v-model="this.book.pages"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Legal last name*"
              hint="example of persistent helper text"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Password*" type="password" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
              label="Interests"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red darken-1" text @click="this.$emit('closeModal')">Stäng</v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false">Spara</v-btn>
    </v-card-actions>
  </v-card>
</v-row>
</template>

<script>
import Books from '@/api/services/books';
import Authors from '@/api/services/authors';

export default {
  name: 'edit-book',
  props: {
    book: Object,
  },
  // props: [
  //   'bookId',
  //   'author',
  //   'genre',
  //   'title',
  //   'pages',
  // ],
  data() {
    return {
      loading: false,
      authors: [],
      local: {
        author: this.author,
        genre: this.genre,
        title: this.title,
        pages: this.pages,
      },
    };
  },
  created() {
    this.getAuthors();
    window.addEventListener('keyup', (event) => {
      if (event.which === 13) {
        this.editBook();
      }
    });
  },
  methods: {
    editBook() {
      this.loading = true;
      Books.edit({
        bookId: this.bookId,
        authorId: this.local.author.id,
        genreId: this.local.genre.id,
        title: this.local.title,
        pages: this.local.pages,
      })
      .then(() => {
        setTimeout(() => {
          this.$emit('leaveModal', {
            author: this.local.author,
            genre: this.local.genre,
            title: this.local.title,
            pages: this.local.pages,
          });
        }, 200);
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
