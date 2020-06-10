<template>
  <v-card>
    <v-card-title>
      {{ $t("club_owner.dashboard.finances.this_month") }}
    </v-card-title>
    <v-card-text v-if="loading" class="text-center">
      <v-progress-circular color="primary" indeterminate />
    </v-card-text>
    <month-finances v-else :data="data" />
  </v-card>
</template>

<script>
import MonthFinances from "@/components/club_owner/dashboard/MonthFinances";
export default {
  components: { MonthFinances },
  data: function() {
    return {
      loading: true,
      data: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios
        .get("club_owner/dashboard/this_month")
        .then(response => {
          this.data = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
