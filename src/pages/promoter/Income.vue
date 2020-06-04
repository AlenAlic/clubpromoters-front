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
            <v-list-item class="print_friendly" two-line v-for="party in parties" :key="party.id">
              <v-list-item-content>
                <v-list-item-title>{{ party.name }}</v-list-item-title>
                <v-list-item-subtitle class="finances-body">
                  <div class="two">
                    <span>Tickets sold</span>
                    <span>{{ party.tickets }}</span>
                  </div>
                  <div><b>Commission</b></div>
                  <div>
                    <i></i>
                    <span>{{ $util.formatCurrency(party.price) }}</span>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="finances-body">
                  <div>
                    <span>Total</span>
                    <span>{{ $util.formatCurrency(total) }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-card-text v-else> No tickets sold in {{ $util.displayMonth(displayMonth) }}. </v-card-text>
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
      parties: [],
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.parties = [];
      this.total = 0;
      this.axios
        .get(`promoter/income/${this.year}/${this.month}`)
        .then(response => {
          this.parties = response.data.parties;
          this.total = response.data.total;
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
