<template>
  <div>
    <h2>{{title}}</h2>
    <swiper ref="swiper"
      :options="swiperOptions">
        <swiper-slide v-for="book in books"
          :key="book.id">
          <router-link
            class="link"
            :to="{ name: 'bok', params: { slug: book.slug }}">
            <v-rating class="mb-5" dense medium v-model="book.rating" readonly></v-rating>
            <img class="front-img"
              v-if="book.localImage"
              :src="`${imagesUrl}${book.imageUrl}`">
            <img class="front-img"
              v-if="!book.localImage"
              :src="book.imageUrl">
          </router-link>
        </swiper-slide>
    </swiper>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Urls from '@/assets/urls';

require('swiper/css/swiper.css');

Vue.use(VueAwesomeSwiper);

export default {
  name: 'book-list',
  props: ['books', 'title'],
  data() {
    return {
      imagesUrl: Urls.images,
      swiperOptions: {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 5,
        spaceBetween: 50,
        autoplay: 4000,
        breakpoints: {
          1400: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          520: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.book-rating {
  margin-bottom: 10px;
}
.list {
  width: 100%;
}
.front-img {
  width: 250px;
}

.swiper-button-next {
  color: black;
}

h2 {
  flex: 100%;
  font-weight: 700;
  font-size: 2em;
  margin-bottom: 15px;
}

h3 {
  font-size: 1.5em;
  margin: 10px 0;
}

.link {
  text-decoration: none;
  color: #2c3e50;
}

.link:visited {
  color: #2c3e50;
}

.link:hover {
  color: black;
  text-decoration: none;
}

</style>
