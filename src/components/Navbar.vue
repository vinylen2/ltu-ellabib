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
      <!-- <v-btn icon to="scanner">
        <v-icon>mdi-barcode-scan</v-icon>
      </v-btn> -->
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn to="/profile" text>
        <v-icon class="mr-3">mdi-account</v-icon>
        Min profil
      </v-btn>
      <!-- <v-btn icon to="scanner">
        <v-icon>mdi-barcode-scan</v-icon>
      </v-btn> -->
    </v-toolbar-items>

    <v-toolbar-items
      v-show="isAdmin">
      <v-btn to="/admin/post-book" text>Lägg till bok</v-btn>
      <v-btn to="/admin/activate-reviews" text>Recensioner</v-btn>
      <v-btn text
      @click="logout">
      Logga ut
    </v-btn>
  </v-toolbar-items>
</v-app-bar>
</template>

<script>
import Auth from '@/api/services/auth';
import Urls from '@/assets/urls';

export default {
  name: 'navbar',
  components: {
  },
  data() {
    return {
      imagesUrl: Urls.images,
    };
  },
  created() {
    this.ipAuth();
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
      Auth.logout();
      this.$router.push({ name: 'frontpage' });
      this.$store.commit('changeAdminState');
    },
    ipAuth() {
      Auth.ip()
        .then((result) => {
          if (result.ipAuth) {
            this.$store.commit('isAllowedIp');
          }
        });
    },
  },
};
</script>

<style scoped>
/* a:hover {
  color: black;
  font-weight: bold;
} */

@media print {
  .app-container {
    display: none;
  }
}
</style>
