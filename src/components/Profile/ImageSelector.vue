<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" color="indigo">
          <v-icon>mdi-pencil</v-icon>
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
                class="pr-4 ml-12 indigo--text"
                outlined
                absolute
                bottom
                right
                color="transparent"
                @click="chooseAvatar(avatar.id)"
              >
               Välj bild
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
      User.updateAvatar({
        avatarId: id,
        userId: this.$store.state.user.id
      }).then(() => {
        window.location.reload();
        this.dialog = false;
      });
    }
  },
  created() {
    Avatars.getAllAvatars().then(response => (this.avatars = response.data));
  }
};
</script>
   