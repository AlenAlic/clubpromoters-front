<template>
  <v-card-text class="title black--text" v-if="data">
    <v-row no-gutters>
      <v-col>{{ $t("club_owner.dashboard.finances.tickets_sold") }}</v-col>
      <v-col class="text-right">{{ data.tickets_sold }}</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>{{ $t("club_owner.dashboard.finances.commission") }}</v-col>
      <v-col :class="`text-right ${color}`">{{ $util.formatCurrency(data.commission) }}</v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => {} }
  },
  computed: {
    color() {
      return this.data.commission > 0 ? "green--text" : "";
    }
  }
};
</script>
