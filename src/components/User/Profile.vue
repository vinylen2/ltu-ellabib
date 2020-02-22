<template>
  <v-container>
    <v-btn absolute right @click="logOut">Logga ut</v-btn>
    <v-app id="inspire">
      <v-flex class="mt-2">
        <v-row>
          <v-col cols="6">
            <Avatar > </Avatar>
            <ImageSelector />
            
          </v-col>
          
          <v-spacer></v-spacer>
          <v-col cols="6">
            <Bar />
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
import ImageSelector from "@/components/Profile/ImageSelector";

export default {
  name: "profile",
  components: { ImageSelector, Bar, Avatar},
  created() {
    this.getUser();
    this.getClasses();
    this.getSchoolUnit();
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
        this.$store.commit("userLogin", result.data[0]);

   
      });
    },
        getClasses() {
      Classes.getClasses(this.$store.state.classes).then(result => {
        this.$store.commit("classes", result.data);
        console.log(result);
      });
        },
         getSchoolUnit() {
      SchoolUnit.getSchoolUnit(this.$store.state.schoolUnit).then(result => {
        this.$store.commit("schoolUnit", result.data);
        console.log(result);
      });
   }
  }
};
</script>