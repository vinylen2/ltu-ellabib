<template>
  <v-container>
    <v-app id="inspire">
      <v-flex class="mt-2">
        <v-row>
          <v-col cols="6">
            <avatar></avatar>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <bar></bar>
          </v-col>
        </v-row>
      </v-flex>
    </v-app>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import User from "@/api/services/user.js";
import Classes from "@/api/services/classes.js";
import SchoolUnit from "@/api/services/schoolunit.js";
import Bar from "@/components/Profile/Bar";
import Avatar from "@/components/Profile/Avatar";

export default {
  name: "profile",
  components: { Bar, Avatar},
  created() {
    this.getUser();
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logOut() {
      this.$store.commit("userLogout");
    },
    getUser() {
      User.getUser(this.$store.state.user.id).then(result => {
        this.$store.commit("userData", result.data[0]);
        this.getClasses();
        this.getSchoolUnit();
      });
    },
    getClassById() {
      Classes.getClassById(this.$store.state.user.classId)
        .then((result) => {
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