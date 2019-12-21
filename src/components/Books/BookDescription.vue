<template>
<v-container>
  <v-dialog v-model="dialog"
    max-width="600px"
    persistent>
    <edit-book :book="currentBook"
      @closeDialog="closeDialog">
    </edit-book>
  </v-dialog>
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
          <v-btn icon :to="{ name: 'books', params: { genre: genre }}"
            width="auto" height="auto"
            >
            <v-avatar size="60">
              <img class="genre-icon"
                :src="`${imagesUrl}${genre.slug}.png`">
            </v-avatar>
          </v-btn>
          <v-btn :to="{ name: 'publish-review', params: { book: currentBook }}"
            color="blue lighten-2"
            fab
            v-if="$store.getters.isAllowedToPublish">
            <v-icon large>mdi-star</v-icon>
          </v-btn>
          <v-btn class="ma-2"
            v-if="$store.state.isAdmin"
            fab
            @click.stop="dialog = true"
            color="pink lighten-2">
            <v-icon dark>mdi-border-color</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-list color="rgb(255, 0, 0, 0)" dense>
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
          <v-rating 
            v-model="review.rating"
            dense
            medium
            half-increments
          ></v-rating>
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
import EditBook from '@/components/Admin/EditBook';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/Audio/AudioPlayer';

import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/sv';


export default {
  components: {
    'audio-player': AudioPlayer,
    EditBook,
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
    inQr(id) {
      if (_.findIndex(this.$store.state.qrArray, { id }) > -1) {
        return true;
      }
      return false;
    },
    closeDialog(data) {
      if (data) {
        console.log(data);
        this.currentBook.title = data.title;
        this.currentBook.pages = data.pages;

        this.author = data.author;
        this.genre = data.genre;
      }
      this.dialog = false;
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
