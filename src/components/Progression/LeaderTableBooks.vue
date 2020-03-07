<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-divider></v-divider>
    </v-row>
    <v-row class="justify-center title">
      <v-col>
        <h1 v-if="!isMobile" class="justify-center title">Placering</h1>
        <h3 v-else class="justify-center body-1">
         Placering
        </h3>
      </v-col>
      <v-col>
        <h2 v-if="!isMobile" class="justify-center title">Klass</h2>
         <h3 v-else class="justify-center body-1">
         Klass
        </h3>
      </v-col>
      <v-col>
        <h2 v-if="!isMobile" class="justify-center title">Böcker lästa</h2>
        <h3 v-else class="justify-center body-1">
         Böcker lästa
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row
      class="justify-center"
      v-for="(classData, index) in sortedClassesBooks"
      :key="classData.id"
    >
      <v-container fluid class="pa-0" v-if="index < 5">
        <v-row class="pa-0">
          <v-col>
            <h2
              v-if="classData.id == user.class.id"
              class="justify-center font-weight-black headline"
            >{{index +1}}.</h2>
            <h2 v-else class="justify-center">{{index +1}}.</h2>
          </v-col>
          <v-col>
            <h2
              v-if="classData.id == user.class.id"
              class="justify-center font-weight-black headline"
            >{{classData.displayName}}</h2>
            <h2 v-else class="justify-center">{{classData.displayName}}</h2>
          </v-col>

          <v-col>
            <h2
              v-if="classData.id == user.class.id"
              class="justify-center font-weight-black headline"
            >{{classData.booksRead}} böcker</h2>
            <h2 v-else class="justify-center">{{classData.booksRead}} böcker</h2>
          </v-col>
          <v-col cols="12" class="pa-4">
            <v-progress-linear
              height="15"
              :color="colors[index]"
              :value="percentage(classData.booksRead, sortedClassesBooks[0].booksRead)"
            ></v-progress-linear>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="pa-0" v-else-if="index > 4 && classData.id == user.class.id">
        <v-row class="pa-0">
          <v-col>
            <h2 class="justify-center font-weight-black headline">{{index +1}}.</h2>
          </v-col>
          <v-col>
            <h2 class="justify-center font-weight-black headline">{{classData.displayName}}</h2>
          </v-col>

          <v-col>
            <h2
              class="justify-center font-weight-black headline"
            >{{classData.booksRead}} böcker lästa</h2>
          </v-col>
          <v-col cols="12">
            <v-progress-linear
              height="15"
              :color="colors[index]"
              :value="percentage(classData.booksRead, sortedClassesBooks[0].booksRead)"
            ></v-progress-linear>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "leadertablebooks",
  data: () => ({
    colors: ["green", "blue", "red", "indigo", "purple", "orange"]
  }),
  created() {},
  methods: {
    percentage(nominator, denominator) {
      return (nominator / denominator) * 100;
    }
  },
  computed: {
    ...mapGetters(["sortedClassesBooks", "user", "isMobile"])
  }
};
</script>