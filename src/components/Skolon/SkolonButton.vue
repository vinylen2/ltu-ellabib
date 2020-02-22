<template>
<div class="skolon-menu-button"></div>
</template>

<script>
  /* eslint-disable no-console */

export default {
  name: 'skolon-button',
  watch: {
    skolon() {
      this.skolonButton();
    },
  },
  computed: {
    skolon() {
      return this.$store.state.skolon;
    },
  },
  methods: {
    skolonButton() {
      let skolonBtScript = document.createElement('script');
      skolonBtScript.setAttribute('src', 'https://api.skolon.com/v1/plugins/menu/button.js?renderOnLoad');
      document.head.appendChild(skolonBtScript);
      window.SkolonMenuButton.render();
    },
  },
};
</script>