<template>
  <v-app>
    <app-header v-if="$auth.isAuthenticated" :breakpoint="breakpoint" @toggleDrawer="drawer = !drawer" />
    <app-navigation-drawer v-if="$auth.isAuthenticated && !$auth.isHostess" :breakpoint="breakpoint" v-model="drawer" />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigationDrawer from "@/components/app/AppNavigationDrawer";
import AppHeader from "@/components/app/AppHeader";
import loadStore from "@/store/loader";
export default {
  components: {
    AppNavigationDrawer,
    AppHeader
  },
  data() {
    return {
      drawer: false
    };
  },
  created() {
    this.$nextTick(function() {
      this.$auth.renew().then(
        function() {
          loadStore();
          this.$i18n.locale = this.$store.getters.language;
        }.bind(this)
      );
    }, this);
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
