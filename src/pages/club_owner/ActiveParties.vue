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
export default {
  components: { ViewActivePartiesCard }
};
</script>
