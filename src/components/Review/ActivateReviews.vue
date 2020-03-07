<template>
<v-container fluid>
  <v-container v-if="reviews.length == 0">
    <h1>Inga recensioner att aktivera</h1>
  </v-container>
  <v-container fluid class="pt-0" v-else>
    <v-row>
      <v-col>
        <h1>Aktivera recensioner</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table
        disable-sort
        fixed-header
        hide-default-footer
        :headers="headers"
        :items="reviews">
        <template v-slot:header.selection="{item}">
            <v-checkbox @change="selectAll"></v-checkbox>
        </template>
        <template v-slot:item.class="{item}">
          {{item.writtenBy}}
        </template>
        <template v-slot:item.createdAt="{item}">
          {{formatDate(item.createdAt)}}
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
            <v-row class="justify-left">
              <v-col cols="2" class="justify-center"> 
              <audio-player v-if="item.descriptionAudioUrl"
                :sources="formattedAudioUrl(item.descriptionAudioUrl)"
                :small="true"
                :audioInfo="{
                  book: {
                    title: item.title,
                    id: item.id,
                  },
                  type: 'description',
                }"/>
                <v-container v-else>
                  <v-row class="justify-center">
                    <v-col>
                      <v-icon>mdi-microphone-off</v-icon>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:item.review="{item}">
          <v-container>
            <v-row>
              <v-col cols="2" v-if="item.reviewAudioUrl"> 
              <audio-player
                :sources="formattedAudioUrl(item.reviewAudioUrl)"
                :small="true"
                :audioInfo="{
                  book: {
                    title: item.title,
                    id: item.id,
                  },
                  type: 'review',
                }"/>
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
          <v-btn icon @click="deleteReviewClick(item.id)">
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
    <v-dialog v-model="confirmDialog"
      max-width="400px">
      <confirm-dialog
        :message="'Vill du verkligen radera?'"
        @confirmed="confirmDialogHandeler"></confirm-dialog>
    </v-dialog>
  </v-container>
</v-container>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Reviews from '@/api/services/reviews';
import Urls from '@/assets/urls';
import AudioPlayer from '@/components/Audio/AudioPlayer';
import EditReviewAudio from '@/components/Review/EditReviewAudio';
import EditReviewText from '@/components/Review/EditReviewText';
import ConfirmDialog from '@/components/ConfirmDialog';
import _ from 'lodash';
import moment from 'moment';

import { mapGetters } from 'vuex';

export default {
  components: {
    AudioPlayer,
    EditReviewAudio,
    EditReviewText,
    ConfirmDialog,
  },
  data() {
    return {
      show: false,
      selectedReviews: [],
      editReviewTextDialog: false,
      editAudioDialog: false,
      confirmDialog: false,
      dialogIdentifier: null,
      reviews: [],
      headers: [
        {text: '', value: 'selection'},
        {text: 'Klass', value: 'class'},
        {text: 'Titel', value: 'title', width: '10%'},
        {text: 'Beskrivning', value: 'description', width: '10%'},
        {text: 'Recension', value: 'review', width: '40%'},
        {text: 'Betyg', value: 'rating'},
        {text: 'Tid och datum', value: 'createdAt'},
        {text: '', value: 'tools'},
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
  computed: {
    ...mapGetters([
      'token',
    ]),
  },
  created() {
    this.$nextTick(() => {
      this.getReviews();
    });
  },
/* eslint-disable no-console */
  methods: {
    formatDate(date) {
      return moment(date).format('hh:mm - D/M');
    },
    formatText(text) {
      return text.slice(0, 50) + " ...";
    },
    formattedAudioUrl(endingOfUrl) {
      return [this.audioUrl + endingOfUrl];
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
      Reviews.getInactive(this.token).then((result) => {
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
        this.selectedReviews = [];
      });
    },
    updateReviewRating(rating, id) {
      Reviews.updateRating({ reviewId: id, rating }).then(() => {
      });
    },
    confirmDialogHandeler(confirmed) {
      if (confirmed) {
        Reviews.deleteReview({ reviewId: this.dialogIdentifier }).then(() => {
          this.popReview(this.dialogIdentifier);
        });
      }
      this.confirmDialog = false;
    },
    deleteReviewClick(reviewId) {
      this.dialogIdentifier = reviewId;
      this.confirmDialog = true;
    },
  },
};
</script>
