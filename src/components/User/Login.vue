<template>
<v-container>
  <v-row justify="center" v-if="loading">
    <v-col cols="12">
      <span class="title">Loggar in...</span>
    </v-col>
    <v-col>
      <v-progress-circular :size="100" color="#39B0BB" indeterminate>
        <v-img height="80" width="80" src="https://ellabib.se/images/skolon-logo.png"></v-img>
      </v-progress-circular>
    </v-col>
  </v-row>
  <v-row justify="center" v-else>
    <v-btn x-large text color="blue lighten-1" @click="loginSkolon">
      Logga in
      <v-img height="40" width="40" src="https://ellabib.se/images/skolon-logo.png"></v-img>
    </v-btn>
  </v-row>
</v-container>
</template>


<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
  /* eslint-disable no-console */
import Auth from '@/api/services/auth';

export default {
  name: 'login',
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loginFailed = false;
  },
  mounted() {
    if (this.$route.query.code) {
      this.auth();
    }
  },
  methods: {
    auth() {
      this.loading = true;
      Auth.loginSkolon(this.$route.query.code)
        .then((result) => {
          this.$store.commit('userLogin', result.data);
          this.$router.push('/');
        });
    },
    loginSkolon() {
      let clientId = 'XILAAsjrDRvAtzqrNyjAgVXKV8BkHHyr';
      let callbackUrl = 'https://ellabib.se/login';
      let scope = 'authenticatedUser.profile.read+authenticatedUser.profile.identifier+authenticatedUser.school.read+authenticatedUser.groups.read';
      window.location = `https://idp.skolon.com/oauth/auth?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&scope=${scope}`
    },
  },
};
</script>