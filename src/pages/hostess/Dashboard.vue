<template>
  <v-row align="center">
    <v-col>
      <v-card class="mx-auto" max-width="400" v-if="!loading">
        <v-list v-if="todaysParties.length">
          <v-list-item
            three-line
            link
            :to="{ name: 'hostess.party', params: { id: party.id } }"
            v-for="party in todaysParties"
            :key="party.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ party.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{
                  `${$util
                    .dateTimeFromUTCString(party.start_date)
                    .toFormat("d LLLL, HH:mm")}-${$util.dateTimeFromUTCString(party.end_date).toFormat("HH:mm")}`
                }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right">
                {{ $t("hostess.dashboard.expecting_num_guests", { num: party.num_sold_tickets }) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text v-else>
          {{ $t("hostess.dashboard.no_parties_today") }}
        </v-card-text>
      </v-card>
      <v-card v-else class="mx-auto" max-width="400">
        <v-card-text class="text-center">
          <v-progress-circular indeterminate color="primary" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: function() {
    return {
      loading: true,
      parties: []
    };
  },
  computed: {
    todaysParties() {
      return this.parties.filter(p => {
        return (
          this.$util.dateTimeFromUTCString(p.start_date).toFormat("yyyy-LL-dd") ===
            this.$util.now.toFormat("yyyy-LL-dd") ||
          this.$util.dateTimeFromUTCString(p.end_date).toFormat("yyyy-LL-dd") === this.$util.now.toFormat("yyyy-LL-dd")
        );
      });
    }
  },
  created() {
    this.loading = true;
    this.axios
      .get("hostess/parties")
      .then(response => {
        this.parties = response.data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
