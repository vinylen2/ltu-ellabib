<template>
<v-container>
  <v-row class="justify-center">
    <v-col cols="12" md="6">
      <v-list color="rgb(255, 0, 0, 0)">
        <v-list-item>
          <v-list-item-icon class="pl-4" @click="changeAvatarDialog = true">
            <v-btn icon>
              <v-icon color="a">mdi-account</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content class="ma-0">
            <v-list-item-title class="text-left">
              Avatar
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="pl-4">
            <v-icon color="indigo">mdi-school</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="ma-0">
            <v-list-item-title class="text-left">
              Ellagårdsskolan
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="pl-4">
            <v-icon color="indigo">mdi-google-classroom</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">
              Klass {{user.class.displayName}} 
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-col>
    <v-col cols="12" md="6">
      <v-list color="rgb(255, 0, 0, 0)">
        <v-list-item>
          <v-list-item-icon class="pl-4">
            <v-icon color="indigo">mdi-bookshelf</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">
              <span class="font-weight-bold">
                {{user.booksRead}} 
              </span>
              lästa böcker
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="pl-4">
            <v-icon color="indigo">mdi-book-open-page-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">
              <span class="font-weight-bold">
              {{user.pagesRead}}
              </span>
              sidor lästa
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="pl-4">
            <v-icon color="indigo">mdi-microphone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">
              <span class="font-weight-bold">
                {{user.reviewsWritten}}
              </span>
              recensioner
              </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4 mt-0">
            <v-btn icon
              :to="{ name: 'books', params: 
                { 
                  genre: { 
                    id: favouriteGenre.genreId,
                    slug: favouriteGenre.slug,
                  } 
                }
              }"
              width="auto" height="auto" class="ml-3 pt-3"
              >
              <v-avatar size="40">
                <img class="genre-icon"
                  :src="`${imagesUrl}${favouriteGenre.slug}.png`">
              </v-avatar>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-left">
              Gillar: {{favouriteGenre.name}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
  <v-dialog v-model="changeAvatarDialog"
    @closeDialog="changeAvatarDialog = false"
    @updated="avatarUpdated">
    <change-avatar></change-avatar>
  </v-dialog>
</v-container>
</template>

<script>
import Urls from '@/assets/urls';
import ChangeAvatar from "@/components/User/ChangeAvatar";

import { mapGetters } from 'vuex';

export default {
  name: 'user-info',
  components: {
    ChangeAvatar,
  },
  props: {
    favouriteGenre: Object,
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  data: () => ({
    imagesUrl: Urls.images,
    avatar: 'bell',
    changeAvatarDialog: false,
  }),
  methods: {
    avatarUpdated() {
      console.log('changeAvatar');
    },
  },
};
</script>