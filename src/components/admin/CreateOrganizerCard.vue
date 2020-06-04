<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createOrganizer">
      <v-card-title>{{ $t("admin.create_organizer.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="first_name"
          :rules="[$form.fieldRequired]"
          :label="$t('admin.create_organizer.first_name.label')"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          :rules="[$form.fieldRequired]"
          :label="$t('admin.create_organizer.last_name.label')"
          required
        ></v-text-field>
        <v-text-field v-model="email" :rules="[$form.fieldIsEmail]" :label="$t('auth.email')" required></v-text-field>
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
import { ADMIN_USERS } from "@/store/modules/admin";
export default {
  data: function() {
    return {
      loading: false,
      valid: false,
      email: "",
      first_name: "",
      last_name: ""
    };
  },
  methods: {
    createOrganizer: function() {
      this.loading = true;
      this.axios
        .post("admin/create_organizer_account", {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(() => {
          this.$refs.form.reset();
          this.$store.dispatch(ADMIN_USERS).then(() => {});
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
