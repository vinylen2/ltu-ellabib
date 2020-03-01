<template>
<router-link :to="{ name: 'bok', params: { slug: book.slug }}"
  class="justify-center">
  <v-card flat color="rgb(255, 0, 0, 0)"
    :align="'center'"
    >
    <v-img v-if="imageUrl"
      :src="imageUrl"
      class="white--text"
      height="300px"
      max-width="220px"
      >
    </v-img>
    <image-missing v-else></image-missing>
    <v-card-actions class="justify-center">
      {{book.title}}
    </v-card-actions>
  </v-card>
</router-link>
</template>


<script>
import Urls from '@/assets/urls';
import ImageMissing from '@/components/Books/ImageMissing';

export default {
  name: 'book-small',
  components: {
    ImageMissing,
  },
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

<style scoped>

a {
  text-decoration: none;
}

</style>

