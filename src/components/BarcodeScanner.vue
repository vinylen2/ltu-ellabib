<template>
<v-container>
  <v-dialog v-model="dialog"
    max-width="500px">
    <v-card>
      <v-card-title class="text-center">Scanna en streckkod</v-card-title>
      <v-card-text>
        <v-row justify="center">
          <video id="video"
            height="300px"
            width="300px">
          </video>
        </v-row>
        {{ text }}
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-btn v-if="$store.state.userAgent.isMobile" 
    @click="dialog = true"
    color="blue lighten-3"
    fab 
    bottom center fixed
    direction="bottom">
    <v-icon>mdi-barcode-scan</v-icon>
  </v-btn>
</v-container>
</template>

<script>
// import Quagga from 'quagga';
import { BrowserQRCodeReader } from '@zxing/library';
/* eslint-disable no-console */

export default {
  name: 'barcode-scanner',
  data: () => ({
    dialog: false,
  }),
  mounted() {
    const codeReader = new BrowserQRCodeReader();
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        let firstDeviceId = videoInputDevices[0].deviceId;
        codeReader
          .decodeFromInputVideoDevice(firstDeviceId, 'video')
          .then((result) => { 
            console.log(result);
            this.$emit('scanned', result);
            })
          .then(result => this.text = result)
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

  },
  methods: {
  },
};

</script>