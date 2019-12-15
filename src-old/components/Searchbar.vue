<template>
<v-container grid-list-md text-xs-left class="white--text">
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        light
        clearable
        @cleared="console.log('cleard')"
        hide-details
        v-model="searchString"
        placeholder="Sök efter böcker"
        style="max-width: 500px; min-width: 128px border-radius: 25%">
      </v-text-field>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'searchbar',
}
</script>

<style scoped>
</style>
