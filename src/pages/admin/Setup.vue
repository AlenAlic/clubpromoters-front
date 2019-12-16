<template>
  <v-row align="center">
    <v-col>
      <loading-card v-if="loading"></loading-card>
      <create-organizer-card
        v-else-if="!hasOrganizer"
        @createdOrganizerAccount="checkForOrganizerAccount"
      ></create-organizer-card>
      <v-card v-else-if="hasOrganizer">
        <v-card-text class="text-center">
          Has organizer
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Vue from "vue";
import LoadingCard from "@/components/general/LoadingCard";
import CreateOrganizerCard from "@/components/admin/CreateOrganizerCard";
export default {
  name: "Setup",
  components: { LoadingCard, CreateOrganizerCard },
  data: function() {
    return {
      loading: true,
      hasOrganizer: false
    };
  },
  mounted() {
    this.checkForOrganizerAccount();
  },
  methods: {
    checkForOrganizerAccount: function() {
      this.hasOrganizer = false;
      this.loading = true;
      return Vue.axios.get("admin/has_organizer").then(response => {
        this.hasOrganizer = response.data;
        this.loading = false;
      });
    }
  }
};
</script>
