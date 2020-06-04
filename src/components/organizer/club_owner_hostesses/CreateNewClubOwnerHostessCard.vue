<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createHostess">
      <v-card-title>{{ $t("organizer.club_owner_hostesses.new_hostess.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="first_name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.club_owner_hostesses.new_hostess.first_name.label')"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.club_owner_hostesses.new_hostess.last_name.label')"
          required
        ></v-text-field>
        <v-text-field v-model="email" :rules="[$form.fieldIsEmail]" :label="$t('auth.email')" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.club_owner_hostesses.new_hostess.submit") }}
        </v-btn>
        <v-btn @click="close" text>{{ $t("general.cancel") }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
import store from "@/store";
import { USERS } from "@/store/modules/organizer/users";
export default {
  props: {
    clubOwner: { type: Object, default: () => {} }
  },
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
    createHostess: function() {
      this.loading = true;
      Vue.axios
        .post("organizer/create_new_hostess", {
          user_id: this.clubOwner.id,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(() => {
          store.dispatch(USERS).then(() => {
            this.$emit("added");
          });
          this.close();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.$refs.form.reset();
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
