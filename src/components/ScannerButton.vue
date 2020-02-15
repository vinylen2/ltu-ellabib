<template>
<v-container>
  <v-btn v-if="$store.state.userAgent.isMobile" 
    @click="dialog = true"
    color="blue lighten-3"
    fab 
    bottom fixed center
    >
    <v-icon>mdi-barcode-scan</v-icon>
  </v-btn>
  <v-dialog v-model="dialog"
  max-width="500px">
    <barcode-scanner @barcodeScanned="barcodeScanned"></barcode-scanner>
  </v-dialog>
</v-container>
</template>

<script>
import BarcodeScanner from '@/components/BarcodeScanner';

export default {
  name: 'scanner-button',
  components: {
    BarcodeScanner,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    barcodeScanned(data) {
      this.$emit('barcodeScanned', data);
    },
  },
};
</script>