<template>
<v-container fluid>
  <v-row class="justify-center pt-4">
    <span class="headline">Leaderboard</span>
  </v-row>
  <v-row class="justify-center pt-4">
    <v-tabs color="teal darken-4" grow>
      <v-tab>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="red" class="pr-3" v-on="on">
                mdi-seal
            </v-icon>
          </template>
          <span>{{pointsInfo}}</span>
        </v-tooltip>
        <span v-if="!isMobile">Poäng</span>
      </v-tab>
      <v-tab>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon class="pr-3" v-on="on">
                mdi-book-open-page-variant
            </v-icon>
          </template>
          <span>{{pagesInfo}}</span>
        </v-tooltip>
        <span v-if="!isMobile">Sidor lästa</span>
      </v-tab>
      <v-tab>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon class="pr-3"  v-on="on">mdi-bookshelf</v-icon>
          </template>
          <span>{{booksInfo}}</span>
        </v-tooltip>
        <span v-if="!isMobile">
          Böcker lästa
        </span>
      </v-tab>
      <v-tab>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon class="pr-3" v-on="on">mdi-pencil</v-icon>
          </template>
          <span>{{reviewsInfo}}</span>
        </v-tooltip>
        <span v-if="!isMobile">Recensioner</span>
      </v-tab>
      <v-tab-item>
        <LeaderTablePoints />
      </v-tab-item>
      <v-tab-item>
        <LeaderTablePages />
      </v-tab-item>
      <v-tab-item>
        <LeaderTableBooks />
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
import LeaderTablePoints from "@/components/Progression/LeaderTablePoints";

import { mapGetters } from 'vuex';
export default {
  name: "leaderboard",
  components: { 
    LeaderTablePages, 
    LeaderTableBooks, 
    LeaderTableReviews,
    LeaderTablePoints 
  },
  data: () => ({
    pointsInfo: 'De fem klasserna som har flest poäng på skolan.',
    reviewsInfo: 'De fem klasserna som skrivit flest recensioner på skolan.',
    booksInfo: 'De fem klasserna som har läst flest böcker på skolan.',
    pagesInfo: 'De fem klasserna som har läst flest sidor på skolan.',
  }),
  computed: {
    ...mapGetters(["isMobile"])
  }
};
</script>

<style scoped>
/* Helper classes */
.basil--text {
  color: #356859 !important;
}
</style>