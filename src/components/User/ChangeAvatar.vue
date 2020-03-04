<template>
<v-card>
  <v-card-title>
    Ändra avatar
  </v-card-title>
  <v-container>
    <v-row>
      <v-col cols="1" v-for="avatar in avatars" :key="avatar.id">
        <v-icon>mdi-account</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-row>
        <v-col 
          v-for="color in colors" :key="color.id">
          {{color.displayName}}
        </v-col>
      </v-row>
    </v-row>
    <v-row justify="center">
      <v-btn color="red darken-1" text @click="closeDialog">Stäng</v-btn>
      <v-btn color="blue darken-1" text @click="updateAvatar">Spara</v-btn>
    </v-row>
  </v-container>
</v-card>
</template>

<script>
import Avatars from '@/api/services/avatars';

export default {
  name: 'change-avatar',
  data: () => ({
    avatars: [],
    colors: [],
  }),
  created() {
    this.getAllAvatars();
  },
  methods: {
    getAllAvatars() {
      Avatars.getAll()
        .then((result) => {
          this.avatars = result.avatars;
          this.colors = result.colors;
        });
    },
    updateAvatar() {},
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
};
</script>