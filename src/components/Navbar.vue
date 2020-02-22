<template>
<v-app-bar
      color="green lighten-3"
      dark
      fixed
      app
    >
    <v-toolbar-items>
      <v-btn text
        to="/">
        <v-icon class="mr-3">mdi-home</v-icon>
        Hem
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/books" text>Böcker</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/about" text>Om</v-btn>
    </v-toolbar-items>
    <v-toolbar-items
      v-if="$store.getters.isAdmin">
      <v-btn to="/admin/post-book" text>Lägg till bok</v-btn>
      <v-btn to="/admin/activate-reviews" text>Recensioner</v-btn>
      <v-btn text
      @click="logout">
      Logga ut
     </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/profile" text
        v-if="$store.getters.isLoggedIn">
        <v-icon class="mr-3">mdi-account</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <skolon-button></skolon-button>
    </v-toolbar-items>
</v-app-bar>
</template>

<script>
import SkolonButton from '@/components/Skolon/SkolonButton';
import Urls from '@/assets/urls';

export default {
  name: 'navbar',
  components: {
    SkolonButton,
  },
  data() {
    return {
      imagesUrl: Urls.images,
    };
  },
  created() {
    this.$store.commit('isMobile');
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    isDeviceWithWebRTC() {
      return this.$store.getters.isDeviceWithWebRTC;
    },
  },
  methods: {
    logout() {
      this.$store.commit('userLogout');
      this.$router.push({ name: 'frontpage' });
    },
  },
};
</script>