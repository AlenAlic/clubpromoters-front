<template>
  <v-row>
    <v-col cols="12" lg="4">
      <switch-user-card />
    </v-col>
    <v-col cols="12" lg="4">
      <create-organizer-card />
    </v-col>
  </v-row>
</template>
<script>
import SwitchUserCard from "@/components/admin/SwitchUserCard";
import CreateOrganizerCard from "@/components/admin/CreateOrganizerCard";
export default {
  components: { CreateOrganizerCard, SwitchUserCard }
};
</script>
