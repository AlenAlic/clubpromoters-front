<template>
  <div>
    <v-row class="no-print">
      <v-col cols="12" lg="6" offset-lg="3">
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
      <v-col cols="12" lg="3" offset-lg="3">
        <v-card class="card--print">
          <v-card-title>{{ getMonth }} {{ displayYear }}</v-card-title>
          <v-progress-linear v-if="loading" color="primary" indeterminate />
          <v-list-item class="subtitle-2">
            <v-list-item-content>
              <v-list-item-title class="body">
                <div>
                  <span>Month total</span>
                  <span>{{ $util.formatCurrency(totalPromoterProfit) }}</span>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="user in promoters" :key="user.id">
              <v-expansion-panel-header>
                <v-row no-gutters justify="space-between">
                  <v-col> {{ user.name }}</v-col>
                  <v-col class="text-right pr-3">{{ $util.formatCurrency(user.total) }}</v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item class="px-0">
                  <v-list-item-content>
                    <v-list-item-subtitle
                      class="body mt-2"
                      v-for="party in user.parties"
                      :key="party.id"
                    >
                      <div>
                        <b>{{ party.club }}</b>
                      </div>
                      <div>
                        <i>{{ `${$util.dateTime(party.start_date).toFormat("d LLLL yyyy")}` }}</i>
                      </div>
                      <div class="three">
                        <span>Tickets sold</span>
                        <span>{{ party.tickets }}</span>
                      </div>
                      <v-divider class="my-1" />
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
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3">
        <v-card class="card--print">
          <v-card-title>{{ getMonth }} {{ displayYear }}</v-card-title>
          <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
          <v-list-item class="subtitle-2">
            <v-list-item-content>
              <v-list-item-title class="body">
                <div>
                  <span>Month total</span>
                  <span>{{ $util.formatCurrency(totalClubOwnersProfit) }}</span>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="user in club_owners" :key="user.id">
              <v-expansion-panel-header>
                <v-row no-gutters justify="space-between">
                  <v-col> {{ user.club }}</v-col>
                  <v-col class="text-right pr-3">{{ $util.formatCurrency(user.total) }}</v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item class="px-0">
                  <v-list-item-content>
                    <v-list-item-subtitle
                      class="body mt-2"
                      v-for="party in user.parties"
                      :key="party.id"
                    >
                      <div>
                        <span>
                          <b>
                            {{
                              `${$util.dateTime(party.start_date).toFormat("d LLLL yyyy, HH:mm")}`
                            }}
                          </b>
                        </span>
                      </div>
                      <div>
                        {{ party.location.name }}
                      </div>
                      <div class="three">
                        <span>Tickets sold</span>
                        <span>{{ party.tickets }}</span>
                      </div>
                      <v-divider class="my-1" />
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
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
      return Array.from(Array(this.$util.now.year + 1 - 2019).keys()).map(n => n + 2019);
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
