<template>
  <v-card>
    <v-card-title class="text-center">Scanner inte implementerad ännu</v-card-title>
    <v-card-text>
      <!-- <v-row justify="center">
        <video id="video"
          height="300px"
          width="300px">
        </video>
      </v-row> -->
    </v-card-text>
  </v-card>
</template>

<script>
// import Quagga from 'quagga';
// import { BrowserQRCodeReader } from '@zxing/library';
/* eslint-disable no-console */

export default {
  name: 'barcode-scanner',
  data: () => ({
  }),
  //   mounted() {
  //   const codeReader = new BrowserQRCodeReader();
  //   codeReader
  //     .listVideoInputDevices()
  //     .then(() => {
  //       codeReader
  //         .decodeFromInputVideoDevice(undefined, 'video')
  //         .then((result) => { 
  //             this.$emit('barcodeScanned', result.text);
  //           })
  //         .catch(err => console.error(err));
  //     })
  //     .catch(err => console.error(err));
  // },
  methods: {
    codeScanned() {
      this.$emit('barcodeScanned', 9789188879028);
    },
  },
};

</script>