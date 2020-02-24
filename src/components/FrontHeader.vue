<template>
<v-container fluid class="green lighten-4">
  <v-row class="pa-5">
    <v-col class="pa-5">
        <span class="one">
          <ICountUp 
            :endVal="booksRead"
          />
        </span>
        <span>lästa böcker</span>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import Books from '@/api/services/books';
import ICountUp from 'vue-countup-v2';
/* eslint-disable no-console */

export default {
  name: 'front-header',
  components: {
    ICountUp,
  },
  data: () => ({
    books: 0,
    booksRead: 0,
    pagesRead: 0,
    reviewsWritten: 0,
  }),
  created() {
    this.getCount();
  },
  methods: {
    getCount() {
      Books.count()
        .then((result) => {
          let rev = result.data.reviews;
          this.books = result.data.books.count;
          this.booksRead = rev.booksRead;
          this.pagesRead = rev.pagesRead;
          this.reviewsWritten = rev.reviewsWritten;
        });
    },
  },
};
</script>

<style scoped>
a {
  color: #2c3e50;
  cursor: pointer;
}
/* .container {
  margin: 0;
  display: block;
} */

.header-text {
  position: absolute;
  top: 20%;
  left: 20%;
  vertical-align: center;
  color: #2c3e50;
}
.one {
  font-size: 3em;
  font-weight: bold;
}

span {
  display:inline-block;
  font-size: 2em;
}
</style>
