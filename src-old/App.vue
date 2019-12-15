<template>
  <v-app id="app">
    <navbar></navbar>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
}

</script>

<style>
</style>
