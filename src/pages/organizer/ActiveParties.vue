<template>
  <div>
    <v-row>
      <v-col>
        <view-active-parties-card />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewActivePartiesCard from "@/components/organizer/active_parties/ViewActivePartiesCard";
import { ACTIVE_PARTIES } from "@/store/modules/organizer/parties";
export default {
  components: { ViewActivePartiesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(ACTIVE_PARTIES);
    });
  }
};
</script>
