<template>
<v-container>
  <v-row justify="center">
    <v-col :align="'center'" cols="12" md="4">
      <v-img
        :src="imageUrl"
        height="300px"
        max-width="220px">
      </v-img>
    </v-col>
    <v-col cols="12" md="8" l="10">
      <v-card flat color="rgb(255, 0, 0, 0)">
        <v-card-title> {{ currentBook.title }}</v-card-title>
        <v-card-subtitle class="text-left">av: 
          <router-link class="authorlink"
            :to="{ name: 'books', params: { forceSearch: author.fullName }}">
            {{author.fullName }}
          </router-link>
        </v-card-subtitle>
        <v-card-text class="text-left">
          <p class="no-review"
            v-if="reviews.length == 0 && $store.getters.isAllowedToPublish">
            Bli den första att recensera boken genom att trycka på stjärnan!
          </p>
          <p class="no-review"
            v-if="reviews.length == 0 && !$store.getters.isAllowedToPublish">
            Det finns ingen recension för boken.
          </p>
          <p v-if="reviews.length > 0">
            {{ randomDescription.description }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <audio-player class="audio-player btn"
            v-if="randomDescription.descriptionAudioUrl"
            :sources="formattedAudioUrl(randomDescription.descriptionAudioUrl)"
            :audioInfo="{
              book: {
                title: currentBook.title,
                id: currentBook.id,
              },
              type: 'description',
              id: randomDescription.id,
            }">
          </audio-player>
          <router-link :to="{ name: 'books', params: { genre: genre }}"
            class="btn">
            <img class="genre-icon"
              :src="`${imagesUrl}${genre.slug}.png`">
          </router-link>
          <router-link class="review-a btn"
            v-if="$store.getters.isAllowedToPublish"
            :to="{ name: 'publish-review', params: { book: currentBook }}">
            <div class="button review-button">&#9733;</div>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-list color="rgb(255, 0, 0, 0)">
        <v-list-item>
          <v-list-item-content class="pa-0">Genre</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ genre.name }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0">Sidor</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ currentBook.pages }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0">Betyg</v-list-item-content>
          <v-list-item-content class="pa-0">
            <star-rating v-bind:read-only="true"
                v-bind:max-rating="5"
                inactive-color="#c2c7c9"
                active-color="#c98bdb"
                v-bind:star-size="20"
                :rtl="true"
                :increment="0.5"
                v-model="currentBook.rating">
            </star-rating>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
  <v-row v-if="reviews.length > 0">
    <v-col cols="12">
      <h1 class="text-left">Recensioner</h1>
    <v-divider></v-divider>
    </v-col>
    <v-col v-for="review in reviews"
      :key="review.id"
      cols="12">
      <v-card class="text-left"
       flat color="rgb(255, 0, 0, 0)">
        <v-card-title>
          Publicerad den {{ formattedDate(review.createdAt) }}
          <v-spacer></v-spacer>
          <star-rating class="review-rating" :read-only="true"
            :max-rating="5"
            inactive-color="#c2c7c9"
            active-color="#c98bdb"
            :star-size="20"
            v-model="review.rating">
          </star-rating>
        </v-card-title>
        <v-card-text class="text-left"> {{ review.review }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <audio-player class="review-audio player"
            v-if="review.reviewAudioUrl"
            :sources="formattedAudioUrl(review.reviewAudioUrl)"
            :audioInfo="{
              book: {
                title: currentBook.title,
                id: currentBook.id,
              },
              type: 'review',
              id: randomDescription.id,
            }">
          </audio-player>
        </v-card-actions>
      </v-card>
      <v-divider v-if="reviews.length > 0"></v-divider>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/Audio/AudioPlayer';
import StarRating from 'vue-star-rating';

import Vue from 'vue';
import moment from 'moment';
import VModal from 'vue-js-modal';
import _ from 'lodash';
import 'moment/locale/sv';

Vue.use(VModal);

export default {
  components: {
    'audio-player': AudioPlayer,
    StarRating,
  },
  data() {
    return {
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      reviews: [],
      randomDescription: {},
      currentBook: {},
      author: {
        fullName: '',
        id: null,
      },
      pausePlayer: {
        status: false,
        id: null,
      },
      genre: {
        name: '',
        slug: '',
        id: null,
      },
    };
  },
  metaInfo() {
    return {
      title: this.currentBook.title,
    };
  },
  computed: {
    imageUrl: function() {
      if (this.currentBook.localImage) {
        return `${this.imagesUrl}${this.currentBook.imageUrl}`;
      } else {
        return this.currentBook.imageUrl;
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getBookFromSlug();
    });
  },
  methods: {
    inQr(id) {
      if (_.findIndex(this.$store.state.qrArray, { id }) > -1) {
        return true;
      }
      return false;
    },
    // pauseOtherPlayers(data) {
    //   console.log(data.id);
    //   this.pausePlayer.status = data.status;
    //   this.pausePlayer.id += data.id;
    // },
    editBook() {
      this.$modal.show('edit-book');
    },
    leaveModal(data) {
      if (data) {
        this.currentBook.title = data.title;
        this.currentBook.pages = data.pages;
        this.author = data.author;
        this.genre = data.genre;
      }
      this.$modal.hide('edit-book');
    },
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
    formattedDate(date) {
      return moment(date).format('Do MMMM');
    },
    randomizeNumber(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    changeDescription() {
      const randomInt = this.randomizeNumber(this.reviews.length - 1);
      this.randomDescription = this.reviews[randomInt];
      if (this.randomDescription.description.length < 1) {
        this.changeDescription();
      }
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          if (result.data.reviews.length > 0) {
            const reviews = result.data.reviews;
            this.reviews = reviews;
            this.changeDescription();
          }
          this.currentBook = result.data;
          this.genre = result.data.genres[0];
          if (result.data.authors.length > 0) {
            this.author.fullName = `${result.data.authors[0].firstname} ${result.data.authors[0].lastname}`;
            this.author.id = result.data.authors[0].id;
          }
        });
    },
    getReviews(id) {
      Reviews.getAll(id)
        .then((result) => {
          this.reviews = result.data;
        });
    },
  },
};
</script>

<style scoped>
.admin-nav {
  width: 100%;
  background-color: #9ddad8;
  display: block;
  height: 60px;
}

.admin-anchor {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 20px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:60px;
  cursor: pointer;
}

.admin-anchor:hover {
  color: black;
  font-weight: bold;
}

.authorlink {
  color: #2c3e50;
  font-weight: bold;
}

.btn {
  margin-right: 5px;
}

.button {
  padding: 0;
  border: none;
  margin-right: 5px;
  font-weight: bold;
  font-size: 2em;
  line-height: 70px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  color: #2c3e50;
  background-color: #9ddad8;
  text-align: center;
  cursor: pointer;
}

.button:hover {
  background-color: #71c5e8;
}

.no-review {
  font-weight: bold;
  color: #ff585d;
}

.genre-icon {
  border-radius: 100%;
  width: 70px;
  cursor: pointer;
}



h1 {
  font-size: 2em;
  margin-bottom: 5px;
  font-weight: bold;
}


.review {
  padding: 10px;
  text-align: left;
  margin: 0 1% 0;
}

.review-button {
  font-size: 3em;
  background-color: #c98bdb;
  font-weight: bold;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.review-a {
  margin-left: 5px;
  text-decoration: none;
}

.review-button:hover {
  background-color: #f277c6;
}

dt {
  font-weight: bold;
}

.front-img {
  width: 200px;
}

@media (min-width: 770px) {
    .image {
        flex: 0 0 20.0%;
    }
    .text {
        flex: 0 0 70.0%;
    }
}
</style>
