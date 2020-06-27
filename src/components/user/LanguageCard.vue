<template>
  <v-form ref="form" v-model="valid" @submit.prevent="updateProfile">
    <v-card>
      <v-card-title>{{ $t("general.language") }}</v-card-title>
      <v-card-text>
        <v-select
          v-model="language"
          :items="languages"
          persistent-hint
          :label="$t('user.profile.language.label')"
          :hint="$t('user.profile.language.hint')"
          :disabled="$store.state.users.loading"
          :loading="$store.state.users.loading"
          :rules="[$form.fieldRequired]"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!valid" :loading="$store.state.auth.loadingProfile" color="primary" text type="submit">
          {{ $t("general.save_changes") }}
        </v-btn>
        <v-btn id="user-profile-cancel" text @click="resetForm()">
          {{ $t("general.cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { UPDATE_LANGUAGE } from "../../store/modules/auth";
import { LANGUAGES } from "@/constants";
import i18n from "@/languages";

export default {
  data: function() {
    return {
      valid: false,
      language: this.$store.getters.language
    };
  },
  computed: {
    languages() {
      return LANGUAGES.map(l => ({ text: i18n.t(`locale.${l}`), value: l }));
    }
  },
  methods: {
    resetForm() {
      this.language = this.$store.getters.language;
      this.$refs.form.resetValidation();
    },
    updateProfile() {
      this.$store
        .dispatch(UPDATE_LANGUAGE, {
          language: this.language
        })
        .then(
          function() {
            this.$i18n.locale = this.language;
          }.bind(this)
        );
    }
  }
};
</script>
