<template>
<div>
  <v-card max-width="375" max-length="500">
    <v-img :src="user.avatarImageUrl" height="300px" dark>
      <v-row class="fill-height">
        <v-card-title>
          <v-btn color="transparent" dark icon absolute bottom right>
            <ImageSelector />
          </v-btn>
        </v-card-title>
      </v-row>
    </v-img>
  </v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageSelector from "@/components/Profile/ImageSelector";

export default {
  name: "avatar",
  components: { ImageSelector },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
};
</script>

<style>
</style>