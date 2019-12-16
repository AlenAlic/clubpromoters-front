<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="refund">
      <v-card-title class="headline">
        {{ $t("organizer.refunds.title", { id: purchase.id }) }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="amount"
          type="number"
          :rules="amountRules"
          :label="$t('organizer.refunds.amount.label')"
          persistent-hint
          :hint="$t('organizer.refunds.amount.hint')"
          required
        >
        </v-text-field>
        <v-checkbox
          v-model="giveRefund"
          :rules="giveRefundRules"
          color="primary"
          :label="$t('organizer.refunds.checkbox')"
        >
        </v-checkbox>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.refunds.submit") }}
        </v-btn>
        <v-btn text @click="close">
          {{ $t("general.cancel") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
// TODO => Change to select a number of tickets to be refunded
import Vue from "vue";
export default {
  props: { purchase: {} },
  data: function() {
    return {
      valid: false,
      loading: false,
      amount: null,
      amountRules: [v => !!v || this.$t("form_validation.errors.required")],
      giveRefund: false,
      giveRefundRules: [v => !!v || this.$t("form_validation.errors.required")]
    };
  },
  methods: {
    close: function() {
      this.$emit("closeModal");
      this.$refs.form.reset();
    },
    refund() {
      this.loading = true;
      Vue.axios
        .post("organizer/refund", { purchase_id: this.purchase.id, amount: this.amount })
        .then(response => {
          this.$emit("updated", response.data);
          this.close();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
