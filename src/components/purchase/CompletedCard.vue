<template>
  <v-card min-width="250px">
    <div v-if="purchase">
      <v-card-title>{{ $t("purchase.completed.title") }}</v-card-title>
      <v-card-text>
        <p>
          {{ $t("purchase.completed.text_1", { number: purchase.number_of_tickets, name: purchase.party.name }) }}
        </p>
        <p>{{ $t("purchase.completed.text_2", { email: purchase.email }) }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text :to="{ name: 'purchase.index' }">
          {{ $t("general.back_to_parties") }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import Vue from "vue";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
export default {
  created() {
    Vue.axios
      .get(`/purchase/completed/${this.$route.params.hash}`)
      .then(response => {
        this.purchase = response.data;
      })
      .catch(error => {
        const status = getNetworkErrorCode(error);
        if (status === ERROR_CODES.NOT_FOUND) {
          this.$toast.error(i18n.t("errors.purchase_not_found"));
          this.$router.push({
            name: "purchase.index"
          });
        }
      });
  },
  data: function() {
    return {
      purchase: null
    };
  }
};
</script>
