<template>
    <v-list color="rgb(255, 0, 0, 0)">
      <v-list-item>
        <v-list-item-icon class="pl-4">
          <v-icon color="indigo">mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ma-0">
          <v-list-item-title class="text-left">
            Ellagårdsskolan
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="pl-4">
          <v-icon color="indigo">mdi-google-classroom</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            Klass {{$store.state.user.classDisplayName}} 
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="pl-4">
          <v-icon color="indigo">mdi-bookshelf</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            <span class="font-weight-bold">
              {{$store.state.user.booksRead}} 
            </span>
            lästa böcker
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="pl-4">
          <v-icon color="indigo">mdi-book-open-page-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            <span class="font-weight-bold">
            {{$store.state.user.pagesRead}}
            </span>
            sidor lästa
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="pl-4">
          <v-icon color="indigo">mdi-star-half</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            <span class="font-weight-bold">
              {{$store.state.user.reviewsWritten}}
            </span>
            recensioner
            </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="pl-2 mr-6">
            <v-avatar size="40">
              <img class="genre-icon"
                :src="`${imagesUrl}${favouriteGenre.slug}.png`">
            </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            Gillar: {{favouriteGenre.name}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</template>

<script>
import Urls from '@/assets/urls';

export default {
  name: 'user-info',
  props: {
    favouriteGenre: Object,
  },
  data: () => ({
    imagesUrl: Urls.images,
  }),
  methods: {
  },
};
</script>