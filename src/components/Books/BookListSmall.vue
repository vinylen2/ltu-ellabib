<template>
<v-container class="pa-0">
  <v-list subheader color="rgb(255, 0, 0, 0)">
    <v-subheader class="headline">{{title}}</v-subheader>
    <v-list-item
      v-for="book in books"
      :key="book.id"
      @click="goToBook(book.bookSlug)">
      <v-list-item-avatar class="ml-5" tile height="100px" width="80px" v-if="$store.state.userAgent.isMobile">
        <v-img max-height="100px" max-width="140px" :src="book.imageUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-avatar class="ml-5" tile height="150px" width="100px" v-else>
        <v-img max-height="250px" max-width="140px" :src="book.imageUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item class="pl-5">
        <v-list-item-content class="pl-1 text-left">
          <v-list-item-title class="title">{{bookTitle(book.title)}}</v-list-item-title>
          <v-list-item-subtitle>
            {{book.author}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-container class="ma-0">
              <v-row class="align-center pa-0">
                <v-col cols="auto" class="pl-0 align-center" v-if="book.readCount">
                  ({{book.readCount}})
                </v-col>
                <v-col cols="auto" class="pl-0 align-center" v-if="book.publishDate">
                  {{publishDate(book.publishDate)}}
                </v-col>
                <v-col class="pa-0">
                  <v-rating 
                    v-model="book.rating"
                    dense
                    medium
                    half-increments
                  ></v-rating>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
            <span>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-action class="mr-5" v-if="!$store.getters.isMobile">
        <v-avatar
          size="55">
          <img class="genre-icon"
            :src="`${imagesUrl}${book.genreSlug}.png`"/>
        </v-avatar>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</v-container>
</template>

<script>
import Urls from '@/assets/urls';
import moment from 'moment';
/* eslint-disable no-console */

export default {
  name: 'book-list-small',
  props: {
    books: Array,
    title: String,
  },
  data: () => ({
    imagesUrl: Urls.images,
  }),
  methods: {
    ratingFloat(rating) {
      return parseFloat(rating);
    },
    readCount(book) {
      if (book.readCount) {
        return book.readCount
      } return '';
    },
    publishDate(book) {
      return moment(book).format('D/M-YYYY');
    },
    goToBook(slug) {
      this.$router.push(`book/${slug}`);
    },
    bookTitle(title) {
      if (this.$store.state.userAgent.isMobile) {
        return title.slice(0, 15);
      } return title;
    },
  },
};
</script>