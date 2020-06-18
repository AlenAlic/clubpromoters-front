<template>
  <v-row>
    <v-col>
      <view-club-owner-locations-card />
    </v-col>
  </v-row>
</template>

<script>
import ViewClubOwnerLocationsCard from "@/components/organizer/club_owner_locations/ViewClubOwnerLocationsCard";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: { ViewClubOwnerLocationsCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
  }
};
</script>
