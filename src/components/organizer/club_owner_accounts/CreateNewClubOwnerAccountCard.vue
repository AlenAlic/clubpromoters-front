<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createClubOwner">
      <v-card-title>{{ $t("organizer.create_new_account.club_owner.title") }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="club"
          :rules="clubRules"
          :label="$t('organizer.create_new_account.club_owner.club.label')"
          required
          persistent-hint
          :hint="$t('organizer.create_new_account.club_owner.club.hint')"
        ></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" :label="$t('auth.email')" required></v-text-field>
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
      clubRules: [this.$form.fieldRequired],
      email: "",
      emailRules: [this.$form.fieldIsEmail],
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
          commission: this.commission
        })
        .then(() => {
          store.dispatch(USERS);
          this.close();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    close() {
      this.$refs.form.resetValidation();
      this.club = "";
      this.email = "";
      this.commission = `${this.$store.state.config.settings.default_club_owner_commission}`;
      this.$emit("close");
    }
  }
};
</script>

<style scoped></style>
