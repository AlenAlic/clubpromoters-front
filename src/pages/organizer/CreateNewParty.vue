<template>
  <div>
    <v-row>
      <v-col sm="12" md="12" lg="4">
        <create-new-party-card @preview="getPreviewObject"></create-new-party-card>
      </v-col>
      <v-col>
        <party-card :party="preview" :preview="true"></party-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CreateNewPartyCard from "@/components/organizer/create_new_party/CreateNewPartyCard";
import PartyCard from "@/components/general/PartyCard/PartyCard";
export default {
  components: {
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
