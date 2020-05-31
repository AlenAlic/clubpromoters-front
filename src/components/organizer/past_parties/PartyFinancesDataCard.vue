<template>
  <v-card>
    <v-card-title class="headline">{{ party.name }}</v-card-title>

    <v-card-text class="has-line_breaks body" v-if="!!party">
      <div>
        <span><b>Date:</b></span>
        <span>
          {{ $util.dateTime(party.start_date).toFormat("d LLLL") }}
          <br />
          {{ party.duration }}
        </span>
      </div>
      <div><b>Tickets:</b></div>
      <div>
        <span><i>Price:</i></span>
        <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
      </div>
      <div>
        <span><i>Made available:</i></span>
        <span>{{ party.num_available_tickets }}</span>
      </div>
      <div>
        <span><i>Sold:</i></span>
        <span>{{ party.sold_tickets }}</span>
      </div>
      <div v-if="organiser">
        <span><i>On hold:</i></span>
        <span>{{ party.tickets_on_hold }}</span>
      </div>
      <div v-if="club_owner">
        <span><i>Denied entry:</i></span>
        <span>{{ party.tickets_denied_entry }}</span>
      </div>
      <div v-if="organiser">
        <span><i>Left over:</i></span>
        <span>{{ party.remaining_tickets }}</span>
      </div>
      <template v-if="organiser">
        <div>
          <span><b>Income:</b></span>
        </div>
        <div>
          <i>Ticket sale</i>
          <span>{{ $util.formatCurrency(party.party_income) }}</span>
        </div>
        <div>
          <span><b>Expenses:</b></span>
        </div>
        <div>
          <span><i>Refunds:</i></span>
          <span>{{ $util.formatCurrency(party.party_refunds) }}</span>
        </div>
        <div>
          <span><i>Promoters commission:</i></span>
          <span>{{ $util.formatCurrency(party.party_promoter_cut) }}</span>
        </div>
        <div>
          <span><i>Club Owners commission:</i></span>
          <span>{{ $util.formatCurrency(party.party_club_owner_cut) }}</span>
        </div>
        <v-divider></v-divider>
        <div>
          <span><b>Profit:</b></span>
          <span>{{ $util.formatCurrency(party.party_profit, "€", false, true) }}</span>
        </div>
      </template>
      <template v-if="club_owner">
        <div>
          <span><b>Commission:</b></span>
        </div>
        <div>
          <span></span>
          <span>{{ $util.formatCurrency(party.party_club_owner_cut) }}</span>
        </div>
      </template>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="close">
        Close
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
