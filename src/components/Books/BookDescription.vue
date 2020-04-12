<template>
<v-container>
    <v-row justify="center">
      <v-col :align="'center'" cols="12" md="4" class="pb-0">
        <v-img v-if="book.imageUrl"
          :src="book.imageUrl"
          height="340px"
          max-width="220px">
        </v-img>
        <image-missing v-else />
      </v-col>
      <v-col cols="12" md="8" l="10" class="pb-0">
        <v-card flat color="rgb(255, 0, 0, 0)">
            <v-container class="pa-0">
              <v-row justify="center">
                <v-col cols="auto" class="pl-0 pr-0 pt-5 pb-0">
                  <v-btn icon v-if="book.genreId"
                    :to="{ name: 'books', params: 
                      { 
                        genre: { 
                          id: book.genreId,
                          slug: book.genreSlug,
                        } 
                      }
                    }"
                    width="auto" height="auto" class="ma-2"
                    >
                    <v-avatar size="55">
                      <img class="genre-icon"
                        :src="`${imagesUrl}${book.genreSlug}.png`">
                    </v-avatar>
                  </v-btn>
                  <v-btn v-else-if="isLoggedIn" fab color="blue-grey lighten-4" class="ma-2"
                    @click="editGenreDialog = true">
                    <v-icon>mdi-help</v-icon>
                  </v-btn>
                  <v-btn v-else fab color="blue-grey lighten-4" class="ma-2"
                    disabled>
                    <v-icon>mdi-help</v-icon>
                  </v-btn>
                </v-col>
                <!-- <v-col cols="9" sm="6"> -->
                <v-col cols="auto" sm="6" class="pb-0">
                  <v-card-title class="pl-0 pb-0 text-left">
                    {{ book.title }}
                  </v-card-title>
                  <v-card-title class="pl-0 pt-0 subtitle-1">
                    <router-link class="authorlink"
                      :to="{ name: 'books', params: { forceSearch: book.author }}">
                       {{ book.author }}
                    </router-link>
                  </v-card-title>
                </v-col>
                <v-col class="pa-0 d-none d-sm-flex" cols="12" sm="4">
                  <book-toolbar
                    :book="book"
                    :isReviewedByUser="isReviewedByUser"
                    @bookReviewed="bookReviewed">
                  </book-toolbar>
                </v-col>
              </v-row>
            </v-container>
          <v-card-text class="text-left pa-0">
            <v-container class="pa-0">
              <v-row>
                <v-col cols="12" sm="2" class="text-center pa-0"
                  v-if="reviews.length > 0 && reviews[0].descriptionAudioUrl">
                  <audio-player class="audio-player btn pa-0"
                    :sources="formattedAudioUrl(reviews[0].descriptionAudioUrl)"
                    :audioInfo="{
                      book: {
                        title: book.title,
                        id: book.id,
                      },
                      type: 'description',
                    }"/>
                </v-col>
                <v-col cols="12" sm="10" class="pt-0">
                  {{ book.description }}
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-if="isAdmin && isLoggedIn" justify="">
    <v-spacer></v-spacer>
    <v-btn text color="orange lighten-3" class="ma-2"
      :to="{ name: 'post-book', params: { slug: book.slug }}">
      <v-icon class="pr-2">mdi-shield-account</v-icon>
      redigera bok
    </v-btn>
  </v-row>
  <v-row>
    <v-col class="pt-0 pb-0" cols="12">
      <v-list color="rgb(255, 0, 0, 0)" dense>
        <v-list-item>
          <v-list-item-content class="pa-0">Genre</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ book.genreDisplayName }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0">Sidor</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ book.pages }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0 text-left">Hur många har läst boken?</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ book.readCount }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="pa-0">Betyg</v-list-item-content>
          <v-list-item-content class="pa-0 text-right">
            <v-rating 
              v-model="ratingFloat"
              dense
              medium
              readonly
              half-increments
            ></v-rating>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
  <v-row class="d-flex d-sm-none pa-0">
        <v-col class="pa-0" cols="12">
          <book-toolbar
            :book="book"
            :isReviewedByUser="isReviewedByUser"
            @bookReviewed="bookReviewed">
          </book-toolbar>
        </v-col>
  </v-row>
  <v-row v-if="reviews.length > 0">
    <v-col cols="12 pb-0 pt-0">
      <h1 class="text-left pa-0">Recensioner</h1>
    </v-col>
    <v-col cols="12" class="pa-0" v-for="review in reviews"
      :key="review.id">
      <book-review
        :review="review"
        :book="book"
        >
      </book-review>
    </v-col>
  </v-row>
  <v-dialog v-model="editGenreDialog">
    <edit-genre-dialog
      :book="book"
      @submitted="genreEdited">
    </edit-genre-dialog>
  </v-dialog>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import BookToolbar from '@/components/Books/BookToolbar';
import BookReview from '@/components/Books/BookReview';
import ImageMissing from '@/components/Books/ImageMissing';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/Audio/AudioPlayer';
import EditGenreDialog from '@/components/Admin/EditGenreDialog';

import { mapGetters } from 'vuex';


export default {
  components: {
    AudioPlayer,
    BookToolbar,
    BookReview,
    ImageMissing,
    EditGenreDialog,
  },
  data() {
    return {
      editGenreDialog: false,
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      book: {},
      reviews: [],
      isReviewedByUser: true,
      pausePlayer: {
        status: false,
        id: null,
      },
    };
  },
  metaInfo() {
    return {
      title: this.book.title,
    };
  },
  created() {
    this.$nextTick(() => {
      this.getBookFromSlug();
      this.getReviews();
    });
  },
  computed: {
    ratingFloat() {
      return parseFloat(this.book.rating);
    },
    ...mapGetters([
      'isLoggedIn',
      'isAdmin',
    ]),
  },
  methods: {
    genreEdited() {
      this.editGenreDialog = false;
      this.getBookFromSlug();
    },
    bookReviewed() {
      this.$store.commit('showSnackbar', {
        status: true,
        value: 'Recension publicerad!',
        color: 'green lighten-2',
        timeout: 5000,
        hasLink: false,
      });
      setTimeout(() => {
        this.$router.go();
      }, 3000)
    },
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
    getBookFromSlug() {
      let userId = null;
      if (this.isLoggedIn) {
        userId = this.$store.state.user.id;
      }
      Books.getFromSlug(this.$route.params.slug, userId)
        .then((result) => {
          this.book = result.data.book;
          this.isReviewedByUser = result.data.isReviewedByUser;
        });
    },
    getReviews() {
      Reviews.getAll(this.$route.params.slug)
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
  font-size: 1.5em;
  margin-bottom: 5px;
  font-weight: bold;
}


</style>
