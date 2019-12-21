<template>
<v-container>
  <v-row>
    <v-col>
      <v-btn v-if="playing && small"
        fab
        small
        color="green lighten-2"
        @click="togglePlayback">
        <v-icon small>mdi-pause</v-icon>
      </v-btn>
      <v-btn v-if="playing && !small"
        fab
        color="green lighten-2"
        @click="togglePlayback">
        <v-icon large>mdi-pause</v-icon>
      </v-btn>
      <v-btn v-if="!playing && small"
        color="green lighten-2"
        fab
        small
        @click="togglePlayback">
        <v-icon small>mdi-play</v-icon>
      </v-btn>
      <v-btn v-if="!playing && !small"
        color="green lighten-2"
        fab
        @click="togglePlayback">
        <v-icon large>mdi-play</v-icon>
      </v-btn>
      <!-- <v-btn v-if="small"
        fab
        small
        color="green lighten-2"
        @click="reset">
        <v-icon small>mdi-skip-backward</v-icon>
      </v-btn>
      <v-btn v-if="!small"
        fab
        color="green lighten-2"
        @click="reset">
        <v-icon large>mdi-skip-backward</v-icon>
      </v-btn> -->
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import VueHowler from 'vue-howler';
import Reviews from '@/api/services/reviews';

export default {
  mixins: [VueHowler],
  props: [
    'audioInfo',
    'small',
  ],
  data() {
    return {
      played: false,
      book: {
        title: this.audioInfo.book.title,
        id: this.audioInfo.book.id,
      },
      type: this.audioInfo.type,
      audioId: this.audioInfo.id,
    };
  },
  computed: {
    playDuration() {
      return this.seek / this.duration;
    },
    gaCategory() {
      if (this.type === 'review') {
        return 'Recension';
      }
      return 'Beskrivning';
    },
  },
  watch: {
    playDuration() {
      if (this.something > 0.3 && !this.played && !this.admin) {
        this.gaPlay();
        this.incrementCounter();
        this.played = true;
      }
    },
  },
  methods: {
    gaPlay() {
      this.$ga.event({
        eventCategory: 'Ljud',
        eventAction: this.book.title,
        eventLabel: this.gaCategory,
      });
    },
    incrementCounter() {
      Reviews.incrementPlay({
        reviewId: this.audioId,
        type: this.type,
      });
    },
    reset() {
      this.setSeek(0);
      this.played = false;
      this.play();
    },
  },
};
</script>

<style scoped>

.button:hover {
  background-color: #71c5e8;
}

.button {
  border: none;
  margin-right:5px;
  font-weight: bold;
  font-size: 3em;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.admin-button {
  border: none;
  margin-right:5px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}
.small a {
  width: 40px;
  height: 40px;
  font-size: 1em;
}

.button-2:hover {
  background-color: #71c5e8;
}

</style>
