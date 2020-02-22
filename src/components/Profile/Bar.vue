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
/* eslint-disable no-console */
export default {
  name: "bar",
  data() {
    return {
      userPagesRead: this.$store.getters.user.pagesRead,
      userReviews: this.$store.getters.user.reviewsWritten,
      classPagesRead: this.$store.getters.userClass.pagesRead,
      classReviews: this.$store.getters.userClass.reviewsWritten,
      schoolPagesRead: this.$store.getters.userSchoolUnit.pagesRead,
      schoolReviews: this.$store.getters.userSchoolUnit.reviewsWritten
    };
  },
  computed: {
    userVsClassPages() {
      return Math.round((this.userPagesRead / this.classPagesRead) * 100);
    },
    classVsSchoolPages() {
      return Math.round((this.classPagesRead / this.schoolPagesRead) * 100);
    },
    classVsSchoolReviews() {
      return Math.round((this.classReviews / this.schoolReviews) * 100);
    },
    userVsSchoolReviews() {
      return Math.round((this.userReviews / this.classReviews) * 100);
    }
  }
};
</script>

<style>
</style>