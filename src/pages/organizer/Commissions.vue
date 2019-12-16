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
          <v-list-item class="print_friendly" three-line v-for="user in promoters" :key="user.id">
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle class="body mt-2" v-for="party in user.parties" :key="party.id">
                <div>
                  <b>{{ party.title }}</b>
                </div>
                <div class="three">
                  <span>Tickets sold</span>
                  <span>{{ party.tickets }}</span>
                </div>
                <div>
                  <span>Commission</span>
                  <span>{{ $util.formatCurrency(party.price) }}</span>
                </div>
              </v-list-item-subtitle>
              <v-list-item-subtitle class="body mt-3">
                <div>
                  <span>
                    <b>Total commission</b>
                  </span>
                  <span>
                    <b>{{ $util.formatCurrency(user.total) }}</b>
                  </span>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="body">
                <div>
                  <span>Total</span>
                  <span>{{ $util.formatCurrency(totalPromoterProfit) }}</span>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="card--print">
          <v-card-title>{{ getMonth }} {{ displayYear }}</v-card-title>
          <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
          <v-list-item class="print_friendly" three-line v-for="user in club_owners" :key="user.id">
            <v-list-item-content>
              <v-list-item-title>{{ user.club }}</v-list-item-title>
              <v-list-item-subtitle class="body mt-2" v-for="party in user.parties" :key="party.id">
                <div>
                  <b>{{ party.title }}</b>
                </div>
                <div class="three">
                  <span>Tickets sold</span>
                  <span>{{ party.tickets }}</span>
                </div>
                <div>
                  <span>Commission</span>
                  <span>{{ $util.formatCurrency(party.price) }}</span>
                </div>
              </v-list-item-subtitle>
              <v-list-item-subtitle class="body mt-3">
                <div>
                  <span>
                    <b>Total commission</b>
                  </span>
                  <span>
                    <b>{{ $util.formatCurrency(user.total) }}</b>
                  </span>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="body">
                <div>
                  <span>Total</span>
                  <span>{{ $util.formatCurrency(totalClubOwnersProfit) }}</span>
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
import { CLUB_OWNER, MONTHS, PROMOTER } from "@/constants";
export default {
  data: function() {
    return {
      month: String(this.$util.now.month),
      year: this.$util.now.year,
      displayMonth: String(this.$util.now.month),
      displayYear: this.$util.now.year,
      promoters: [],
      club_owners: [],
      parties: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  computed: {
    totalPromoterProfit() {
      return this.promoters.reduce((t, c) => {
        return t + c.total;
      }, 0);
    },
    totalClubOwnersProfit() {
      return this.club_owners.reduce((t, c) => {
        return t + c.total;
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
        .get(`organizer/commissions/${this.year}/${this.month}`)
        .then(response => {
          this.promoters = response.data.filter(u => u.access === PROMOTER);
          this.club_owners = response.data.filter(u => u.access === CLUB_OWNER);
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
