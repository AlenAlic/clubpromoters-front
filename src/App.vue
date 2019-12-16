<template>
  <v-app>
    <Header v-if="$auth.isAuthenticated" @toggleDrawer="drawer = !drawer" />

    <v-navigation-drawer
      v-if="$auth.isAuthenticated && !$auth.isHostess"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :permanent="$vuetify.breakpoint.lgAndUp"
      app
    >
      <NavigationDrawerContent />
    </v-navigation-drawer>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>

    <v-footer v-if="$auth.isAuthenticated && $auth.isHostess && false" app grow min-height="64">
      <v-spacer></v-spacer>
      <router-link tag="span" :to="{ name: 'home' }">
        <v-btn text color="primary">
          {{ $t("navigation.back_to_home_page") }}
        </v-btn>
      </router-link>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationDrawerContent from "@/components/general/NavigationDrawerContent/NavigationDrawerContent";
import Header from "@/components/general/Header";
import loadStore from "@/store/loader";
export default {
  name: "App",
  components: { NavigationDrawerContent, Header },
  data: () => ({
    drawer: null
  }),
  mounted() {
    this.$nextTick(function() {
      this.$auth.renew().then(() => loadStore());
    });
  }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
