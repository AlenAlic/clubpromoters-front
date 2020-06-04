<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="updateConfig">
      <v-card-title>
        {{ $t("organizer.dashboard.config.title") }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="club_owner_commission"
          :rules="clubOwnerCommissionRules"
          :label="$t('organizer.dashboard.config.club_owner_commission.label')"
          :hint="$t('organizer.dashboard.config.club_owner_commission.hint')"
          persistent-hint
          type="number"
          suffix="%"
          required
        ></v-text-field>
        <v-text-field
          v-model="promoter_commission"
          :rules="promoterCommissionRules"
          :label="$t('organizer.dashboard.config.promoter_commission.label')"
          :hint="$t('organizer.dashboard.config.promoter_commission.hint')"
          persistent-hint
          type="number"
          suffix="%"
          required
        ></v-text-field>
        <v-text-field
          v-model="mollie_api_key"
          :rules="[$form.fieldRequired]"
          :label="$t('organizer.dashboard.config.mollie_api_key.label')"
          :hint="$t('organizer.dashboard.config.mollie_api_key.hint')"
          persistent-hint
        ></v-text-field>
        <v-text-field
          v-model="minimum_promoter_commission"
          :label="$t('organizer.dashboard.config.minimum_promoter_commission.label')"
          :hint="$t('organizer.dashboard.config.minimum_promoter_commission.hint')"
          persistent-hint
          type="number"
          prefix="€"
          required
        ></v-text-field>
        <v-text-field
          v-model="administration_costs"
          :label="$t('organizer.dashboard.config.administration_costs.label')"
          :hint="$t('organizer.dashboard.config.administration_costs.hint')"
          persistent-hint
          type="number"
          prefix="€"
          required
        ></v-text-field>
        <v-text-field
          v-model="test_email"
          :label="$t('organizer.dashboard.config.test_email.label')"
          :hint="$t('organizer.dashboard.config.test_email.hint')"
          persistent-hint
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid || $store.state.config.loading"
          :loading="$store.state.config.loading"
          color="primary"
          text
          type="submit"
        >
          {{ $t("organizer.dashboard.config.submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import store from "@/store";
import { UPDATE_CONFIG } from "@/store/modules/organizer/config";

export default {
  data: function() {
    return {
      valid: false,
      club_owner_commission: this.$store.state.config.settings.default_club_owner_commission,
      clubOwnerCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      promoter_commission: this.$store.state.config.settings.default_promoter_commission,
      promoterCommissionRules: [this.$form.fieldRequired, this.$form.commissionPositive, this.$form.commissionMax],
      mollie_api_key: this.$store.state.config.settings.mollie_api_key,
      minimum_promoter_commission: this.$store.state.config.settings.minimum_promoter_commission,
      administration_costs: this.$store.state.config.settings.administration_costs,
      test_email: this.$store.state.config.settings.test_email
    };
  },
  methods: {
    updateConfig() {
      store.dispatch(UPDATE_CONFIG, {
        default_club_owner_commission: this.club_owner_commission,
        default_promoter_commission: this.promoter_commission,
        mollie_api_key: this.mollie_api_key,
        test_email: this.test_email,
        minimum_promoter_commission: this.minimum_promoter_commission,
        administration_costs: this.administration_costs
      });
    }
  }
};
</script>
