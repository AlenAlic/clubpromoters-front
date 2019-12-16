<template>
  <v-app-bar dark app :clipped-left="$vuetify.breakpoint.mdAndUp" color="primary">
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mdAndDown && $auth.isAuthenticated && !$auth.isHostess"
      @click.stop="$emit('toggleDrawer')"
    ></v-app-bar-nav-icon>

    <router-link v-if="$auth.isAuthenticated && $auth.isHostess" tag="span" :to="{ name: 'home' }">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>

    <v-spacer v-if="$auth.isAuthenticated && $auth.isHostess"></v-spacer>

    <v-toolbar-title>Title</v-toolbar-title>

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
            <v-list-item-title>{{ $t("menu.profile") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("auth.log_out") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
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
