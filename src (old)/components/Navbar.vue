<template>
  <div>
    <v-app-bar
      color="green lighten-1"
      dark
    >
      <v-btn to="/" icon>
          <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>Ellabib</v-toolbar-title>
      <v-appbar-items>
        <v-btn text to="/books">Böcker</v-btn>

      </v-appbar-items>

      <v-spacer></v-spacer>
      <v-btn to="/profile" icon>
          <v-icon>mdi-account</v-icon>
      </v-btn>


    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
}
</script>

<style scoped>
</style>