<template>
<v-container>
  <v-row class="justify-center pt-4">
    <span class="headline">Leaderboard</span>
  </v-row>
  <v-row class="justify-center pt-5">
    <v-tabs color="teal darken-4" grow>
      <v-tab>
        <v-icon class="pr-3">mdi-bookshelf</v-icon>
        <span v-if="!isMobile">
          Böcker lästa
        </span>
      </v-tab>
      <v-tab>
        <v-icon class="pr-3">
            mdi-book-open-page-variant
        </v-icon>
        <span v-if="!isMobile">Sidor lästa</span>
      </v-tab>
      <v-tab>
        <v-icon class="pr-3">mdi-microphone</v-icon>
        <span v-if="!isMobile">Recensioner</span>
      </v-tab>
      <v-tab-item>
        <LeaderTableBooks />
      </v-tab-item>
      <v-tab-item>
        <LeaderTablePages />
      </v-tab-item>
      <v-tab-item>
        <LeaderTableReviews />
      </v-tab-item>
    </v-tabs>
  </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import LeaderTablePages from "@/components/Progression/LeaderTablePages";
import LeaderTableBooks from "@/components/Progression/LeaderTableBooks";
import LeaderTableReviews from "@/components/Progression/LeaderTableReviews";

import { mapGetters } from 'vuex';

export default {
  name: "leaderboard",
  components: { LeaderTablePages, LeaderTableBooks, LeaderTableReviews },
  computed: {
    ...mapGetters([
      'isMobile',
    ]),
  },
  created() {
    this.$store.dispatch('getUser');
    this.$store.dispatch('getClasses');
    this.$store.dispatch('getSchoolUnits');
  },
};
</script>

<style scoped>
/* Helper classes */
.basil--text {
  color: #356859 !important;
}
</style>