<template>
<v-card class="pa-3">
  <v-card-title class="justify-center">
    Ändra avatar
  </v-card-title>
  <v-container v-show="loading" class="pb-10" >
    <v-progress-circular
      :size="50"
      color="indigo"
      indeterminate
    ></v-progress-circular>
  </v-container>
  <v-container v-show="!loading">
    <v-row class="justify-center">Du har {{user.points}} poäng.</v-row>
    <v-row>
      <div v-for="avatar in avatars" :key="avatar.id">
        <v-avatar class="ma-1" cols="1" :id="avatar.id"
            :class="{ selected: selectedAvatarId == avatar.id }"
            @click="selectedAvatarId = avatar.id"
            v-if="user.points >= avatar.pointRequirement">
        </v-avatar>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{on}">
            <v-avatar class="ma-1" cols="1" :id="avatar.id" v-on="on"></v-avatar>
          </template>
          <span>Du måste ha {{avatar.pointRequirement}} poäng för avataren {{avatar.displayName}}</span>
        </v-tooltip>
      </div>
    </v-row>
    <v-row class="justify-center">Välj färg</v-row>
    <v-row>
      <v-row class="justify-center">
        <v-col>
          <v-btn  class="ma-1 " rounded dark v-for="color in colors" :key="color.id"
            @click="toggleSelectedColor(color.id, color.color)"
            :class="color.color"> {{color.displayName}} </v-btn>
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
    selectedColorId: 1,
  }),
  created() {
    this.getAllAvatars();
  },
  computed: {
    ...mapGetters([
      'user',
      'token',
    ]),
  },
  mounted() {
    setTimeout(() => {
      this.avatars.forEach((avatar) => {
        let color = avatar.pointRequirement <= this.user.points ? this.user.avatarColor : 'grey';
        appendIcon(avatar.id, avatar.icon, color);
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
        let iconColor = avatar.pointRequirement <= this.user.points ? color : 'grey';
        removeElement(`icon-${avatar.id}`);
        appendIcon(avatar.id, avatar.icon, iconColor);
      });
    },
    updateAvatar() {
      Avatars.update({
        userId: this.user.id,
        avatarId: this.selectedAvatarId,
        colorId: this.selectedColorId
      }, this.token).then((result) => {
        this.$emit('updated', result.data);
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