<template>
  <v-card>
    <v-form ref="form" v-model="valid" @submit.prevent="refund">
      <v-card-title class="headline">
        {{ $t("organizer.refunds.give_refund.title", { id: purchase.id }) }}
      </v-card-title>
      <v-card-text>
        <div class="subtitle-2 mt-2">{{ $t("organizer.refunds.give_refund.refundable_tickets") }}</div>
        <template v-if="refundableTickets.length">
          <v-checkbox
            readonly
            :label="$t('general.select_all')"
            :value="allSelected"
            @click.stop="selectAllToggle"
            dense
            hide-details
          />
          <v-checkbox
            v-for="t in refundableTickets"
            :key="t.id"
            v-model="refundTickets"
            :label="$t('organizer.refunds.give_refund.ticket_num', { num: t.number })"
            :value="t.id"
            dense
            hide-details
            multiple
          />
        </template>
        <div v-else class="body-2 mb-2">{{ $t("organizer.refunds.give_refund.no_refundable_tickets") }}</div>
        <div class="subtitle-2 mt-2">{{ $t("organizer.refunds.give_refund.non_refundable_tickets") }}</div>
        <template v-if="nonRefundableTickets.length">
          <v-checkbox
            v-for="t in nonRefundableTickets"
            :key="t.id"
            readonly
            :label="$t('organizer.refunds.give_refund.ticket_num', { num: t.number })"
            dense
            hide-details
            indeterminate
          />
        </template>
        <div v-else class="body-2 mb-2">{{ $t("organizer.refunds.give_refund.no_non_refundable_tickets") }}</div>
        <div class="subtitle-2 mt-2">{{ $t("organizer.refunds.give_refund.refunded_tickets") }}</div>
        <template v-if="refundedTickets.length">
          <v-checkbox
            v-for="t in refundedTickets"
            :key="t.id"
            readonly
            :label="$t('organizer.refunds.give_refund.ticket_num', { num: t.number })"
            dense
            hide-details
            indeterminate
          />
        </template>
        <div v-else class="body-2 mb-2">{{ $t("organizer.refunds.give_refund.no_refunded_tickets") }}</div>
        <v-text-field
          :value="refundAmount"
          readonly
          type="number"
          :label="$t('organizer.refunds.give_refund.amount.label')"
          persistent-hint
          :hint="$t('organizer.refunds.give_refund.amount.hint')"
          prefix="€"
        >
        </v-text-field>
        <v-checkbox
          v-model="giveRefund"
          :rules="[$form.fieldRequired]"
          color="primary"
          :label="$t('organizer.refunds.give_refund.checkbox')"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="!isValid || loading" :loading="loading" color="primary" text type="submit">
          {{ $t("organizer.refunds.give_refund.submit") }}
        </v-btn>
        <v-btn text @click="close">
          {{ $t("general.cancel") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: { purchase: {} },
  data: function() {
    return {
      valid: false,
      loading: false,
      refundTickets: [],
      giveRefund: false
    };
  },
  computed: {
    isValid() {
      return this.valid && this.refundAmount > 0;
    },
    refundableTickets() {
      return this.purchase.tickets.filter(t => !t.refunded && !t.used);
    },
    nonRefundableTickets() {
      return this.purchase.tickets.filter(t => t.used);
    },
    refundedTickets() {
      return this.purchase.tickets.filter(t => t.refunded);
    },
    allSelected() {
      return this.refundTickets.length === this.refundableTickets.length;
    },
    refundAmount() {
      return this.refundTickets.length * this.purchase.ticket_price;
    }
  },
  methods: {
    selectAllToggle() {
      if (this.allSelected) {
        this.refundTickets = [];
      } else {
        this.refundTickets = this.refundableTickets.map(t => t.id);
      }
    },
    close: function() {
      this.$emit("closeModal");
      this.$refs.form.resetValidation();
      this.tickets = 0;
      this.amount = null;
      this.giveRefund = false;
    },
    refund() {
      this.loading = true;
      this.axios
        .post("organizer/refund", {
          purchase_id: this.purchase.id,
          amount: this.refundAmount,
          tickets: this.refundTickets
        })
        .then(response => {
          this.$emit("updated", response.data);
          this.close();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    tickets: function() {
      this.amount = this.tickets * this.purchase.ticket_price;
    }
  }
};
</script>

<style scoped lang="scss">
.v-input--selection-controls {
  margin-top: 4px !important;
}
</style>
