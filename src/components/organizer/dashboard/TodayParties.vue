<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.dashboard.today_parties.title") }}
    </v-card-title>
    <v-card-text v-if="$store.state.parties.loadingActiveParties" class="text-center">
      <v-progress-circular color="primary" indeterminate />
    </v-card-text>
    <v-list dense v-else>
      <v-list-item v-for="party in parties" :key="party.id" disabled two-line>
        <v-list-item-content>
          <v-list-item-title class="black--text">{{ party.club }} - {{ party.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            `${$util.dateTimeFromUTCString(party.start_date).toFormat("HH:mm")} - ${$util
              .dateTimeFromUTCString(party.end_date)
              .toFormat("HH:mm")}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-actions class="text-center">
      <v-btn text block color="primary" :to="{ name: 'organizer.active_parties' }">
        {{ $t("organizer.dashboard.active_parties.go_to") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    parties() {
      return this.$store.state.parties.activeParties.filter(p => {
        return (
          this.$util.dateTimeFromUTCString(p.start_date).toFormat("yyyy-LL-dd") ===
          this.$util.now.toFormat("yyyy-LL-dd")
        );
      });
    }
  }
};
</script>
