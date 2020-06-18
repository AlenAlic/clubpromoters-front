<template>
  <div>
    <v-row>
      <v-col>
        <view-promoter-accounts-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewPromoterAccountsCard from "@/components/organizer/promoter_accounts/ViewPromoterAccountsCard";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: {
    ViewPromoterAccountsCard
  },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(USERS);
    });
  }
};
</script>
