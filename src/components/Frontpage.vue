<template>
<v-container fluid class="pa-0">
  <v-carousel
    height="300px"
    continuos
    cycle
    hide-delimiters
    :show-arrows-on-hover="true">
    <v-carousel-item class="green lighten-4">
      <router-link to="/books">
        <div class="header-text"
          v-if="$store.state.count.books != 0">
          <span class="one">
            {{$store.state.count.books}}
          </span>
          <span>böcker</span>
        </div>
      </router-link>
    </v-carousel-item>
    <v-carousel-item class="green lighten-4">
      <router-link to="/books">
        <div class="header-text"
          v-if="$store.state.count.books != 0">
          <span class="one">
            {{$store.state.count.reviews}}
          </span>
          <span>recensioner</span>
        </div>
      </router-link>
    </v-carousel-item>
  </v-carousel>
  <v-container fluid>
      <book-list class="list"
        title="Topplistan"
        :books="$store.state.highestRatedBooks">
      </book-list>
      <book-list class="list"
        title="Nyligen recenserade"
        :books="$store.state.recentlyReviewedBooks">
      </book-list>
  </v-container>
</v-container>
</template>

<script>
import Books from '@/api/services/books';
import BookList from '@/components/Books/BookList';
import Vue from 'vue';
import VueParallaxJs from 'vue-parallax-js';
import VueAwesomeSwiper from 'vue-awesome-swiper';

require('swiper/css/swiper.css');

Vue.use(VueParallaxJs);
Vue.use(VueAwesomeSwiper);

export default {
  name: 'frontpage',
  metaInfo: {
    title: 'Startsida',
  },
  components: {
    BookList,
  },
  created() {
    this.getRecentlyReviewed();
    this.getHighestRated();
    this.getCount();
  },
  data() {
    return {
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
    getCount() {
      Books.count()
        .then((result) => {
          this.$store.commit('count', {
            books: result.data.books.count,
            reviews: result.data.reviews.count,
          });
        });
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
