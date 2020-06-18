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
import ViewActivePartiesCard from "@/components/club_owner/active_parties/ViewActivePartiesCard";
import { CO_ACTIVE_PARTIES } from "@/store/modules/club_owner/parties";
export default {
  components: { ViewActivePartiesCard },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(CO_ACTIVE_PARTIES);
    });
  }
};
</script>
