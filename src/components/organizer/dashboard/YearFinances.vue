<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.dashboard.finances.this_year.title") }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t("organizer.dashboard.finances.this_year.subtitle") }}
    </v-card-subtitle>
    <v-card-text v-if="loading" class="text-center">
      <v-progress-circular color="primary" indeterminate />
    </v-card-text>
    <v-card-text v-else>
      <line-chart :chartdata="data" :options="options" :style="{ width: '100%', height: '300px' }" />
    </v-card-text>
  </v-card>
</template>

<script>
import i18n from "@/languages";
import LineChart from "@/components/charts/LineChart";
import { MONTHS } from "@/constants";
export default {
  components: { LineChart },
  data: function() {
    return {
      loading: true,
      data: {},
      options: {
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
        .get("organizer/dashboard/graph")
        .then(response => {
          this.setChartData(response.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setChartData(responseData) {
      let data = {};
      data.labels = responseData.months.map(m => MONTHS[m]);
      data.datasets = [
        {
          label: i18n.t("organizer.dashboard.finances.revenue"),
          data: responseData.revenue,
          backgroundColor: "blue",
          borderColor: "blue",
          fill: false
        },
        {
          label: i18n.t("organizer.dashboard.finances.expenses"),
          data: responseData.expenses,
          backgroundColor: "red",
          borderColor: "red",
          fill: false
        },
        {
          label: i18n.t("organizer.dashboard.finances.profit"),
          data: responseData.profit,
          backgroundColor: "green",
          borderColor: "green",
          fill: false
        }
      ];
      this.data = data;
    }
  }
};
</script>
