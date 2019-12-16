<template>
  <v-row justify="center">
    <v-col cols="12" v-for="party in parties" :key="party.id">
      <party-card :party="party"></party-card>
    </v-col>
  </v-row>
</template>
<script>
import store from "@/store";
import PartyCard from "@/components/general/PartyCard/PartyCard";
export default {
  components: { PartyCard },
  computed: {
    parties() {
      return store.state.parties.activeParties;
    }
  }
};
</script>
