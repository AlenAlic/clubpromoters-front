<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <create-new-codes-card class="mb-5" />
        <print-codes-card />
      </v-col>
      <v-col cols="12" lg="5">
        <view-active-codes-card />
      </v-col>
      <v-col cols="12" lg="4">
        <view-inactive-codes-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CreateNewCodesCard from "@/components/organizer/codes/CreateNewCodesCard";
import ViewActiveCodesCard from "@/components/organizer/codes/ViewActiveCodesCard";
import ViewInactiveCodesCard from "@/components/organizer/codes/ViewInactiveCodesCard";
import PrintCodesCard from "@/components/organizer/codes/PrintCodesCard";
import { ACTIVE_CODES, INACTIVE_CODES } from "@/store/modules/organizer/codes";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: { PrintCodesCard, ViewInactiveCodesCard, ViewActiveCodesCard, CreateNewCodesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(ACTIVE_CODES);
      this.$store.dispatch(INACTIVE_CODES);
      this.$store.dispatch(USERS);
    });
  }
};
</script>
