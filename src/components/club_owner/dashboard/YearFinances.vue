<template>
  <v-card>
    <v-card-text v-if="loading" class="text-center">
      <v-progress-circular color="primary" indeterminate />
    </v-card-text>
    <template v-else>
      <v-card-text>
        <bar-chart
          :chartdata="commissionData"
          :options="commissionOptions"
          :style="{ width: '100%', height: '250px' }"
        />
      </v-card-text>
      <v-card-text>
        <bar-chart :chartdata="ticketsData" :options="ticketsOptions" :style="{ width: '100%', height: '250px' }" />
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import i18n from "@/languages";
import BarChart from "@/components/charts/BarChart";
import { MONTHS } from "@/constants";
export default {
  components: { BarChart },
  data: function() {
    return {
      loading: true,
      commissionData: {},
      ticketsData: {},
      commissionOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  return `€ ${value.toFixed(0)}`;
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => {
              return `€ ${tooltipItem.yLabel.toFixed(2)}`;
            }
          }
        }
      },
      ticketsOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios
        .get("club_owner/dashboard/graphs")
        .then(response => {
          this.setChartData(response.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setChartData(responseData) {
      let commissions = {};
      const months = responseData.months.map(m => MONTHS[m]);
      commissions.labels = months;
      commissions.datasets = [
        {
          label: i18n.t("club_owner.dashboard.finances.commission"),
          data: responseData.commission,
          backgroundColor: "green",
          borderColor: "green",
          fill: false
        }
      ];
      this.commissionData = commissions;
      let tickets = {};
      tickets.labels = months;
      tickets.datasets = [
        {
          label: i18n.t("club_owner.dashboard.finances.tickets_sold"),
          data: responseData.tickets_sold,
          backgroundColor: "blue",
          borderColor: "blue",
          fill: false
        }
      ];
      this.ticketsData = tickets;
    }
  }
};
</script>
