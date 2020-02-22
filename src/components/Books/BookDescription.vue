<template>
<v-container>
    <v-row justify="center">
      <v-col :align="'center'" cols="12" md="4" class="pb-0">
        <v-img
          :src="imageUrl"
          height="340px"
          max-width="220px">
        </v-img>
      </v-col>
      <v-col cols="12" md="8" l="10" class="pb-0">
        <v-card flat color="rgb(255, 0, 0, 0)">
            <v-container class="pa-0">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card-title class="pl-0 pb-0">
                  <v-spacer class="d-flex d-sm-none"></v-spacer>
                    {{ currentBook.title }}
                  <v-spacer class="d-flex d-sm-none"></v-spacer>
                  </v-card-title>
                  <v-card-title class="pl-0 pt-0 subtitle-1">
                    <v-spacer class="d-flex d-sm-none"></v-spacer>
                    <router-link class="authorlink pl-1"
                      :to="{ name: 'books', params: { forceSearch: author.fullName }}">
                       {{ author.fullName }}
                    </router-link>
                    <v-spacer class="d-flex d-sm-none"></v-spacer>
                  </v-card-title>
                </v-col>
                <v-col class="pa-0" cols="12" sm="6">
                  <book-toolbar
                    :genre="genre"
                    :currentBook="currentBook"
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
                  <audio-player class="audio-player btn"
                    :sources="formattedAudioUrl(reviews[0].descriptionAudioUrl)"
                    :audioInfo="{
                      book: {
                        title: currentBook.title,
                        id: currentBook.id,
                      },
                      type: 'description',
                    }"/>
                </v-col>
                <v-col cols="12" sm="10" class="pt-0">
                  {{ currentBook.description }}
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="pt-0" cols="12">
      <v-list color="rgb(255, 0, 0, 0)" dense>
        <v-list-item>
          <v-list-item-content class="pa-0 text-left">Hur många har läst boken?</v-list-item-content>
          <v-list-item-content class="pa-0">
            <p class="text-right">
              {{ readCount }}
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
              v-model="rating"
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
    <v-col cols="12" class="pa-0" v-for="review in reviews"
      :key="review.id">
      <book-review
        :review="review"
        :book="currentBook"
        >
      </book-review>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import Books from '@/api/services/books';
import BookToolbar from '@/components/Books/BookToolbar';
import BookReview from '@/components/Books/BookReview';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/Audio/AudioPlayer';

export default {
  components: {
    AudioPlayer,
    BookToolbar,
    BookReview,
  },
  data() {
    return {
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
      reviews: [],
      currentBook: {},
      rating: '',
      readCount: '',
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
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
    getBookFromSlug() {
      Books.getFromSlug(this.$route.params.slug)
        .then((result) => {
          if (result.data.book.reviews.length > 0) {
            this.reviews = result.data.book.reviews;
          }
          this.currentBook = result.data.book;
          this.genre = result.data.book.genres[0];
          this.readCount = result.data.readCount;
          this.rating = result.data.rating;
          if (result.data.book.authors.length > 0) {
            this.author.fullName = `${result.data.book.authors[0].firstname} ${result.data.book.authors[0].lastname}`;
            this.author.id = result.data.book.authors[0].id;
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
  font-size: 1.5em;
  margin-bottom: 5px;
  font-weight: bold;
}


</style>
