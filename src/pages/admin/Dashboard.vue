<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <switch-user-card />
      </v-col>
      <v-col cols="12" lg="4">
        <create-organizer-card />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <organizers-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import SwitchUserCard from "@/components/admin/SwitchUserCard";
import CreateOrganizerCard from "@/components/admin/CreateOrganizerCard";
import OrganizersCard from "@/components/admin/OrganizersCard";
export default {
  components: { CreateOrganizerCard, SwitchUserCard, OrganizersCard }
};
</script>
