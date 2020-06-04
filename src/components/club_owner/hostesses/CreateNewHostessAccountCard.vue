<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createClubOwner">
      <v-card-title>{{ $t("club_owner.create_new_account.hostess.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="first_name"
          :rules="[$form.fieldRequired]"
          :label="$t('club_owner.create_new_account.hostess.first_name.label')"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          :rules="[$form.fieldRequired]"
          :label="$t('club_owner.create_new_account.hostess.last_name.label')"
          required
        ></v-text-field>
        <v-text-field v-model="email" :rules="[$form.fieldIsEmail]" :label="$t('auth.email')" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("club_owner.create_new_account.hostess.submit") }}
        </v-btn>
        <v-btn @click="close" text>{{ $t("general.cancel") }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import { HOSTESSES } from "@/store/modules/club_owner/hostesses";
export default {
  data: function() {
    return {
      loading: false,
      valid: false,
      first_name: "",
      last_name: "",
      email: ""
    };
  },
  methods: {
    createClubOwner: function() {
      this.loading = true;
      Vue.axios
        .post("club_owner/create_new_hostess", {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(() => {
          store.dispatch(HOSTESSES);
          this.$refs.form.reset();
          this.close();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
