<template>
<v-container>
    <v-row justify="center">
      <v-col :align="'center'" cols="12" md="4">
        <v-img
          :src="imageUrl"
          height="340px"
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
              v-if="reviews.length == 0 && $store.getters.isLoggedIn">
              Bli den första att recensera boken genom att trycka på den lila pennan!
            </p>
            <p class="no-review"
              v-if="reviews.length == 0 && !$store.getters.isLoggedIn">
              Det finns ingen recension för boken.
            </p>
            <v-container v-if="reviews.length > 0" class="pa-0">
              <v-row>
                <v-col cols="12" sm="2" class="text-center pa-0">
                  <audio-player class="audio-player btn"
                    v-if="reviews[0].descriptionAudioUrl"
                    :sources="formattedAudioUrl(reviews[0].descriptionAudioUrl)"
                    :audioInfo="{
                      book: {
                        title: currentBook.title,
                        id: currentBook.id,
                      },
                      type: 'description',
                      id: randomDescription.id,
                    }"/>
                </v-col>
                <v-col cols="12" sm="10">
                  {{ reviews[0].description }}
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row justify="center">
                <book-toolbar
                  :genre="genre"
                  :currentBook="currentBook"
                  @bookReviewed="bookReviewed">
                </book-toolbar>
              </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-list color="rgb(255, 0, 0, 0)" dense>
        <v-list-item>
          <v-list-item-content class="pa-0">Hur många har läst boken?</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ currentBook.readCount }}
            </p>
          </v-list-item-content>
        </v-list-item>
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
          <v-list-item-content class="pa-0 text-right">
            <v-rating 
              v-model="currentBook.rating"
              dense
              medium
              half-increments
            ></v-rating>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
  <v-row v-if="reviews.length > 0">
    <v-col cols="12">
      <h1 class="text-left pa-0">Recensioner</h1>
    <v-divider></v-divider>
    </v-col>
    <v-col v-for="review in reviews"
      :key="review.id"
      cols="12 pt-0">
      <v-card class="text-left"
       flat color="rgb(255, 0, 0, 0)">
        <v-card-title>
          Publicerad den {{ formattedDate(review.createdAt) }}
          <v-spacer></v-spacer>
          <v-rating 
            v-model="review.rating"
            dense
            medium
            half-increments
          ></v-rating>
        </v-card-title>
        <v-card-text class="text-left"> 
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12" sm="2" la="1" class="pa-0">
                <audio-player class="text-center pa-0"
                  v-if="review.reviewAudioUrl"
                  :sources="formattedAudioUrl(review.reviewAudioUrl)"
                  :audioInfo="{
                    book: {
                      title: currentBook.title,
                      id: currentBook.id,
                    },
                    type: 'review',
                    id: randomDescription.id,
                  }"/>
              </v-col>
              <v-col cols="12" sm="10" la="11">
                {{ review.review }} 
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-divider v-if="reviews.length > 0"></v-divider>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import BookToolbar from '@/components/Books/BookToolbar';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/Audio/AudioPlayer';

import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/sv';


export default {
  components: {
    'audio-player': AudioPlayer,
    BookToolbar,
  },
  data() {
    return {
      dialog: false,
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
    bookReviewed() {
      this.getBookFromSlug();
      this.$store.commit('showSnackbar', {
        status: true,
        value: 'Recension publicerad!',
        color: 'green lighten-2',
        timeout: 5000,
        hasLink: false,
      });
    },
    inQr(id) {
      if (_.findIndex(this.$store.state.qrArray, { id }) > -1) {
        return true;
      }
      return false;
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
    // changeDescription() {
    //   const randomInt = this.randomizeNumber(this.reviews.length - 1);
    //   this.randomDescription = this.reviews[randomInt];
    //   if (this.randomDescription.description.length < 1) {
    //     this.changeDescription();
    //   }
    // },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          if (result.data.reviews.length > 0) {
            const reviews = result.data.reviews;
            this.reviews = reviews;
            // this.changeDescription();
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
.authorlink {
  color: #2c3e50;
  font-weight: bold;
}


.no-review {
  font-weight: bold;
  color: #ff585d;
}



h1 {
  font-size: 2em;
  margin-bottom: 5px;
  font-weight: bold;
}


</style>
