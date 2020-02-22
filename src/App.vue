<template>
<v-app id="app">
  <navbar></navbar>
  <v-content>
  <v-progress-linear class="ma-0" :color="'green lighten-2'"
    :indeterminate="true"
    v-if="$store.state.isLoading">
  </v-progress-linear>
  <router-view></router-view>
  <v-snackbar
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    v-model="snackbar.status">
    <div v-if="!snackbar.hasLink">
      {{snackbar.value}}
    </div>
    <div v-else>
      <a target="_blank"
        class="white--text"
        :href="snackbar.linkUrl">{{snackbar.value}}
      </a>
    </div>
    <v-btn text @click.native="$store.commit('hideSnackbar')">Stäng</v-btn>
  </v-snackbar>
  </v-content>
</v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import { mapGetters } from 'vuex';
// hello
export default {
  name: 'app',
  components: {
    'navbar': Navbar,
  },
  computed: {
    ...mapGetters([
      'snackbar'
    ]),
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

</style>
