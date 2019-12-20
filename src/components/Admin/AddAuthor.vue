<template>
<v-card>
  <v-card-title>
    <span class="headlinge">
      Lägg till författare
    </span>
    </v-card-title>
  <v-card-text>
    <v-form v-model="valid">
      <v-container>
        <v-row>
            <v-col cols="12">
              <v-text-field label="Förnamn" 
                required 
                :rules="rules"
                v-model="firstname">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Efternamn" 
                required 
                :rules="rules"
                v-model="lastname">
              </v-text-field>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card-text>
  <v-card-actions>
    <v-row justify="center">
      <v-btn color="red darken-1" text @click="closeDialog">Stäng</v-btn>
      <v-btn color="blue darken-1" text @click="addAuthor">Spara</v-btn>
    </v-row>
  </v-card-actions>
</v-card>
</template>

<script>
import Authors from '@/api/services/authors';

export default {
  name: 'add-author',
  data: () => ({
    valid: false,
    rules: [
      v => !!v || 'Fältet måste fyllas i',
    ],
    firstname: '',
    lastname: '',
  }),
  computed: {
    author() {
      return {
        firstname: this.firstname,
        lastname: this.lastname,
      };
    },
  },
  methods: {
    /* eslint-disable no-console */
    closeDialog() {
      this.resetFields();
      this.$emit('closeDialog');
    },
    resetFields() {
      this.firstname = '';
      this.lastname = '';
    },
    addAuthor() {
      Authors.create(this.author).then((result) => {
        this.$emit('closeDialog', result.data);
        this.resetFields();
      });
    },
  },
};
</script>