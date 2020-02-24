<template>
<div>
  <v-card max-width="375" max-length="500">
    <v-img :src="$store.state.user.avatarImageUrl" height="300px" dark>
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
import ImageSelector from "@/components/Profile/ImageSelector";
export default {
  name: "avatar",
  components: { ImageSelector }
};
</script>

<style>
</style>