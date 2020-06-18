<template>
  <div>
    <v-row>
      <v-col>
        <view-hostess-accounts-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewHostessAccountsCard from "@/components/club_owner/hostesses/ViewHostessAccountsCard";
import { HOSTESSES } from "@/store/modules/club_owner/hostesses";
export default {
  components: { ViewHostessAccountsCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(HOSTESSES);
    });
  }
};
</script>
