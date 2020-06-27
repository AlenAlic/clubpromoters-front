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
        <language-card v-if="$store.state.auth.profile" class="mb-4" />
        <v-boilerplate
          v-else-if="$store.state.auth.loadingProfile"
          :skeletons="['card-heading', 'list-item-two-line', 'actions']"
          class="mb-4"
        ></v-boilerplate>
      </v-col>
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
            'actions'
          ]"
        ></v-boilerplate>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VBoilerplate from "@/components/Vuetify/VBoilerplate";
import ProfileCard from "@/components/user/ProfileCard";
import AddressCard from "@/components/user/AddressCard";
import LanguageCard from "@/components/user/LanguageCard";
export default {
  components: {
    LanguageCard,
    AddressCard,
    VBoilerplate,
    ProfileCard
  }
};
</script>
