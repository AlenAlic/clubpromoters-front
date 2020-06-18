<template>
  <div>
    <v-row>
      <v-col>
        <view-club-owner-hostess-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewClubOwnerHostessCard from "@/components/organizer/club_owner_hostesses/ViewClubOwnerHostessCard";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: { ViewClubOwnerHostessCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
  }
};
</script>
