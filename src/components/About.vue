<template>
  <div class="container">
    <h1>Ellabib</h1>
    <div class="text">
      <v-btn @click="login"></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  metaInfo: {
    title: 'Om sidan',
  },
  methods: {
    login() {
      this.$store.commit('userLogin', {id: 1});
    },
  },
};
</script>

<style scoped>
p {
  text-align: left;
  margin: 20px;
}

h1 {
  margin-top: 20px;
  font-weight: 700;
  font-size: 2em;
}

h2 {
  font-weight: 700;
  font-size: 1.5em;
}
</style>
