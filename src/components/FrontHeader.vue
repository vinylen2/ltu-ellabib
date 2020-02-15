<template>
  <v-carousel
    height="300px"
    continuos
    cycle
    hide-delimiters
    :show-arrows-on-hover="true">
    <v-carousel-item class="green lighten-4">
      <router-link to="/books">
        <div class="header-text"
          v-if="$store.state.count.books != 0">
          <span class="one">
            {{$store.state.count.books}}
          </span>
          <span>böcker</span>
        </div>
      </router-link>
    </v-carousel-item>
    <v-carousel-item class="green lighten-4">
      <router-link to="/books">
        <div class="header-text"
          v-if="$store.state.count.books != 0">
          <span class="one">
            {{$store.state.count.reviews.reviewsWritten}}
          </span>
          <span>recensioner</span>
        </div>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Books from '@/api/services/books';

export default {
  name: 'front-header',
  data: () => ({

  }),
  created() {
    this.getCount();
  },
  methods: {
    getCount() {
      Books.count()
        .then((result) => {
          this.$store.commit('count', {
            books: result.data.books.count,
            reviews: result.data.reviews,
          });
        });
    },

  },
};
</script>

<style scoped>
a {
  color: #2c3e50;
  cursor: pointer;
}
/* .container {
  margin: 0;
  display: block;
} */

.header-text {
  position: absolute;
  top: 20%;
  left: 20%;
  vertical-align: center;
  color: #2c3e50;
}
.one {
  font-size: 3em;
  font-weight: bold;
}

span {
  display:inline-block;
  font-size: 2em;
}
</style>
