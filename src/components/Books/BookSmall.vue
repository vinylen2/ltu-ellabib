<template>
<router-link :to="{ name: 'bok', params: { slug: book.slug }}"
  class="justyfi-center">
  <v-card flat color="rgb(255, 0, 0, 0)"
    :align="'center'"
    >
    <v-img
      :src="imageUrl"
      class="white--text"
      height="300px"
      max-width="220px"
      >
    </v-img>
    <v-card-actions class="justify-center">
      {{book.title}}
    </v-card-actions>
  </v-card>
</router-link>
</template>


<script>
import Urls from '@/assets/urls';

export default {
  name: 'book-small',
  props: {
    book: Object,
  },
  computed: {
    imageUrl: function() {
      if (this.book.localImage) {
        return `${this.imagesUrl}${this.book.imageUrl}`;
      } else {
        return this.book.imageUrl;
      }
    }
  },
  data: () => ({
    imagesUrl: Urls.images,
  }),
}
</script>

