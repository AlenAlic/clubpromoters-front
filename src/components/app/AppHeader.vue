<template>
  <v-app-bar dark app :clipped-left="breakpoint" color="black">
    <v-app-bar-nav-icon
      v-if="!breakpoint && $auth.isAuthenticated && !$auth.isHostess"
      @click.stop="$emit('toggleDrawer')"
    ></v-app-bar-nav-icon>

    <v-btn v-if="$auth.isAuthenticated && $auth.isHostess" icon :to="{ name: 'home' }" exact>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-spacer v-if="$auth.isAuthenticated && $auth.isHostess"></v-spacer>

    <v-toolbar-title>{{ $t("app.title") }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu v-if="$auth.isAuthenticated" bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item :to="{ name: 'profile' }">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("general.profile") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'security' }">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("general.security") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("auth.sign_out") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    breakpoint: { type: Boolean, default: false }
  },
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.push({
          name: "home"
        });
      });
    }
  }
};
</script>