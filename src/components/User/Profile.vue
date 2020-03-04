<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <user-info :favouriteGenre="favouriteGenre"></user-info>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row class="pa-0">
      <v-col cols="12" md="6" class="pa-0">
        <book-list-small title="Senast lästa" :books="recentlyRead">
        </book-list-small>
      </v-col>
      <v-col cols="12" md="6">
        <book-list-small title="Dina favoritböcker" :books="userFavourites">
        </book-list-small>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import User from "@/api/services/user.js";
// import Avatar from "@/components/User/Profile/Avatar";
import UserInfo from "@/components/User/UserInfo";
import BookListSmall from "@/components/Books/BookListSmall";


import { mapGetters } from 'vuex';

export default {
  name: "profile",
  components: { 
    // Avatar,
    UserInfo,
    BookListSmall,
  },
  mounted() {
    this.$store.dispatch('getUser');
    this.$store.dispatch('getClasses');
    this.$store.dispatch('getSchoolUnits');
    this.getRecentlyRead();
    this.getUserFavourites();
    this.getFavouriteGenre();
  },
  props: {
    source: String
  },
  data: () => ({
    recentlyRead: [],
    userFavourites: [],
    favouriteGenre: {},
  }),
  computed: {
    ...mapGetters([
      'userId',
    ]),
  },
  methods: {
    logOut() {
      this.$store.commit("userLogout");
    },
    getRecentlyRead() {
      User.getRecentlyRead(this.userId)
        .then((result) => {
          this.recentlyRead = result.data;
        });
    },
    getUserFavourites() {
      User.getUserFavourites(this.userId)
        .then((result) => {
          this.userFavourites = result.data;
        });
    },
    getFavouriteGenre() {
      User.getFavouriteGenre(this.userId)
        .then((result) => {
          this.favouriteGenre = result.data;
        });
    },
  }
};
</script>