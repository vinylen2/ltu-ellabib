<template>
<v-card>
  <v-card-title>
    Ändra avatar
  </v-card-title>
  <v-container v-show="loading" class="pb-10">
    <v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular>
  </v-container>
  <v-container v-show="!loading">
    <v-row class="justify-center">Välj avatar</v-row>
    <v-row>
      <v-col cols="1" v-for="avatar in avatars" :key="avatar.id" :id="avatar.id"
        :class="{ selected: selectedAvatarId == avatar.id }"
        @click="selectedAvatarId = avatar.id">
      </v-col>
    </v-row>
    <v-row class="justify-center">Välj färg</v-row>
    <v-row>
      <v-row>
        <v-col cols="1" height="20px"
          v-for="color in colors" :key="color.id"
          @click="toggleSelectedColor(color.id, color.color)"
          :class="color.color">
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
import { appendIcon, removeElement } from '@/assets/functions';

import { mapGetters } from 'vuex';

export default {
  name: 'change-avatar',
  data: () => ({
    loading: true,
    avatars: [],
    colors: [],
    selectedAvatarId: 1,
    selectedColorId: null,
  }),
  created() {
    this.getAllAvatars();
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  mounted() {
    setTimeout(() => {
      this.avatars.forEach((avatar) => {
        appendIcon(avatar.id, avatar.icon, 'grey');
      });
      this.loading = false;
    }, 1000)
  },
  methods: {
    getAllAvatars() {
      Avatars.getAll()
        .then((result) => {
          this.avatars = result.avatars;
          this.colors = result.colors;
        });
    },
    toggleSelectedColor(colorId, color) {
      this.selectedColorId = colorId;
      this.avatars.forEach((avatar) => {
        removeElement(`icon-${avatar.id}`);
        appendIcon(avatar.id, avatar.icon, color);
      });
    },
    updateAvatar() {
      Avatars.update({
        userId: this.user.id,
        avatarId: this.selectedAvatarId,
        colorId: this.selectedColorId
      }).then(() => {
        this.$emit('closeDialog');
      });
    },
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style>
.selected {
  border-style: solid;
  border-color: grey;
  border-width: thin;
}

</style>