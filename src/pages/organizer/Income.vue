<template>
  <div>
    <v-row class="no-print">
      <v-col>
        <v-card>
          <v-card-title>Choose month</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select v-model="month" hide-details :items="months" label="Month"></v-select>
              </v-col>
              <v-col cols="5">
                <v-select v-model="year" :items="years" label="Year"></v-select>
              </v-col>
              <v-col cols="1" align-self="center" class="text-right">
                <v-btn icon @click="getData"><v-icon>mdi-magnify</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="card--print">
          <v-card-title>{{ getMonth }} {{ displayYear }}</v-card-title>
          <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
          <v-list-item class="print_friendly" two-line v-for="party in parties" :key="party.id">
            <v-list-item-content>
              <v-list-item-title>{{ party.title }}</v-list-item-title>
              <v-list-item-subtitle class="body">
                <div class="two">
                  <span>Ticket price</span>
                  <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
                </div>
                <div class="two">
                  <span>Sold</span>
                  <span>{{ party.sold_tickets }} / {{ party.num_available_tickets }}</span>
                </div>
                <div><b>Income</b></div>
                <div class="three">
                  <span></span>
                  <span>{{ $util.formatCurrency(party.party_income) }}</span>
                </div>
                <div><b>Expenses</b></div>
                <div class="three">
                  <i>Refunds</i>
                  <span>{{ $util.formatCurrency(party.party_refunds) }}</span>
                </div>
                <div class="three">
                  <i>Promoter commissions</i>
                  <span>{{ $util.formatCurrency(party.party_promoter_cut) }}</span>
                </div>
                <div class="three">
                  <i>Club Owner commissions</i>
                  <span>{{ $util.formatCurrency(party.party_club_owner_cut) }}</span>
                </div>
                <v-divider class="my-1"></v-divider>
                <div class="three">
                  <b>Subtotal</b>
                  <span>{{ $util.formatCurrency(party.party_profit) }}</span>
                </div>
                <div>
                  <span></span>
                  <b>Total</b>
                  <span>{{ $util.formatCurrency(party.party_profit) }}</span>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="body">
                <div>
                  <span>Total</span>
                  <span>{{ $util.formatCurrency(totalProfit) }}</span>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
import { MONTHS } from "@/constants";
export default {
  data: function() {
    return {
      month: String(this.$util.now.month),
      year: this.$util.now.year,
      displayMonth: String(this.$util.now.month),
      displayYear: this.$util.now.year,
      parties: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  computed: {
    totalProfit() {
      return this.parties.reduce((t, c) => {
        return t + c.party_profit;
      }, 0);
    },
    months() {
      return Object.keys(MONTHS).map(m => ({ text: MONTHS[m], value: m }));
    },
    getMonth() {
      return MONTHS[this.displayMonth];
    },
    years() {
      return Array.from({ length: 2019 - this.year + 1 }, (v, k) => k + 2019);
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.parties = [];
      Vue.axios
        .get(`organizer/party_income/${this.year}/${this.month}`)
        .then(response => {
          this.parties = response.data;
          this.displayYear = this.year;
          this.displayMonth = this.month;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/general/flex";
.body {
  div {
    @extend .flex;
    @extend .justify-content-between;
    @extend .align-items-end;
  }

  .two {
    width: 50%;
  }
  .three {
    width: 75%;
  }
}
</style>
