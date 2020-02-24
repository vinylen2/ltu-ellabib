<template>
<v-container fluid class="pa-0">
  <front-header></front-header>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="pa-0">
        <book-list-small
          title="Topplistan"
          :books="$store.state.highestRatedBooks">
         </book-list-small>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <book-list-small
          title="Nyligen recenserade"
          :books="$store.state.recentlyReviewedBooks">
         </book-list-small>
      </v-col>
    </v-row>
  </v-container>
  <scanner-button @barcodeScanned="barcodeScanned"></scanner-button>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import BookListSmall from '@/components/Books/BookListSmall';
import FrontHeader from '@/components/FrontHeader';
import Vue from 'vue';
import VueParallaxJs from 'vue-parallax-js';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import ScannerButton from '@/components/ScannerButton';

require('swiper/css/swiper.css');

Vue.use(VueParallaxJs);
Vue.use(VueAwesomeSwiper);

export default {
  name: 'frontpage',
  metaInfo: {
    title: 'Startsida',
  },
  components: {
    FrontHeader,
    // 'book-list': BookList,
    BookListSmall,
    ScannerButton,
  },
  created() {
    this.getRecentlyReviewed();
    this.getHighestRated();
  },
  data() {
    return {
      dialog: false,
      swiperOptions: {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        autoplay: 5000,
      },
    };
  },
  methods: {
    barcodeScanned(data) {
      console.log(data);
    },
    getRecentlyReviewed() {
      Books.getRecentlyReviewed()
        .then((result) => {
          this.$store.commit('recentlyReviewedBooks', result.data);
        });
    },
    getHighestRated() {
      Books.getHighestRated()
        .then((result) => {
          this.$store.commit('highestRatedBooks', result.data);
        });
    },
  },
};
</script>
