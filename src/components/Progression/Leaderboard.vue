<template>
<v-container fluid>
  <v-row class="justify-center pt-4">
    <span class="headline">Leaderboard</span>
  </v-row>
  <v-row class="pa-12 justify-center">
    <v-tabs color="teal darken-4" grow>
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
        <v-icon class="pr-3" v-on="on">mdi-microphone</v-icon>
            </template>
            <span>{{reviewsInfo}}</span>
        </v-tooltip>
        <span v-if="!isMobile">Recensioner</span>
      
      </v-tab>
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

import { mapGetters } from 'vuex';

export default {
  name: "leaderboard",
  components: { LeaderTablePages, LeaderTableBooks, LeaderTableReviews },
   data: () => ({
      reviewsInfo: 'Antal recensioner som registrerats genom text, stjärnor eller inspelning hos de bästa klasserna på skolan ',
     booksInfo: 'Antal böcker lästa hos de bästa klasserna på skolan',
     pagesInfo: 'Antal sidor lästa hos de bästa klasserna på skolan'
   }),
  computed: {
    ...mapGetters([
      'isMobile',
    ]),
  },
};
</script>

<style scoped>
/* Helper classes */
.basil--text {
  color: #356859 !important;
}
</style>