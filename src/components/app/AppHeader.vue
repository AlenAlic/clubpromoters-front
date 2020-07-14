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

    <v-spacer />

    <template v-if="$auth.isAuthenticated">
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <span :class="`flag-icon flag-icon-${$i18n.locale} flag-icon-border`"></span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="c in languages"
            :key="c"
            @click="updateLanguage(c)"
            color="primary"
            :input-value="$i18n.locale === c"
          >
            <v-list-item-icon>
              <span :class="`flag-icon flag-icon-${c}`"></span>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t(`locale.${c}`) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu bottom left offset-y>
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
    </template>
  </v-app-bar>
</template>

<script>
import { LANGUAGES } from "@/constants";
import { UPDATE_LANGUAGE } from "@/store/modules/auth";

export default {
  props: {
    breakpoint: { type: Boolean, default: false }
  },
  computed: {
    languages() {
      return LANGUAGES;
    }
  },
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.push({
          name: "home"
        });
      });
    },
    updateLanguage(language) {
      this.$i18n.locale = language;
      this.$store
        .dispatch(UPDATE_LANGUAGE, {
          language: language
        })
        .then(
          function() {
            this.$i18n.locale = language;
          }.bind(this)
        );
    }
  }
};
</script>
