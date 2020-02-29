<template>
<v-container color="rgb(255,0,0,0)">
  <v-card class="md-10 pa-2" color="rgb(255, 0, 0, 0)">
    <v-row>
      <v-col>
        <span>Klass {{user.class.displayName}} har läst {{user.class.booksRead}} böcker</span>
        <v-progress-linear
          color="light-blue"
          height="30"
          :value="classVsSchoolBooksRead"
        >{{user.schoolUnit.displayName}} har läst totalt {{user.schoolUnit.booksRead}} böcker</v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span>Du har läst {{user.pagesRead}} av {{user.class.pagesRead}} sidor i klass {{user.class.displayName}}</span>
        <v-progress-linear
          color="light-blue"
          height="30"
          :value="userVsClassPagesRead"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
    <br />
    <v-progress-linear
      color="light-green darken-4"
      height="30"
      :value="classVsSchoolPages"
    >{{classVsSchoolPages}}%</v-progress-linear>
    <br />
    <v-progress-linear height="30" :value="classVsSchoolReviews" color="lime">
      <h1>{{classVsSchoolReviews}}%</h1>
    </v-progress-linear>
    <br />
    <v-progress-linear :value="userVsSchoolReviews" height="30" color="deep-orange">
      <h1>{{userVsSchoolReviews}}%</h1>
    </v-progress-linear>
  </v-card>
</v-container>
</template>

<script>
import {mapGetters} from 'vuex';

/* eslint-disable no-console */
export default {
  name: "bar",
  computed: {
    ...mapGetters([
      'user',
    ]),
    userVsClassPagesRead() {
      return Math.round((this.user.pagesRead / this.user.class.pagesRead ) * 100);
    },
    classVsSchoolBooksRead() {
      return Math.round((this.user.class.booksRead / this.user.schoolUnit.booksRead) * 100);
    },
    classVsSchoolReviews() {
      return Math.round((this.user.class.reviewsWritten / this.user.schoolUnit.reviewsWritten) * 100);
    },
    userVsSchoolReviews() {
      return Math.round((this.user.class.reviewsWritten / this.user.schoolUnit.reviewsWritten) * 100);
    }
  }
};
</script>

<style>
</style>