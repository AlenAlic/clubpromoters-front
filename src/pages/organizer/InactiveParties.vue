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
import ViewInactivePartiesCard from "@/components/organizer/inactive_parties/ViewInactivePartiesCard";
import { INACTIVE_PARTIES } from "@/store/modules/organizer/parties";
export default {
  components: { ViewInactivePartiesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(INACTIVE_PARTIES);
    });
  }
};
</script>
