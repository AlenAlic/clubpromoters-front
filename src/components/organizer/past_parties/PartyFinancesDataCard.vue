<template>
  <v-card>
    <v-card-title class="headline">{{ party.name }}</v-card-title>

    <v-card-text class="has-line_breaks body" v-if="!!party">
      <div>
        <span>
          <b>{{ $t("organizer.party_finances_data.date") }}</b>
        </span>
        <span>
          {{ $util.dateTimeFromUTCString(party.start_date).toFormat("d LLLL") }}
          <br />
          {{ party.duration }}
        </span>
      </div>
      <div>
        <b>{{ $t("organizer.party_finances_data.tickets") }}</b>
      </div>
      <div>
        <span>
          <i>{{ $t("organizer.party_finances_data.price") }}</i>
        </span>
        <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
      </div>
      <div>
        <span>
          <i>{{ $t("organizer.party_finances_data.made_available") }}</i>
        </span>
        <span>{{ party.num_available_tickets }}</span>
      </div>
      <div>
        <span>
          <i>{{ $t("organizer.party_finances_data.sold") }}</i>
        </span>
        <span>{{ party.sold_tickets }}</span>
      </div>
      <div v-if="organiser">
        <span>
          <i>{{ $t("organizer.party_finances_data.on_hold") }}</i>
        </span>
        <span>{{ party.tickets_on_hold }}</span>
      </div>
      <div v-if="club_owner">
        <span>
          <i>{{ $t("organizer.party_finances_data.denied_entry") }}</i>
        </span>
        <span>{{ party.tickets_denied_entry }}</span>
      </div>
      <div v-if="organiser">
        <span>
          <i>{{ $t("organizer.party_finances_data.remaining") }}</i>
        </span>
        <span>{{ party.remaining_tickets }}</span>
      </div>
      <template v-if="organiser">
        <div>
          <span>
            <b>{{ $t("organizer.party_finances_data.income") }}</b>
          </span>
        </div>
        <div>
          <i>{{ $t("organizer.party_finances_data.ticket_sale") }}</i>
          <span>{{ $util.formatCurrency(party.income_tickets_sold) }}</span>
        </div>
        <div>
          <i>{{ $t("organizer.party_finances_data.administration_costs") }}</i>
          <span>{{ $util.formatCurrency(party.income_administration_costs) }}</span>
        </div>
        <div>
          <span>
            <b>{{ $t("organizer.party_finances_data.expenses") }}</b>
          </span>
        </div>
        <div>
          <span>
            <i>{{ $t("organizer.party_finances_data.refunds") }}</i>
          </span>
          <span>{{ $util.formatCurrency(party.expenses_refunds) }}</span>
        </div>
        <div>
          <span>
            <i>{{ $t("organizer.party_finances_data.promoter_commissions") }}</i>
          </span>
          <span>{{ $util.formatCurrency(party.expenses_promoter_commissions) }}</span>
        </div>
        <div>
          <span>
            <i>{{ $t("organizer.party_finances_data.club_owner_commissions") }}</i>
          </span>
          <span>{{ $util.formatCurrency(party.expenses_club_owner_commissions) }}</span>
        </div>
        <v-divider></v-divider>
        <div>
          <span>
            <b>{{ $t("organizer.party_finances_data.profit") }}</b>
          </span>
          <span>{{ $util.formatCurrency(party.total_profit, "€", false, true) }}</span>
        </div>
      </template>
      <template v-if="club_owner">
        <div>
          <span>
            <b>{{ $t("organizer.party_finances_data.commission") }}</b>
          </span>
        </div>
        <div>
          <span></span>
          <span>{{ $util.formatCurrency(party.income_club_owner_commissions) }}</span>
        </div>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" text @click="close">
        {{ $t("general.close") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    party: {},
    organiser: { type: Boolean, default: false },
    club_owner: { type: Boolean, default: false }
  },
  methods: {
    close: function() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/css/general/flex";
.body {
  div {
    @extend .flex;
    @extend .justify-content-between;
    span:last-child {
      text-align: right;
    }
  }
}
</style>
