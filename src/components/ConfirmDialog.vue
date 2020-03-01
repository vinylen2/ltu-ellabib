<template>
<v-card>
  <v-card-title>{{message}}</v-card-title>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="red darken-1" text @click="reject">Nej</v-btn>
    <v-btn color="blue darken-1" text @click="confirm">Ja</v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: 'confirm-dialog',
  props: {
    message: String,
  },
  methods: {
    confirm() {
      this.$emit('confirmed', true);
    },
    reject() {
      this.$emit('confirmed', false);
    },
  },
};
</script>