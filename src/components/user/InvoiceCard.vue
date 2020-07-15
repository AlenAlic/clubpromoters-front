<template>
  <v-form ref="invoice_data" v-model="valid" @submit.prevent="updateProfile">
    <v-card>
      <v-card-title>{{ $t("user.profile.invoice_data.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="legal_name"
          :rules="[$form.fieldRequired]"
          :label="$t('user.profile.invoice_data.legal_name.label')"
          required
          :hint="$t('user.profile.invoice_data.legal_name.hint')"
          persistent-hint
        ></v-text-field>
        <v-text-field
          v-model="iban"
          :rules="[$form.fieldRequired]"
          :label="$t('user.profile.invoice_data.iban.label')"
          required
        ></v-text-field>
        <template v-if="$store.getters.business_entity">
          <v-text-field
            v-model="kvk_number"
            :rules="[$form.fieldRequired]"
            :label="$t('user.profile.invoice_data.kvk_number.label')"
            required
          ></v-text-field>
          <v-text-field
            v-model="vat_number"
            :rules="[$form.fieldRequired]"
            :label="$t('user.profile.invoice_data.vat_number.label')"
            required
          ></v-text-field>
        </template>
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
import { UPDATE_INVOICE_DATA } from "../../store/modules/auth";
export default {
  data: function() {
    return {
      valid: false,
      legal_name: this.$store.state.auth.profile.invoice_legal_name,
      iban: this.$store.state.auth.profile.iban,
      kvk_number: this.$store.state.auth.profile.invoice_kvk_number,
      vat_number: this.$store.state.auth.profile.invoice_vat_number
    };
  },
  methods: {
    resetForm() {
      this.legal_name = this.$store.state.auth.profile.invoice_legal_name;
      this.iban = this.$store.state.auth.profile.iban;
      this.kvk_number = this.$store.state.auth.profile.invoice_kvk_number;
      this.vat_number = this.$store.state.auth.profile.invoice_vat_number;
      this.$refs.invoice_data.resetValidation();
    },
    updateProfile() {
      this.$store
        .dispatch(UPDATE_INVOICE_DATA, {
          legal_name: this.legal_name,
          iban: this.iban,
          kvk_number: this.kvk_number,
          vat_number: this.vat_number
        })
        .then(() => {
          this.resetForm();
        });
    }
  }
};
</script>
