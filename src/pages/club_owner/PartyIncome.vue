<template>
  <div>
    <v-row class="no-print">
      <v-col cols="12" lg="4" offset-lg="4">
        <v-card>
          <v-card-title>{{ $t("general.choose_month") }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select v-model="month" hide-details :items="months" :label="$t('general.month')" @change="getData" />
              </v-col>
              <v-col cols="4">
                <v-select v-model="year" :items="years" :label="$t('general.year')" @change="getData" />
              </v-col>
              <v-col cols="2" align-self="center" class="text-right">
                <v-btn icon @click="getData"><v-icon>mdi-magnify</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" offset-lg="4">
        <v-card class="card--print">
          <v-card-title>{{ getMonth }} {{ displayYear }}</v-card-title>
          <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
          <template v-if="parties.length">
            <v-list-item class="print_friendly" two-line v-for="party in parties" :key="party.id">
              <v-list-item-content>
                <v-list-item-title>{{ party.name }}</v-list-item-title>
                <v-list-item-subtitle class="body">
                  <div class="two">
                    <span>{{ $t("club_owner.commissions.ticket_price") }}</span>
                    <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
                  </div>
                  <div class="two">
                    <span>{{ $t("club_owner.commissions.tickets_sold") }}</span>
                    <span>{{ party.num_sold_tickets }} / {{ party.num_available_tickets }}</span>
                  </div>
                  <div class="two">
                    <span>{{ $t("club_owner.commissions.tickets_refunded") }}</span>
                    <span>{{ party.num_tickets_refunded }}</span>
                  </div>
                  <div>
                    <b>{{ $t("club_owner.commissions.commission") }}</b>
                  </div>
                  <div>
                    <i></i>
                    <span>{{ $util.formatCurrency(party.commission) }}</span>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="body">
                  <div>
                    <span>{{ $t("club_owner.commissions.total") }}</span>
                    <span>{{ $util.formatCurrency(totalProfit) }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item v-else-if="!loading && !parties.length">
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t("club_owner.commissions.no_parties") }}</v-list-item-subtitle>
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
        return t + c.commission;
      }, 0);
    },
    months() {
      return Object.keys(MONTHS).map(m => ({ text: MONTHS[m], value: m }));
    },
    getMonth() {
      return MONTHS[this.displayMonth];
    },
    years() {
      return Array.from({ length: this.$util.now.year + 1 - 2019 }, (v, k) => k + 2019);
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.parties = [];
      Vue.axios
        .get(`club_owner/party_income/${this.year}/${this.month}`)
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
