<template>
<v-container>
  <v-row>
    <span>Böcker kvar: {{books.length}}</span>
  </v-row>
  
  <v-row v-for="(book, index) in books" :key="book.bookId">
    <v-col cols="2" v-for="image in book.images" :key="image">
      <v-img :src="image" max-width="200px" max-height="200px" @click="pickImage(image, index)"></v-img>
    </v-col>
  </v-row>

</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import axios from 'axios';

export default {
  name: 'choose-image',
  data: () => ({
    books: [],
  }),
  created() {
    this.getImages();
  },
  methods: {
    pickImage(imageUrl, index) {
      let bookId = this.books[index].bookId;
      Books.addImage(imageUrl, bookId)
        .then((result) => {
          console.log(result);
        })
      this.books.splice(index, 1);
    },
    getImages() {
      const api = axios.create({
        baseURL: 'http://localhost:3000/cleanup/get-images'
      });
      api.get().then((result) => {
        this.books = result.data.imgs;
        console.log(result);
      });
    },
  },
};
</script>