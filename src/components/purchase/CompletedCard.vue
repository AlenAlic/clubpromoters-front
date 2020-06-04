<template>
  <v-card min-width="250px">
    <div v-if="purchase">
      <v-card-title>Ticket purchase complete</v-card-title>
      <v-card-text>
        <p>
          Your purchase for {{ purchase.number_of_tickets }} tickets to {{ purchase.party.name }} has been completed.
        </p>
        <p>The tickets will be sent to "{{ purchase.email }}".</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <router-link tag="span" :to="{ name: 'purchase.index' }">
          <v-btn text>
            Back to party overview
          </v-btn>
        </router-link>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import Vue from "vue";
export default {
  created() {
    Vue.axios.get(`/purchase/completed/${this.$route.params.hash}`).then(response => {
      this.purchase = response.data;
    });
  },
  data: function() {
    return {
      purchase: null
    };
  }
};
</script>
