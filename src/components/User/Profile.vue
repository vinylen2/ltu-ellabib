<template>
<v-container>
  <h1>PROFIL</h1>
  <v-btn @click="logOut">Logga ut</v-btn>

</v-container>
</template>

<script>
/* eslint-disable no-console */
import User from '@/api/services/user.js';

export default {
  name: 'profile',
  created() {
    this.getUser();
  },
  methods: {
    logOut() {
      this.$store.commit('userLogout');
    },
    getUser() {
      User.getUser(this.$store.state.user.id)
        .then((result) => {
          this.$store.commit('userLogin', result.data);
          // console.log(result);
        });
    },
  },
};
</script>