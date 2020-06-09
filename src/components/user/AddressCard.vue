<template>
  <v-form ref="address" v-model="valid" @submit.prevent="updateProfile">
    <v-card>
      <v-card-title>{{ $t("user.profile.address.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="street"
          :rules="[$form.fieldRequired]"
          :label="$t('user.profile.address.street.label')"
          required
        ></v-text-field>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="street_number"
              :rules="[$form.fieldRequired, $form.minNumber(1)]"
              type="number"
              :label="$t('user.profile.address.street_number.label')"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="street_number_addition"
              :label="$t('user.profile.address.street_number_addition.label')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="postal_code"
              :rules="[$form.fieldRequired, $form.minNumber(1000), $form.maxNumber(9999)]"
              type="number"
              :label="$t('user.profile.address.postal_code.label')"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="postal_code_letters"
              :rules="[$form.fieldRequired, $form.exactCharacterCount(2), $form.charactersAreLetters]"
              :label="$t('user.profile.address.postal_code_letters.label')"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          v-model="city"
          :rules="[$form.fieldRequired]"
          :label="$t('user.profile.address.city.label')"
          required
        ></v-text-field>
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
import { UPDATE_PROFILE_ADDRESS } from "../../store/modules/auth";
export default {
  data: function() {
    return {
      valid: false,
      street: this.$store.state.auth.profile.street,
      street_number: this.$store.state.auth.profile.street_number,
      street_number_addition: this.$store.state.auth.profile.street_number_addition,
      postal_code: this.$store.state.auth.profile.postal_code || "",
      postal_code_letters: this.$store.state.auth.profile.postal_code_letters,
      city: this.$store.state.auth.profile.city
    };
  },
  methods: {
    resetForm() {
      this.street = this.$store.state.auth.profile.street;
      this.street_number = this.$store.state.auth.profile.street_number;
      this.street_number_addition = this.$store.state.auth.profile.street_number_addition;
      this.postal_code = this.$store.state.auth.profile.postal_code || "";
      this.postal_code_letters = this.$store.state.auth.profile.postal_code_letters;
      this.city = this.$store.state.auth.profile.city;
      this.$refs.address.resetValidation();
    },
    updateProfile() {
      this.$store
        .dispatch(UPDATE_PROFILE_ADDRESS, {
          street: this.street,
          street_number: Number(this.street_number),
          street_number_addition: this.street_number_addition || "",
          postal_code: Number(this.postal_code),
          postal_code_letters: this.postal_code_letters,
          city: this.city
        })
        .then(() => {
          this.resetForm();
        });
    }
  }
};
</script>
