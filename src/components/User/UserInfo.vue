<template>
<v-container fill-height>
  <v-row class="justify-center">
    <v-col cols="12" sm="6" class="pt-0">
      <v-container>
        <v-row class="justify-center">
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
                  lästa sidor
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon class="pl-4">
                <v-icon color="indigo">mdi-pencil</v-icon>
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
              <v-list-item-icon class="pl-4">
                <v-icon color="red">mdi-seal</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-left">
                  <span class="font-weight-bold">
                    {{user.points}}
                  </span>
                  poäng
                  </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12" sm="6" class="pb-0 pt-0">
      <v-container class="pb-0">
        <v-row class="justify-center pb-0">
          <v-list color="rgb(255, 0, 0, 0)">
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
                  Klass {{user.classDisplayName}} 
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon class="pl-4" id="icon-button" @click="changeAvatarDialog = true">
              </v-list-item-icon>
              <v-list-item-content class="ma-0">
                <v-list-item-title class="text-left">
                  <v-btn text class="pa-0" @click="changeAvatarDialog = true">
                    Ändra avatar
                  </v-btn>
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
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <v-dialog v-model="changeAvatarDialog">
    <change-avatar
      @closeDialog="changeAvatarDialog = false"
      @updated="avatarUpdated">
    </change-avatar>
  </v-dialog>
</v-container>
</template>

<script>
import Urls from '@/assets/urls';
import ChangeAvatar from "@/components/User/ChangeAvatar";
import { appendIcon, removeElement } from '@/assets/functions';

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
    changeAvatarDialog: false,
  }),
  mounted() {
    appendIcon('icon-button', this.user.avatarIcon, this.user.avatarColor);
  },
  methods: {
    avatarUpdated(data) {
      this.changeAvatarDialog = false;
      removeElement(`icon-icon-button`);
      this.$store.commit('updateNavbarIcon', data);
      appendIcon('icon-button', data.avatarIcon, data.avatarColor);
      this.$store.commit('setNavbarIcon');
    },
  },
};
</script>