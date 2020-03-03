<template>
<v-container>
  <v-row class="justify-center pa-5">
    <h1 class="headline font-weight-bold">Leaderboard</h1>
  </v-row>
  <v-row class="pa- justify-center">
    <v-tabs background-color="transparent" grow>
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
        <v-row v-for="(classData, index) in sortedClassesPages" :key="classData.id">
          <v-card-title
            v-if="classData.id == user.class.id"
            class="pl-5 font-weight-black headline"
          >
            {{index +1}}. Klass {{classData.displayName}}, {{classData.pagesRead}} sidor
          </v-card-title>
          <v-card-title v-else class="pl-5">{{index +1}}. Klass {{classData.displayName}}, {{classData.pagesRead}} sidor</v-card-title>
          <v-container v-if="index == 0">
            <v-progress-linear
              buffer-value="98"
              :value="percentage(classData.pagesRead, sortedClassesPages[0].pagesRead)"
              height="15"
              color="green"
              class="pl-2"
            >
            </v-progress-linear>
          </v-container>
          <v-container v-else-if="index < 5">
            <v-progress-linear
              buffer-value="98"
              :value="percentage(classData.pagesRead, sortedClassesPages[0].pagesRead)"
              height="15"
              color="blue"
              class="pl-2"
            >
            </v-progress-linear>
          </v-container>
          <v-container v-else-if="index > 4 && classData.id == user.class.id ">
            <v-progress-linear
              buffer-value="98"
              :value="percentage(classData.pagesRead, sortedClassesPages[0].pagesRead)"
              height="15"
              color="red"
              class="pl-2"
            >
              <v-card-text>Sidor lästa {{classData.pagesRead}}</v-card-text>
            </v-progress-linear>
          </v-container>
        </v-row>
      </v-tab-item>
      <v-tab-item>
          <v-row v-for="(classData, index) in sortedClassesBooks" :key="classData.id">
            <v-card-title
              v-if="classData.id == user.class.id"
              class="pl-5 font-weight-black headline"
            >{{index +1}}. Klass {{classData.displayName}}</v-card-title>
            <v-card-title v-else class="pl-5">{{index +1}}. Klass {{classData.displayName}}</v-card-title>
            <v-container v-if="index == 0">
              <v-progress-linear
                buffer-value="98"
                :value="percentage(classData.booksRead, sortedClassesBooks[0].booksRead)"
                height="15"
                color="green"
                class="pl-2"
              >
                <v-card-text>Böcker lästa {{classData.booksRead}}</v-card-text>
              </v-progress-linear>
            </v-container>
            <v-container v-else-if="index <5">
              <v-progress-linear
                buffer-value="98"
                :value="percentage(classData.booksRead, sortedClassesBooks[0].booksRead)"
                height="15"
                color="blue"
                class="pl-2"
              >
                <v-card-text>Böcker lästa {{classData.booksRead}}</v-card-text>
              </v-progress-linear>
            </v-container>
            <v-container v-else-if="index > 4 && classData.id == user.class.id">
              <v-progress-linear
                buffer-value="98"
                :value="percentage(classData.booksRead, sortedClassesBooks[0].booksRead)"
                height="15"
                color="blue"
                class="pl-2"
              >
                <v-card-text>Böcker lästa {{classData.booksRead}}</v-card-text>
              </v-progress-linear>
            </v-container>
          </v-row>
      </v-tab-item>
      <v-tab-item>
          <v-row v-for="(classData, index) in sortedClassesReviews" :key="classData.id">
            <v-card-title
              v-if="classData.id == user.class.id"
              class="pl-5 font-weight-black headline"
            >{{index +1}}. Klass {{classData.displayName}}</v-card-title>
            <v-card-title v-else class="pl-5">{{index +1}}. Klass {{classData.displayName}}</v-card-title>
            <v-container v-if="index == 0">
              <v-progress-linear
                buffer-value="98"
                :value="percentage(classData.reviewsWritten, sortedClassesReviews[0].reviewsWritten)"
                height="15"
                color="green"
                class="pl-2"
              >
                <v-card-text>Böcker lästa {{classData.reviewsWritten}}</v-card-text>
              </v-progress-linear>
            </v-container>
            <v-container v-else-if="index < 5">
              <v-progress-linear
                buffer-value="98"
                :value="percentage(classData.reviewsWritten, sortedClassesReviews[0].reviewsWritten)"
                height="15"
                color="blue"
                class="pl-2"
              >
                <v-card-text>Böcker lästa {{classData.reviewsWritten}}</v-card-text>
              </v-progress-linear>
            </v-container>
            <v-container v-else-if="index > 4 && classData.id == user.class.id">
              <v-progress-linear
                buffer-value="98"
                :value="percentage(classData.reviewsWritten, sortedClassesReviews[0].reviewsWritten)"
                height="15"
                color="blue"
                class="pl-2"
              >
                <v-card-text>Böcker lästa {{classData.reviewsWritten}}</v-card-text>
              </v-progress-linear>
            </v-container>
          </v-row>
      </v-tab-item>
    </v-tabs>
  </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  name: "leaderboard",
  data() {
    return {};
  },
  created() {},
  methods: {
    percentage(nominator, denominator) {
      return (nominator / denominator) * 98;
    }
  },
  computed: {
    ...mapGetters([
      "sortedClassesPages",
      "sortedClassesBooks",
      "sortedClassesReviews",
      "user"
    ])
  }
};
</script>

<style scoped>
/* Helper classes */
.basil--text {
  color: #356859 !important;
}
</style>