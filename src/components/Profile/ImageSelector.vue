
<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" color="red">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Avatar</v-card-title>
        <v-carousel height="500" hide-delimiters show-arrows>
          <v-carousel-item
            v-for="avatar in avatars"
            :key="avatar.id"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-img :src="avatar.imageUrl">
              <v-btn
                class="pr-6 ma-1"
                dark
                rounded
                absolute
                bottom
                right
                color="green"
                @click="chooseAvatar(avatar.id)"
              >
                <v-icon centered right dark>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-img>
          </v-carousel-item>
        </v-carousel>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable no-console */

import User from "@/api/services/user";
import Avatars from "@/api/services/avatars";

export default {
  name: "image-selector",
  data() {
    return {
      dialog: false,

      avatars: []
    };
  },
  methods: {
    chooseAvatar: function(id) {
      console.log(id);
      User.updateAvatar({
        avatarId: id,
        userId: this.$store.state.user.id
      }).then(() => {
        window.location.reload();
        this.dialog = false;
      });
    }
  },
  mounted() {
    Avatars.getAllAvatars().then(response => (this.avatars = response.data));

    // api.get("avatar").then(response => (this.avatars = response.data.data));
    // fetch("http://api.ellabib.se/avatar")
    //   .then(response => response.json())
    //   .then(data => {
    //     this.avatars = data;
    //   });
  }
};
</script>
   