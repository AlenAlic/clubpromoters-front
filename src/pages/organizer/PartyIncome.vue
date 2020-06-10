<template>
  <div>
    <v-row class="no-print">
      <v-col cols="12" lg="4" offset-lg="4">
        <v-card>
          <v-card-title>{{ $t("general.choose_month") }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="month"
                  hide-details
                  :items="$util.selectMonths"
                  :label="$t('general.month')"
                  @change="getData"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="year"
                  hide-details
                  :items="$util.financesYears"
                  :label="$t('general.year')"
                  @change="getData"
                />
              </v-col>
              <v-col cols="2" align-self="center" class="text-right">
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
                    <span>{{ $t("organizer.party_income.total_profit") }}</span>
                    <span>{{ $util.formatCurrency(totalProfit) }}</span>
                  </div>
                </v-list-item-title>
                <v-list-item-title class="finances-body">
                  <div>
                    <span>{{ $t("organizer.party_income.total_tickets_sold") }}</span>
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
                    <v-col class="text-right"> {{ party.num_sold_tickets }} / {{ party.num_available_tickets }} </v-col>
                    <v-col class="text-right pr-3">
                      {{ $util.formatCurrency(party.total_profit) }}
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
                          <span>{{ $t("organizer.party_income.ticket_price") }}</span>
                          <span>{{ $util.formatCurrency(party.ticket_price) }}</span>
                        </div>
                        <div class="three">
                          <span>{{ $t("organizer.party_income.sold") }}</span>
                          <span>{{ party.num_sold_tickets }} / {{ party.num_available_tickets }}</span>
                        </div>
                        <div class="mt-2">
                          <b>{{ $t("organizer.party_income.income") }}</b>
                        </div>
                        <div>
                          <i>{{ $t("organizer.party_income.ticket_sale") }}</i>
                          <span>{{ $util.formatCurrency(party.income_tickets_sold) }}</span>
                        </div>
                        <div>
                          <i>{{ $t("organizer.party_income.administration_costs") }}</i>
                          <span>{{ $util.formatCurrency(party.income_administration_costs) }}</span>
                        </div>
                        <div class="mt-1">
                          <b>{{ $t("organizer.party_income.expenses") }}</b>
                        </div>
                        <div>
                          <i>{{ $t("organizer.party_income.refunds") }}</i>
                          <span>{{ $util.formatCurrency(party.expenses_refunds) }}</span>
                        </div>
                        <div>
                          <i>{{ $t("organizer.party_income.promoter_commissions") }}</i>
                          <span>{{ $util.formatCurrency(party.expenses_promoter_commissions) }}</span>
                        </div>
                        <div>
                          <i>{{ $t("organizer.party_income.club_owner_commissions") }}</i>
                          <span>{{ $util.formatCurrency(party.expenses_club_owner_commissions) }}</span>
                        </div>
                        <v-divider class="my-1" />
                        <div>
                          <b>{{ $t("organizer.party_income.total") }}</b>
                          <span>{{ $util.formatCurrency(party.total_profit) }}</span>
                        </div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
          <v-card-text v-else>
            {{ $t("organizer.party_income.no_parties", { month: $util.displayMonth(displayMonth) }) }}
          </v-card-text>
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
        return t + c.total_profit;
      }, 0);
    },
    totalTicketsSold() {
      return this.parties.reduce((t, c) => {
        return t + c.num_sold_tickets;
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
