<template>
  <center-container>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </center-container>
</template>

<script>
import CenterContainer from "../containers/CenterContainer";
export default {
  components: {
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
