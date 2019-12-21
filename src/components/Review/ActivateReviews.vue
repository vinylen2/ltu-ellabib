<template>
<v-container class="pt-0">
  <v-row>
    <v-col>
      <h1>Aktivera recensioner</h1>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="">
              <v-checkbox @change="selectAll"></v-checkbox>
            </th>
            <th class="">ID</th>
            <th class="text-left">Titel</th>
            <th class="text-left">Betyg</th>
            <th class="text-left">Beskrivning</th>
            <th class="text-left">Ljudfil</th>
            <th class="text-left">Recension</th>
            <th class="text-left">Ljudfil</th>
            <th class="text-left">Datum</th>
            <th class="text-left">Klockslag</th>
            <th class="text-left">Verktyg</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews" :key="review.id">
            <td>
              <v-checkbox v-model="selectedReviews" :value="review.id"></v-checkbox>
            </td>
            <td>{{review.id}}</td>
            <td>
              <router-link class="link" :to="{ name: 'bok', params: { slug: review.slug }}">{{review.title}}</router-link>
            </td>
            <td>
              {{review.rating}}
            </td>
            <td @click="editReviewText('description', review.description, review.id)">
              {{review.description}}
            </td>
            <td>
              <admin-audio-player
                v-if="review.descriptionAudioUrl"
                :type="'description'"
                :rowData="review">
              </admin-audio-player>
            </td>
            <td @click="editReviewText('review', review.review, review.id)">
              {{review.review}}
            </td>
            <td>
              <admin-audio-player
                v-if="review.reviewAudioUrl"
                :type="'review'"
                :rowData="review">
              </admin-audio-player>
            </td>
            <td>{{review.date}}</td>
            <td>{{review.time}}</td>
            <td>
              <v-btn icon
                v-if="review.reviewAudioUrl || review.descriptionAudioUrl"
                @click="editAudio(review)">
                <v-icon>mdi-content-cut</v-icon>
              </v-btn>
              <v-btn icon
                @click="showAlertModal(`Radera recension för ${review.title}`,(review.id))">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      selectedReviews: [],
      editReviewTextDialog: false,
      editAudioDialog: false,
      reviews: [],
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
