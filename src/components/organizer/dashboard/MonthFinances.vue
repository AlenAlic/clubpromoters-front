<template>
  <v-card-text class="title black--text" v-if="data">
    <v-row no-gutters>
      <v-col>{{ $t("organizer.dashboard.finances.revenue") }}</v-col>
      <v-col class="text-right">{{ $util.formatCurrency(data.revenue) }}</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>{{ $t("organizer.dashboard.finances.expenses") }}</v-col>
      <v-col class="text-right">{{ $util.formatCurrency(data.expenses) }}</v-col>
    </v-row>
    <v-divider />
    <v-row no-gutters>
      <v-col :class="`text-right ${color}`">{{ $util.formatCurrency(data.profit) }}</v-col>
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
      return this.data.profit > 0 ? "green--text" : "red--text";
    }
  }
};
</script>
