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
import ViewPastPartiesCard from "@/components/organizer/past_parties/ViewPastPartiesCard";
import { PAST_PARTIES } from "@/store/modules/organizer/parties";
export default {
  components: { ViewPastPartiesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(PAST_PARTIES);
    });
  }
};
</script>
