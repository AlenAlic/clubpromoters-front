<template>
  <v-row align="center" style="background: black;" v-if="Object.keys($store.state.config.settings).length">
    <v-col cols="12" lg="4">
      <create-new-party-card @preview="getPreviewObject" />
    </v-col>
    <v-col>
      <v-lazy :options="{ threshold: 0.5 }">
        <party-card :party="preview" :preview="true" />
      </v-lazy>
    </v-col>
  </v-row>
  <v-row v-else align="center" class="fill-height" style="background: black;">
    <v-col cols="12" lg="4">
      <v-boilerplate
        :skeletons="[
          'card-heading',
          'list-item-two-line',
          'list-item-two-line',
          'list-item-two-line',
          'list-item-two-line',
          'list-item-two-line',
          'list-item-three-line',
          'list-item-two-line',
          'list-item-two-line',
          'list-item-three-line',
          'list-item-two-line',
          'list-item-two-line',
          'actions'
        ]"
      ></v-boilerplate>
    </v-col>
    <v-col cols="12" lg="3" offset-lg="2">
      <v-boilerplate :skeletons="['image', 'article']"></v-boilerplate>
    </v-col>
  </v-row>
</template>
<script>
import CreateNewPartyCard from "@/components/organizer/create_new_party/CreateNewPartyCard";
import PartyCard from "@/components/general/party_card/PartyCard";
import VBoilerplate from "@/components/Vuetify/VBoilerplate";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: {
    VBoilerplate,
    PartyCard,
    CreateNewPartyCard
  },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
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
