<template>
  <v-form ref="form" v-model="valid" @submit.prevent="updateProfile">
    <v-card>
      <v-card-title>{{ $t("general.profile") }}</v-card-title>
      <v-card-text>
        <v-text-field
          id="user-profile-first_name"
          v-model="firstName"
          :label="$t('user.profile.first_name')"
          :rules="[$form.fieldRequired]"
        />
        <v-text-field
          id="user-profile-last_name"
          v-model="lastName"
          :label="$t('user.profile.last_name')"
          :rules="[$form.fieldRequired]"
        />
        <v-text-field v-model="phone_number" :label="$t('user.profile.phone_number.label')" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="user-profile-accept"
          :disabled="!valid"
          :loading="$store.state.auth.loadingProfile"
          color="primary"
          text
          type="submit"
        >
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
import { UPDATE_PROFILE } from "../../store/modules/auth";
export default {
  data: function() {
    return {
      valid: false,
      firstName: this.$store.state.auth.profile.first_name,
      lastName: this.$store.state.auth.profile.last_name,
      phone_number: this.$store.state.auth.profile.phone_number
    };
  },
  methods: {
    resetForm() {
      this.firstName = this.$store.state.auth.profile.first_name;
      this.lastName = this.$store.state.auth.profile.last_name;
      this.phone_number = this.$store.state.auth.profile.phone_number;
      this.$refs.form.resetValidation();
    },
    updateProfile() {
      this.$store
        .dispatch(UPDATE_PROFILE, {
          first_name: this.firstName,
          last_name: this.lastName,
          phone_number: this.phone_number
        })
        .then(() => {
          this.resetForm();
        });
    }
  }
};
</script>
