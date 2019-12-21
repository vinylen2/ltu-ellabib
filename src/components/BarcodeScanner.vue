<template>
<v-card>
  <v-card-title>Scanner</v-card-title>
  <v-card-text>
    <v-row justify="center">
      <video id="video"
        height="300px"
        width="300px">
      </video>
    </v-row>
  </v-card-text>
</v-card>
</template>

<script>
// import Quagga from 'quagga';
import { BrowserQRCodeReader } from '@zxing/library';
/* eslint-disable no-console */

export default {
  name: 'barcode-scanner',
  data: () => ({

  }),
  mounted() {
    const codeReader = new BrowserQRCodeReader();

// codeReader
//   .decodeFromInputVideoDevice(undefined, 'video')
//   .then(result => console.log(result.text))
//   .catch(err => console.error(err));
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        console.log(videoInputDevices);
        let firstDeviceId = videoInputDevices[0].deviceId;
        console.log(firstDeviceId);
        codeReader
          .decodeFromInputVideoDevice(firstDeviceId, 'video')
          .then(result => console.log(result.text))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

  },
  methods: {
  },
};

</script>