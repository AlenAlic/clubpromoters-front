<template>
  <v-container class="py-0">
    <v-row>
      <v-col col="12" md="6" lg="4" xl="3">
        <profile-card v-if="$store.state.auth.profile" class="mb-4" />
        <v-boilerplate
          v-else-if="$store.state.auth.loadingProfile"
          :skeletons="['card-heading', 'list-item-two-line', 'list-item-two-line', 'list-item-two-line', 'actions']"
          class="mb-4"
        ></v-boilerplate>
      </v-col>
      <template v-if="showInvoiceItems">
        <v-col col="12" md="6" lg="4" xl="3">
          <address-card v-if="$store.state.auth.profile" />
          <v-boilerplate
            v-else-if="$store.state.auth.loadingProfile"
            :skeletons="[
              'card-heading',
              'list-item-two-line',
              'list-item-two-line',
              'list-item-two-line',
              'list-item-two-line',
              'list-item-two-line',
              'actions'
            ]"
          ></v-boilerplate>
        </v-col>
        <v-col col="12" md="6" lg="4" xl="3">
          <invoice-card v-if="$store.state.auth.profile" />
          <v-boilerplate
            v-else-if="$store.state.auth.loadingProfile"
            :skeletons="[
              'card-heading',
              'list-item-two-line',
              'list-item-two-line',
              'list-item-two-line',
              'list-item-two-line',
              'actions'
            ]"
          ></v-boilerplate>
        </v-col>
        <v-col col="12" md="6" lg="4" xl="3">
          <invoice-language-card v-if="$store.state.auth.profile" class="mb-4" />
          <v-boilerplate
            v-else-if="$store.state.auth.loadingProfile"
            :skeletons="['card-heading', 'list-item-two-line', 'actions']"
            class="mb-4"
          ></v-boilerplate>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import VBoilerplate from "@/components/Vuetify/VBoilerplate";
import ProfileCard from "@/components/user/ProfileCard";
import AddressCard from "@/components/user/AddressCard";
import InvoiceLanguageCard from "@/components/user/InvoiceLanguageCard";
import InvoiceCard from "@/components/user/InvoiceCard";
import { CLUB_OWNER, PROMOTER } from "@/constants";
export default {
  components: {
    InvoiceCard,
    InvoiceLanguageCard,
    AddressCard,
    VBoilerplate,
    ProfileCard
  },
  computed: {
    showInvoiceItems() {
      return this.$store.getters.access === CLUB_OWNER || this.$store.getters.access === PROMOTER;
    }
  }
};
</script>
