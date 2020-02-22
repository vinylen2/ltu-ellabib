<template>
<v-container>
  <v-list subheader color="rgb(255, 0, 0, 0)">
    <v-subheader class="headline">{{title}}</v-subheader>
    <v-list-item
      v-for="book in books"
      :key="book.id"
      @click="goToBook(book.bookSlug)">
      <v-list-item-avatar class="ml-5" tile height="150px" width="100px">
        <v-img max-height="250px" max-width="140px" :src="book.imageUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item four-line>
        <v-list-item-content class="text-left">
          <v-list-item-title class="title">{{book.title}}</v-list-item-title>
          <v-list-item-subtitle>
            {{book.author}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-rating 
              v-model="book.rating"
              dense
              medium
              half-increments
            ></v-rating>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-action class="mr-5">
        <v-avatar
          size="55">
          <img class="genre-icon"
            :src="`${imagesUrl}${book.genreSlug}.png`"/>
        </v-avatar>

      </v-list-item-action>
    </v-list-item>
  </v-list>

</v-container>
</template>

<script>
import Urls from '@/assets/urls';

export default {
  name: 'book-list-small',
  props: {
    books: Array,
    title: String,
  },
  data: () => ({
    imagesUrl: Urls.images,
  }),
  methods: {
    goToBook(slug) {
      this.$router.push(`book/${slug}`);
    },
  },
};
</script>