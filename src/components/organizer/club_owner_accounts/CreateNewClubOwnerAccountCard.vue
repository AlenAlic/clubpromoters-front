<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createClubOwner">
      <v-card-title>{{ $t("organizer.create_new_account.club_owner.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="club"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.create_new_account.club_owner.club.label')"
          required
          persistent-hint
          :hint="$t('organizer.create_new_account.club_owner.club.hint')"
        ></v-text-field>
        <v-text-field
          v-model="first_name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.create_new_account.first_name.label')"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.create_new_account.last_name.label')"
          required
        ></v-text-field>
        <v-text-field v-model="email" :rules="[$form.fieldIsEmail]" :label="$t('auth.email')" required></v-text-field>
        <v-text-field
          v-model="commission"
          :rules="commissionRules"
          type="number"
          :label="$t('organizer.create_new_account.club_owner.commission.label')"
          required
          persistent-hint
          :hint="$t('organizer.create_new_account.club_owner.commission.hint')"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.create_new_account.club_owner.submit") }}
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
  data: function() {
    return {
      loading: false,
      valid: false,
      club: "",
      first_name: "",
      last_name: "",
      email: "",
      commission: `${this.$store.state.config.settings.default_club_owner_commission}`,
      commissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax]
    };
  },
  methods: {
    createClubOwner: function() {
      this.loading = true;
      Vue.axios
        .post("organizer/create_new_club_owner", {
          club: this.club,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          commission: Number(this.commission)
        })
        .then(() => {
          store.dispatch(USERS).then(() => {
            this.close();
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.club = "";
      this.email = "";
      this.first_name = "";
      this.last_name = "";
      this.commission = `${this.$store.state.config.settings.default_club_owner_commission}`;
      this.$refs.form.resetValidation();
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
