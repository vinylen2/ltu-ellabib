<template>
  <div>
    <v-flex class="mt-5">
      <v-card class="md-10 pa-2" color="dark">
        <v-progress-linear
          color="light-blue"
          height="30"
          :value="userVsClassPages"
        >{{userVsClassPages}}%</v-progress-linear>
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
    </v-flex>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

/* eslint-disable no-console */
export default {
  name: "bar",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'userClass',
      'userSchoolUnit'
    ]),
    userVsClassPages() {
      return Math.round((this.user.pagesRead / this.userClass.pagesRead ) * 100);
    },
    classVsSchoolPages() {
      return Math.round((this.userClass.pagesRead / this.userSchoolUnit.pagesRead) * 100);
    },
    classVsSchoolReviews() {
      return Math.round((this.userClass.reviewsWritten / this.userSchoolUnit.reviewsWritten) * 100);
    },
    userVsSchoolReviews() {
      return Math.round((this.userClass.reviewsWritten / this.userSchoolUnit.reviewsWritten) * 100);
    }
  }
};
</script>

<style>
</style>