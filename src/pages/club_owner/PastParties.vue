<template>
  <div>
    <v-row>
      <v-col>
        <view-past-parties-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewPastPartiesCard from "@/components/club_owner/past_parties/ViewPastPartiesCard";
import { CO_PAST_PARTIES } from "@/store/modules/club_owner/parties";
export default {
  components: { ViewPastPartiesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(CO_PAST_PARTIES);
    });
  }
};
</script>
