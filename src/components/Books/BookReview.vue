<template>
<v-container>
  <v-row>
    <v-col cols="12" class="pa-0">
      <v-card class="text-left"
        flat color="rgb(255, 0, 0, 0)">
        <v-card-title>
          Publicerad den {{ formattedDate(review.createdAt) }}
          <v-spacer></v-spacer>
          <v-rating 
            v-model="review.rating"
            dense
            medium
            half-increments
          ></v-rating>
        </v-card-title>
        <v-card-text class="text-left"> 
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12" sm="2" la="1" class="pa-0">
                <audio-player class="text-center pa-0"
                  v-if="review.reviewAudioUrl"
                  :sources="formattedAudioUrl(review.reviewAudioUrl)"
                  :audioInfo="{
                    book: {
                      title: book.title,
                      id: book.id,
                    },
                    type: 'review',
                  }"/>
              </v-col>
              <v-col cols="12" sm="10" la="11">
                {{ review.review }} 
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>

</template>

<script>
import AudioPlayer from '@/components/Audio/AudioPlayer';

import moment from 'moment';
import 'moment/locale/sv';

export default {
  components: {
    AudioPlayer,
  },
  props: {
    review: Object,
    book: Object,
  },
  data: () => ({

  }),
  methods: {
    formattedDate(date) {
      return moment(date).format('Do MMMM YYYY');
    },
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
    },
  },
};
</script>