<template>
  <div>
    <v-row class="no-print">
      <v-col cols="12" lg="4" offset-lg="4">
        <v-card>
          <v-card-title>Choose month to view finances</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select v-model="month" hide-details :items="$util.selectMonths" label="Month" />
              </v-col>
              <v-col cols="5">
                <v-select v-model="year" hide-details :items="$util.financesYears" label="Year" />
              </v-col>
              <v-col cols="1" align-self="center" class="text-right">
                <v-btn icon @click="getData">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4" offset-lg="4">
        <v-card class="card--print">
          <v-card-title>{{ $util.displayMonth(displayMonth) }} {{ displayYear }}</v-card-title>
          <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
          <template v-else-if="parties.length">
            <v-list-item class="subtitle-2">
              <v-list-item-content>
                <v-list-item-title class="finances-body">
                  <div>
                    <span>Total profit</span>
                    <span>{{ $util.formatCurrency(totalProfit) }}</span>
                  </div>
                </v-list-item-title>
                <v-list-item-title class="finances-body">
                  <div>
                    <span>Total tickets sold</span>
                    <span>{{ totalTicketsSold }} / {{ totalAvailableTickets }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-expansion-panels accordion>
              <v-expansion-panel v-for="party in parties" :key="party.id">
                <v-expansion-panel-header>
                  <v-row no-gutters justify="space-between">
                    <v-col>{{ party.name }}</v-col>
                    <v-col class="text-right"> {{ party.sold_tickets }} / {{ party.num_available_tickets }} </v-col>
                    <v-col class="text-right pr-3">
                      {{ $util.formatCurrency(party.party_profit) }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ $util.dateTimeFromUTCString(party.start_date).toFormat("dd LLLL") }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="finances-body">
                        <div class="three">
                          <span>Ticket price</span>
                          <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
                        </div>
                        <div class="three">
                          <span>Sold</span>
                          <span>{{ party.sold_tickets }} / {{ party.num_available_tickets }}</span>
                        </div>
                        <div class="mt-2">
                          <b>Income</b>
                        </div>
                        <div>
                          <i>Ticket sale</i>
                          <span>{{ $util.formatCurrency(party.party_income) }}</span>
                        </div>
                        <div class="mt-1">
                          <b>Expenses</b>
                        </div>
                        <div>
                          <i>Refunds</i>
                          <span>{{ $util.formatCurrency(party.party_refunds) }}</span>
                        </div>
                        <div>
                          <i>Promoter commissions</i>
                          <span>{{ $util.formatCurrency(party.party_promoter_cut) }}</span>
                        </div>
                        <div>
                          <i>Club Owner commissions</i>
                          <span>{{ $util.formatCurrency(party.party_club_owner_cut) }}</span>
                        </div>
                        <v-divider class="my-1"></v-divider>
                        <div>
                          <b>Total</b>
                          <span>{{ $util.formatCurrency(party.party_profit) }}</span>
                        </div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
          <v-card-text v-else>No parties in {{ $util.displayMonth(displayMonth) }}.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      loading: true,
      month: String(this.$util.now.month),
      year: this.$util.now.year,
      displayMonth: String(this.$util.now.month),
      displayYear: this.$util.now.year,
      parties: []
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
    totalTicketsSold() {
      return this.parties.reduce((t, c) => {
        return t + c.sold_tickets;
      }, 0);
    },
    totalAvailableTickets() {
      return this.parties.reduce((t, c) => {
        return t + c.num_available_tickets;
      }, 0);
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.parties = [];
      this.axios
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
