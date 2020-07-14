<template>
  <v-form ref="form" v-model="valid" @submit.prevent="updateProfile">
    <v-card>
      <v-card-title>{{ $t("user.profile.invoice_language.title") }}</v-card-title>
      <v-card-text>
        <v-select
          v-model="invoice_language"
          :items="languages"
          persistent-hint
          :hint="$t('user.profile.invoice_language.hint')"
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
import { UPDATE_INVOICE_LANGUAGE } from "../../store/modules/auth";
import { INVOICE_LANGUAGES } from "@/constants";
import i18n from "@/languages";

export default {
  data: function() {
    return {
      valid: false,
      invoice_language: this.$store.getters.invoice_language
    };
  },
  computed: {
    languages() {
      return INVOICE_LANGUAGES.map(l => ({ text: i18n.t(`invoices.language.${l}`), value: l }));
    }
  },
  methods: {
    resetForm() {
      this.invoice_language = this.$store.getters.invoice_language;
      this.$refs.form.resetValidation();
    },
    updateProfile() {
      this.$store.dispatch(UPDATE_INVOICE_LANGUAGE, {
        invoice_language: this.invoice_language
      });
    }
  }
};
</script>
