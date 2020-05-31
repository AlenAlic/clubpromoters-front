<template>
  <v-row align="center">
    <v-col>
      <v-card class="mx-auto" max-width="400" v-if="!loading">
        <v-list v-if="parties.length">
          <v-list-item
            three-line
            link
            :to="{ name: 'hostess.party', params: { id: party.id } }"
            v-for="party in parties"
            :key="party.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ party.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{
                  `${$util.dateTime(party.start_date).toFormat("d LLLL, HH:mm")}-${$util
                    .dateTime(party.end_date)
                    .toFormat("HH:mm")}`
                }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-right">
                {{ `Expecting ${party.sold_tickets} guests.` }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text v-else>
          No parties today.
        </v-card-text>
      </v-card>
      <v-card v-else class="mx-auto" max-width="400">
        <v-card-text class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Vue from "vue";
export default {
  data: function() {
    return {
      loading: true,
      parties: []
    };
  },
  created() {
    this.loading = true;
    Vue.axios
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
