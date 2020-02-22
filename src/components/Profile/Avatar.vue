<template> <div>
  <ImageSelector/>
  <v-card max-width="375" max-length="500" class="m" absolute>
    <v-img :src="$store.state.user.avatarImageUrl" height="300px" dark>
      <v-row class="fill-height">
        <v-card-title>
          <v-btn dark icon class="mr-6" absolute bottom right @click="info()">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
         
          <v-btn dark icon absolute bottom right>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>
      </v-row>
    </v-img>
    <v-list two-line>
      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-school</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Ellagårdsskolan</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-google-classroom</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Klass</v-list-item-title>
          <v-list-item-subtitle>{{$store.state.user.classDisplayName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-bookshelf</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Böcker lästa</v-list-item-title>
          <v-list-item-subtitle>{{$store.state.user.booksRead}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-book-open-page-variant</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Antal sidor lästa</v-list-item-title>
          <v-list-item-subtitle>{{$store.state.user.pagesRead}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-star-half</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Omdömen lämnade</v-list-item-title>
          <v-list-item-subtitle>{{$store.state.user.reviewsWritten}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</div>
</template>

<script>
/* eslint-disable no-console */
import ImageSelector from "@/components/Profile/ImageSelector";
export default {
  name: "avatar",
  components: { ImageSelector },

  data() {
    return {};
  },

  created() {
    console.log(this.$store.state);
  }
};
<script />;
