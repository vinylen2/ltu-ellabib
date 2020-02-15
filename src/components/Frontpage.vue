<template>
<v-container fluid class="pa-0">
  <front-header></front-header>
  <v-container fluid>
      <book-list class="list"
        :books="$store.state.highestRatedBooks">
      </book-list>
      <book-list class="list"
        title="Nyligen recenserade"
        :books="$store.state.recentlyReviewedBooks">
      </book-list>
  </v-container>
  <scanner-button @barcodeScanned="barcodeScanned"></scanner-button>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import BookList from '@/components/Books/BookList';
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
    'book-list': BookList,
    ScannerButton,
  },
  created() {
    this.getRecentlyReviewed();
    this.getHighestRated();
    this.getCount();
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
      // this.$router.push('/book/julian-jim');
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
