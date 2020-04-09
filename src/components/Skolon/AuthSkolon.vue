<template>
<div></div>
</template>

<script>
export default {
  name: 'auth-skolon',
  created() {
    this.loginSkolon();
  },
  methods: {
    loginSkolon() {
      let clientId = 'XILAAsjrDRvAtzqrNyjAgVXKV8BkHHyr';
      let callbackUrl = 'https://ellabib.se/login';
      let scope = 'authenticatedUser.profile.read+authenticatedUser.profile.identifier+authenticatedUser.school.read+authenticatedUser.groups.read';
      window.location = `https://idp.skolon.com/oauth/auth?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&scope=${scope}`
    },
  },
};
</script>
