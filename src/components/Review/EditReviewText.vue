<template>
<v-card>
  <v-card-title>
  </v-card-title>
  <v-card-text>
    <v-textarea
      v-model="text"
      auto-grow
      filled
      :label="formattedType"
      >
    </v-textarea>
    <v-row justify="center">
      <v-btn color="red darken-1" text @click="$emit('closeTextDialog')">Stäng</v-btn>
      <v-btn color="blue darken-1" text @click="editText">Spara</v-btn>
    </v-row>
  </v-card-text>
</v-card>
</template>

<script>
import Reviews from '@/api/services/reviews';
import { mapGetters } from 'vuex';

export default {
  name: 'edit-review-text',
  props: [
    'reviewId',
    'type',
    'text',
  ],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    formattedType() {
      if (this.type === 'description') {
        return 'Beskrivning';
      }
      return 'Recension';
    },
    ...mapGetters([
      'token',
    ]),
  },
  methods: {
    editText() {
      this.loading = true;
      Reviews.updateText({
        reviewId: this.reviewId,
        type: this.type,
        text: this.text,
      }, this.token)
      .then(() => {
        this.$emit('closeTextDialog', {
          reviewId: this.reviewId,
          type: this.type,
          text: this.text,
        });
      });
    },
  },
};

</script>

<style scoped>
.wrapper {
  text-align: center;
}

.button {
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  border:none;
  text-align: center;
  cursor: pointer;
}

.publish-textarea {
  align-items: center;
  display: inline-block;
  width: 80%;
  height: 200px;
  resize: none;
  outline: none;
  font-size: 1em;
  border-color: #c2c7c9;
}

.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}
h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.menu {
  display: inline-block;
  margin: 0 auto;
  margin-top: 15px;
}

.sync-loader {
  margin-top: 15px;
}

</style>
