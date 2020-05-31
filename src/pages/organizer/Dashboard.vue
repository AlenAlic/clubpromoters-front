<template>
  <v-row>
    <v-col cols="12" lg="4">
      <settings-card v-if="Object.keys($store.state.config.settings).length" />
      <loading-card v-else />
    </v-col>
    <v-col cols="12" lg="4">
      <terms-and-conditions-card v-if="Object.keys($store.state.config.settings).length" />
      <loading-card v-else />
    </v-col>
  </v-row>
</template>

<script>
import SettingsCard from "@/components/organizer/dashboard/SettingsCard";
import TermsAndConditionsCard from "@/components/organizer/dashboard/TermsAndConditionsCard";
import LoadingCard from "@/components/general/LoadingCard";

export default {
  components: {
    LoadingCard,
    TermsAndConditionsCard,
    SettingsCard
  }
};
</script>
