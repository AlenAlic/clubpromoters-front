<template>
  <div>
    <v-row>
      <v-col>
        <view-inactive-parties-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewInactivePartiesCard from "@/components/club_owner/inactive_parties/ViewInactivePartiesCard";
import { CO_INACTIVE_PARTIES } from "@/store/modules/club_owner/parties";
export default {
  components: { ViewInactivePartiesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(CO_INACTIVE_PARTIES);
    });
  }
};
</script>
