<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.dashboard.inactive_parties.title") }}
    </v-card-title>
    <v-card-text v-if="$store.state.parties.loadingInactiveParties" class="text-center">
      <v-progress-circular color="primary" indeterminate />
    </v-card-text>
    <v-list dense v-else>
      <v-list-item v-for="party in $store.state.parties.inactiveParties" :key="party.id" disabled two-line>
        <v-list-item-content>
          <v-list-item-title class="black--text">{{ party.club }} - {{ party.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            `${$util.dateTimeFromUTCString(party.start_date).toFormat("dd LLL HH:mm")} - ${$util
              .dateTimeFromUTCString(party.end_date)
              .toFormat("HH:mm")}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-actions class="text-center">
      <v-btn text block color="primary" :to="{ name: 'organizer.inactive_parties' }">
        {{ $t("organizer.dashboard.inactive_parties.go_to") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
