<template>
<v-card>
  <v-card-title>
    <span class="heading">
      Logga in
    </span>
  </v-card-title>
  <v-card-text>
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="login"
    >
      <v-text-field
        v-model="username"
        :rules="rules"
        prepend-icon="mdi-account"
        label="Användarnamn"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="rules"
        prepend-icon="mdi-lock"
        type='password'
        label="Lösenord"
        required
      ></v-text-field>

      <v-btn
        submit
        color="blue lighten-2"
        class="mr-4"
        type="submit"
      >
      Logga in
      </v-btn>
    </v-form>
  </v-card-text>
</v-card>
</template>

<script>
  /* eslint-disable no-console */
import Auth from '@/api/services/auth';

export default {
  name: 'admin-login',
  data: () => ({
    username: '',
    password: '',
    rules: [
      v => !!v || 'Fältet måste fyllas i',
    ],
  }),
  methods: {
    login() {
      Auth.loginAdmin({ username: this.username, password: this.password })
        .then((result) => {
          this.$store.commit('adminLogin', result.data);
          this.$router.push('/admin/activate-reviews');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
