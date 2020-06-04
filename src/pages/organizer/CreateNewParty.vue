<template>
  <v-row align="center" style="background: black;" v-if="Object.keys($store.state.config.settings).length">
    <v-col cols="12" lg="4">
      <create-new-party-card @preview="getPreviewObject" />
    </v-col>
    <v-col style="background: black;">
      <v-lazy :options="{ threshold: 0.5 }">
        <party-card :party="preview" :preview="true" />
      </v-lazy>
    </v-col>
  </v-row>
  <v-row v-else class="fill-height">
    <v-col cols="12" lg="4">
      <loading-card />
    </v-col>
  </v-row>
</template>
<script>
import CreateNewPartyCard from "@/components/organizer/create_new_party/CreateNewPartyCard";
import PartyCard from "@/components/general/PartyCard/PartyCard";
import LoadingCard from "@/components/general/LoadingCard";
export default {
  components: {
    LoadingCard,
    PartyCard,
    CreateNewPartyCard
  },
  data: function() {
    return {
      preview: {}
    };
  },
  methods: {
    getPreviewObject(o) {
      this.preview = o;
    }
  }
};
</script>
