<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="createPromoter">
      <v-card-title>{{ $t("organizer.create_new_account.promoter.title") }}</v-card-title>
      <v-card-text>
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
          :label="$t('organizer.create_new_account.promoter.commission.label')"
          required
          persistent-hint
          :hint="$t('organizer.create_new_account.promoter.commission.hint')"
          suffix="%"
        ></v-text-field>
        <v-select
          v-model="code"
          :label="$t('organizer.create_new_account.promoter.code.label')"
          :items="codes"
          item-text="code"
          item-value="id"
          persistent-hint
          :hint="$t('organizer.create_new_account.promoter.code.hint')"
          :no-data-text="$t('organizer.create_new_account.promoter.code.no_codes')"
          :loading="$store.state.codes.loadingActiveCodes"
          :disabled="$store.state.codes.loadingActiveCodes"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.create_new_account.promoter.submit") }}
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
      first_name: "",
      last_name: "",
      email: "",
      commission: `${this.$store.state.config.settings.default_promoter_commission}`,
      commissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      code: null
    };
  },
  computed: {
    codes() {
      return this.$store.state.codes.activeCodes.filter(c => !c.promoter);
    }
  },
  methods: {
    createPromoter() {
      this.loading = true;
      Vue.axios
        .post("organizer/create_new_promoter", {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          commission: Number(this.commission),
          code_id: this.code
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
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.commission = `${this.$store.state.config.settings.default_promoter_commission}`;
      this.code = null;
      this.$refs.form.resetValidation();
      this.$emit("close");
    }
  }
};
</script>
