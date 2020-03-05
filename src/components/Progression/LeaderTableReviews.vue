<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-divider></v-divider>
    </v-row>
    <v-row class="justify-center">
      <v-col>
        <h1 class="justify-center">Placering</h1>
      </v-col>
      <v-col>
        <h2 class="justify-center">Klass</h2>
      </v-col>
      <v-col>
        <h2 class="justify-center">Recensioner inlästa</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>

    <v-row
      class="justify-center"
      v-for="(classData, index) in sortedClassesReviews"
      :key="classData.id"
    >
      <v-container class="pa-0" v-if="index < 5">
        <v-row class="pa-0">
          <v-col>
            <h2 class="justify-center">{{index +1}}.</h2>
          </v-col>
          <v-col>
            <h2
              v-if="classData.id == user.class.id"
              class="justify-center font-weight-black headline"
            >{{classData.displayName}}</h2>
            <h2 v-else class="justify-center">{{classData.displayName}}</h2>
          </v-col>

          <v-col>
            <h2 class="justify-center">{{classData.reviewsWritten}} Inspelningar</h2>
          </v-col>
          <v-col cols="12" class="pa-4">
            <v-progress-linear
              height="15"
              :color="colors[index]"
              :value="percentage(classData.reviewsWritten, sortedClassesReviews[0].reviewsWritten)"
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
            <h2 class="justify-center">{{index +1}}.</h2>
          </v-col>
          <v-col>
            <h2
              v-if="classData.id == user.class.id"
              class="justify-center font-weight-black headline"
            >{{classData.displayName}}</h2>
            <h2 v-else class="justify-center">{{classData.displayName}}</h2>
          </v-col>

          <v-col>
            <h2 class="justify-center">{{classData.reviewsWritten}}Inspelningar</h2>
          </v-col>
          <v-col cols="12">
            <v-progress-linear
              :color="colors[index]"
              :value="percentage(classData.reviewsWritten, sortedClassesReviews[0].reviewsWritten)"
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
  name: "leadertablereviews",
  data: () => ({
    colors: [
      'green',
      'blue',
      'red',
      'indigo',
      'purple',
    ],
  }),
  created() {},
  methods: {
    percentage(nominator, denominator) {
      return (nominator / denominator) * 100;
    }
  },
  computed: {
    ...mapGetters(["sortedClassesReviews", "user"])
  }
};
</script>