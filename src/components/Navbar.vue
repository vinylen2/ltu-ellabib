<template>
<v-app-bar
      color="green lighten-3"
      dark
      fixed
      app
    >
    <v-toolbar-items>
      <v-btn text v-if="isMobile"
        to="/">
        <v-icon class="mr-3">mdi-home</v-icon>
      </v-btn>
      <v-btn text v-else
        to="/">
        <v-icon class="mr-3">mdi-home</v-icon>
        Hem
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/books" text v-if="isMobile">
       <v-icon>mdi-bookshelf</v-icon>
      </v-btn>
      <v-btn to="/books" text v-else>Böcker</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isLoggedIn">
      <v-btn to="/leaderboard" text v-if="isMobile">
        <v-icon>mdi-seal</v-icon>
      </v-btn>
      <v-btn to="/leaderboard" text v-else>Ledartavla</v-btn>
    </v-toolbar-items>
    <v-toolbar-items
      v-if="isAdmin && !isMobile && isLoggedIn">
      <v-btn to="/admin/post-book" text>Lägg till bok</v-btn>
      <v-btn to="/admin/activate-reviews" text>Recensioner</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="isLoggedIn">
      <v-btn to="/profile" text
        id="icon-nav">
          <v-progress-circular
            indeterminate
            color="indigo"
            v-if="!navbarIcon"
          ></v-progress-circular>
      </v-btn>
      <v-btn text @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!isLoggedIn">
      <v-btn text @click="$router.push({name: 'auth-skolon'})">
        Logga in
      </v-btn>
    </v-toolbar-items>
    <!-- <v-toolbar-items>
      <skolon-button></skolon-button>
    </v-toolbar-items> -->
</v-app-bar>
</template>

<script>
// import SkolonButton from '@/components/Skolon/SkolonButton';
import Urls from '@/assets/urls';

import { mapGetters } from 'vuex';

export default {
  name: 'navbar',
  // components: {
  //   SkolonButton,
  // },
  data() {
    return {
      imagesUrl: Urls.images,
    };
  },
  created() {
    this.$store.dispatch('getGenres');
  },
  computed: {
    ...mapGetters([
      'user',
      'isMobile',
      'isAdmin',
      'isLoggedIn',
      'navbarIcon',
    ]),
  },
  methods: {
    logout() {
      this.$store.commit('userLogout');
      this.$router.push({ name: 'frontpage' });
    },
  },
};
</script>