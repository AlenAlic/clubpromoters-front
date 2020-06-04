<template>
  <center-container>
    <login />
  </center-container>
</template>

<script>
import CenterContainer from "@/components/containers/CenterContainer";
import Login from "@/components/auth/Login";
export default {
  components: {
    Login,
    CenterContainer
  },
  created() {
    if (this.$auth.currentUser !== null) {
      let redirect = this.$route.query.redirect;
      if (redirect) {
        this.$router.replace(redirect);
      } else {
        this.$router.replace({
          name: "home"
        });
      }
    }
  }
};
</script>
