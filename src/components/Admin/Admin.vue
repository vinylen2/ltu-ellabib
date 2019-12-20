<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Authors from '@/api/services/authors';

export default {
  name: 'admin',
  metaInfo: {
    title: 'Adminpanelen',
  },
  created() {
    this.getAuthors();
  },
  methods: {
    getAuthors() {
      Authors.getAll()
        .then((result) => {
          this.$store.commit('authors', result.data);
        });
    },
  },
};
</script>

<style scoped>

</style>
