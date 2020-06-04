<template>
  <center-container>
    <login-card />
  </center-container>
</template>

<script>
import CenterContainer from "@/components/containers/CenterContainer";
import LoginCard from "@/components/auth/cards/LoginCard";
export default {
  components: {
    LoginCard,
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
