<template>
<v-container>
  <v-form v-model="valid" @submit.prevent="login">
    <v-row justify="center">
      <h1>Logga in</h1>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-text-field label="Användarnamn" 
          required 
          :rules="rules"
          v-model="username">
        </v-text-field>
        </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-text-field label="Password" 
          required 
          :rules="rules"
          :type="'password'"
          v-model="password">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn type="submit" color="blue lighten-1">Logga in</v-btn>
    </v-row>
  </v-form>
</v-container>
</template>


<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Auth from '@/api/services/auth';

export default {
  name: 'login',
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  data() {
    return {
      valid: false,
      rules: [
        v => !!v || 'Fältet måste fyllas i',
      ],
      username: '',
      password: '',
      loginFailed: false,
    };
  },
  created() {
    this.loginFailed = false;
  },
  methods: {
    login() {
      Auth.login({ username: this.username, password: this.password })
        .then((result) => {
          if (result.auth) {
            this.changeAdminState();
          } else {
            this.loginFailed = true;
          }
        });
    },
    changeAdminState() {
      this.$store.commit('changeAdminState');
      this.$router.push({ name: 'activate-reviews' });
    },
  },
};
</script>

<style scoped>
.has-error {
  border: 2px solid #ff585d;
}

.button {
  border: none;
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #71c5e8;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

input:focus {
  outline: none;
}

.modal-menu {
  margin-top: 20px;
  width: 100%;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-left-modal {
  width: 35%;
  margin-bottom: 5px;
  font-weight: bold;
  text-align:left;
}

.flex-right {
  width: 48%;
  margin-bottom: 5px;
  text-align: left;
}

.error {
  text-align: center;
  color: #ff585d;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

input {
  width: 80%;
}

.flex-box {
  width: 100%;
}

@media (min-width: 600px) {
  .flex-box {
    width: 70%;
    margin-left: 15%;
  }
}
@media (min-width: 980px) {
  .flex-box {
    width: 50%;
    margin-left: 25%;
  }
}

</style>
