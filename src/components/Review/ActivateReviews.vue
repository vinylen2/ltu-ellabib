<template>
<v-container>
  <v-container v-if="reviews.length == 0">
    <h1>Inga recensioner att aktivera</h1>

  </v-container>
  <v-container class="pt-0" v-else>
    <v-row>
      <v-col>
        <h1>Aktivera recensioner</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
      :hide-default-footer="true"
        :headers="headers"
        :items="reviews">
        <template v-slot:header.selection="{item}">
            <v-checkbox @change="selectAll"></v-checkbox>
        </template>
        <template v-slot:item.rating="{item}">
          {{item.rating}}/5
        </template>
        <template v-slot:item.selection="{item}">
          <v-checkbox v-model="selectedReviews" :value="item.id"></v-checkbox>
        </template>
        <template v-slot:item.title="{item}">
          <router-link class="link" :to="{ name: 'bok', params: { slug: item.slug }}">{{item.title}}</router-link>
        </template>
        <template v-slot:item.description="{item}">
          <v-container>
            <v-row>
              <v-col cols="2"> 
                <admin-audio-player :type="'description'"
                  :rowData="item"
                ></admin-audio-player>
              </v-col>
              <v-col>
                <span @click="editReviewText('description', item.description, item.id)">
                  {{item.description}}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:item.review="{item}">
          <v-container>
            <v-row>
              <v-col cols="2"> 
                <admin-audio-player :type="'review'"
                  :rowData="item"
                ></admin-audio-player>
              </v-col>
              <v-col>
                <span @click="editReviewText('review', item.review, item.id)">
                  {{item.review}}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:item.tools="{item}">
          <v-btn icon
            v-if="item.reviewAudioUrl || item.descriptionAudioUrl"
            @click="editAudio(item)">
            <v-icon>mdi-content-cut</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn @click="activateReviews">
          Publicera ({{selectedReviews.length}})
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="editReviewTextDialog" max-width="400">
      <edit-review-text
        @closeTextDialog="closeTextDialog"
        :text="modal.text"
        :type="modal.type"
        :reviewId="modal.reviewId">
      </edit-review-text>
    </v-dialog>
    <v-dialog v-model="editAudioDialog">
      <edit-review-audio
        @closeDialog="closeAudioDialog"
        :review="modal.review">
      </edit-review-audio>
    </v-dialog>
  </v-container>
</v-container>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Vue from 'vue';
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AdminAudioPlayer from '@/components/Audio/AdminAudioPlayer';
import EditReviewAudio from '@/components/Review/EditReviewAudio';
import EditReviewText from '@/components/Review/EditReviewText';
import _ from 'lodash';
import VModal from 'vue-js-modal';

Vue.use(VModal);

export default {
  components: {
    'admin-audio-player': AdminAudioPlayer,
    EditReviewAudio,
    EditReviewText,
  },
  data() {
    return {
      show: false,
      selectedReviews: [],
      editReviewTextDialog: false,
      editAudioDialog: false,
      reviews: [],
      headers: [
        {text: '', value: 'selection'},
        {text: 'ID', value: 'id'},
        {text: 'Titel', value: 'title', width: '10%'},
        {text: 'Beskrivning', value: 'description', width: '30%'},
        {text: 'Recension', value: 'review', width: '30%'},
        {text: 'Betyg', value: 'rating'},
        {text: 'Datum', value: 'date'},
        {text: 'Verktyg', value: 'tools'},
      ],
      modal: {
        review: '',
        text: '',
        reviewId: '',
        type: '',
        action: '',
        value: '',
      },
      imagesUrl: Urls.images,
      audioUrl: Urls.audio,
    };
  },
  created() {
    this.$nextTick(() => {
      this.getReviews();
    });
  },
/* eslint-disable no-console */
  methods: {
    formatText(text) {
      return text.slice(0, 50) + " ...";
    },
    selectAll(value) {
      if (value) {
        this.reviews.forEach((review) => {
          this.selectedReviews.push(review.id);
        });
      } else {
        this.selectedReviews = [];
      }
    },
    setRating(rating, id) {
      this.updateReviewRating(rating, id);
    },
    closeAudioDialog() {
      // if (data) {

      // }
      this.editAudioDialog = false;
    },
    closeTextDialog(data) {
      if (data) {
        const index = _.findIndex(this.reviews, { id: data.reviewId });
        const arrayData = this.reviews[index];
        if (data.type === 'review') {
          arrayData.review = data.text;
        } else {
          arrayData.description = data.text;
        }
      }
      this.editReviewTextDialog = false;
    },
    editReviewText(type, text, id) {
      this.modal.type = type;
      this.modal.text = text;
      this.modal.reviewId = id;
      this.editReviewTextDialog = true;
    },
    editAudio(review) {
      this.modal.review = review;
      this.editAudioDialog = true;
    },
    getReviews() {
      Reviews.getInactive().then((result) => {
        this.reviews = result.data;
      });
    },
    popReview(reviewId) {
      const index = _.findIndex(this.reviews, { id: reviewId });
      this.reviews.splice(index, 1);
    },
    activateReviews() {
      Reviews.bulkActivate(this.selectedReviews).then(() => {
        this.getReviews();
      });
    },
    updateReviewRating(rating, id) {
      Reviews.updateRating({ reviewId: id, rating }).then(() => {
      });
    },
    deleteReview(reviewId) {
      Reviews.deleteReview({ reviewId }).then(() => {
        this.popReview(reviewId);
      });
    },
  },
};
</script>

<style>
.text-tooltip .tooltip-inner{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #addb91;
  padding: 10px 15px;
  width: 300px;
  border-radius: 20px;
}


</style>
