<template>
  <v-row align="center">
    <v-col cols="12" md="6" xl="3">
      <create-organizer-card @createdOrganizerAccount="checkForOrganizerAccount" />
    </v-col>
  </v-row>
</template>
<script>
import Vue from "vue";
import CreateOrganizerCard from "@/components/admin/CreateOrganizerCard";
export default {
  name: "Setup",
  components: { CreateOrganizerCard },
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
