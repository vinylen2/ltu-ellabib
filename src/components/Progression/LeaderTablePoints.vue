<template>
<v-container fluid class="pt-0">
  <v-row>
    <v-divider></v-divider>
  </v-row>
  <v-row class="justify-center">
    <v-col>
      <h1 v-if="!isMobile" class="justify-center title">Placering</h1>
      <h3 v-else class="justify-center body-1">Placering</h3>
    </v-col>
    <v-col>
      <h2 v-if="!isMobile" class="justify-center title">Klass</h2>
      <h3 v-else class="justify-center body-1">Klass</h3>
    </v-col>
    <v-col>
      <h2 v-if="!isMobile" class="justify-center title">Poäng</h2>
      <h3 v-else class="justify-center body-1">Poäng</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-divider></v-divider>
  </v-row>

  <v-row
    class="justify-center"
    v-for="(classData, index) in sortedClassesPages"
    :key="classData.id"
  >
    <v-container class="pa-0" v-if="index < 5">
      <v-row class="pa-0">
        <v-col>
          <h2>
            <v-btn class="ml-n8 pb-1" icon small id="user-icon-pages" ripple="false"
              :to="{name: 'profile'}"
              v-if="classData.id == user.class.id">
            </v-btn>
            {{index +1}}.
          </h2>
        </v-col>
        <v-col>
          <h2 class="justify-center">{{classData.displayName}}</h2>
        </v-col>
        <v-col>
          <h2 class="justify-center">{{classData.points}} poäng</h2>
        </v-col>
        <v-col cols="12" class="pa-4">
          <v-progress-linear
            height="15"
            :color="colors[index]"
            :value="percentage(classData.pagesRead, sortedClassesPages[0].points)"
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
          <h2>
            <v-btn class="ml-n8 pb-1" icon small id="user-icon-pages"
              :to="{name: 'profile'}"
              v-if="classData.id == user.class.id">
            </v-btn>
            {{index +1}}.
          </h2>
        </v-col>
        <v-col>
          <h2 class="justify-center">{{classData.displayName}}</h2>
        </v-col>
        <v-col>
          <h2 class="justify-center">{{classData.points}} poäng</h2>
        </v-col>
        <v-col cols="12">
          <v-progress-linear
            height="15"
            :color="colors[index]"
            :value="percentage(classData.pagesRead, sortedClassesPages[0].points)"
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
import { appendIcon } from '@/assets/functions';

export default {
  name: "leadertablepages",
  data: () => ({
    colors: ["green", "blue", "red", "indigo", "purple", "orange"],
  }),
  created() {
    setTimeout(() => {
      appendIcon('user-icon-pages', this.user.avatarIcon, this.user.avatarColor);
    }, 500);
  },
  methods: {
    percentage(nominator, denominator) {
      return (nominator / denominator) * 100;
    }
  },
  computed: {
    ...mapGetters(["sortedClassesPages", "user", "isMobile"]),
  },
};
</script>

