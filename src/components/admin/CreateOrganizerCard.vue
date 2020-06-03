<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createOrganizer">
      <v-card-title>{{ $t("admin.create_organizer.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t('auth.email')"
          required
          persistent-hint
          :hint="$t('admin.create_organizer.hint')"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("admin.create_organizer.create_account") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
export default {
  data: function() {
    return {
      loading: false,
      valid: false,
      email: "",
      emailRules: [v => this.$util.isEmail(v) || this.$t("auth.errors.valid_email")]
    };
  },
  methods: {
    createOrganizer: function() {
      this.loading = true;
      Vue.axios.post("admin/create_organizer_account", { email: this.email }).then(() => {
        this.$emit("createdOrganizerAccount");
      });
    }
  }
};
</script>

<style scoped></style>
