<template>
  <v-row class="pa-12">
    <v-card color="rgb(255, 0, 0, 0)">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">Leaderboard</h1>
      </v-card-title>

      <v-tabs grow>
        <v-tab>
          <v-icon class="pr-3">mdi-book-open-page-variant</v-icon>Sidor lästa
        </v-tab>
        <v-tab>
          <v-icon class="pr-3">mdi-bookshelf</v-icon>Böcker lästa
        </v-tab>
        <v-tab>
          <v-icon class="pr-3">mdi-microphone</v-icon>Recensioner
        </v-tab>

        <v-tab-item>
          <v-card color="rgb(255, 0, 0, 0)" flat>
            <v-divider></v-divider>
            <v-row v-for="(classData, index) in sortedClassesPages" :key="classData.id">
              <v-card-title class="pl-5">1. Klass {{classData.displayName}}</v-card-title>
              <v-container v-if="index == 0">
                <v-progress-linear
                  buffer-value="100"
                  :value="classData.pagesRead"
                  height="15"
                  color="green"
                  class="pl-2 pr-2"
                >
                  <v-card-text>Sidor lästa {{classData.pagesRead}}</v-card-text>
                </v-progress-linear>
              </v-container>
              <v-container v-else>
                <v-progress-linear
                  buffer-value="100"
                  :value="percentage(classData.pagesRead, sortedClassesPages[0].pagesRead)"
                  height="15"
                  color="blue"
                  class="pl-2"
                >
                  <v-card-text>Sidor lästa {{classData.pagesRead}}</v-card-text>
                </v-progress-linear>
              </v-container>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-row>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  name: "leaderboard",
  data() {
    return {
  
    };
  },
  created() {
  },
  methods: {
    percentage(nominator, denominator) {
      return ( nominator / denominator) * 100;
    },
  },
  computed: {
    ...mapGetters([
      "sortedClassesPages",
      "sortedClassesBooks",
      "sortedClassesReviews"
    ]),
  }
};
</script>

<style scoped>
/* Helper classes */

.basil--text {
  color: #356859 !important;
}
</style>