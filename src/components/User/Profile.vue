<template>
<v-container>
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
    getUser() {
      User.getUser(this.$store.state.user.id)
        .then((result) => {
          this.$store.commit('userData', result.data[0]);
        });
    },
  },
};
</script>