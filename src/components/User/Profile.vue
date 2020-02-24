<template>
  <v-container>
    <v-flex class="mt-2">
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <avatar></avatar>
        </v-col>
        <v-col cols="12" md="4">
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
          <bar></bar>
        </v-col>
      </v-row>
    </v-flex>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import User from "@/api/services/user.js";
import Classes from "@/api/services/classes.js";
import SchoolUnit from "@/api/services/schoolunit.js";
import Bar from "@/components/Profile/Bar";
import Avatar from "@/components/Profile/Avatar";
import UserInfo from "@/components/User/UserInfo";
import BookListSmall from "@/components/Books/BookListSmall";


import { mapGetters } from 'vuex';

export default {
  name: "profile",
  components: { 
    Bar, 
    Avatar,
    UserInfo,
    BookListSmall,
  },
  created() {
    this.getUser();
    this.getRecentlyRead();
    this.getFavouriteGenre();
  },
  props: {
    source: String
  },
  data: () => ({
    recentlyRead: [],
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
    getUser() {
      User.getUser(this.userId).then(result => {
        this.$store.commit("userData", result.data[0]);
        this.getClasses();
        this.getSchoolUnit();
      });
    },
    getRecentlyRead() {
      User.getRecentlyRead(this.userId)
        .then((result) => {
          this.recentlyRead = result.data;
        });
    },
    getFavouriteGenre() {
      User.getFavouriteGenre(this.userId)
        .then((result) => {
          this.favouriteGenre = result.data;
          console.log(result);
        });
    },
    getClasses() {
      Classes.getClasses(this.$store.state.classes).then(result => {
        this.$store.commit("classes", result.data);
      });
    },
    getSchoolUnit() {
      SchoolUnit.getSchoolUnit(this.$store.state.schoolUnit).then(result => {
        this.$store.commit("schoolUnit", result.data);
      });
    }
  }
};
</script>