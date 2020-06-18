<template>
  <v-row>
    <v-col>
      <view-club-owner-accounts-card />
    </v-col>
  </v-row>
</template>

<script>
import ViewClubOwnerAccountsCard from "@/components/organizer/club_owner_accounts/ViewClubOwnerAccountsCard";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: { ViewClubOwnerAccountsCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
  }
};
</script>
