<template>
  <div>
    <v-row>
      <v-col>
        <view-inactive-parties-card></view-inactive-parties-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ViewInactivePartiesCard from "@/components/organizer/inactive_parties/ViewInactivePartiesCard";
export default {
  components: { ViewInactivePartiesCard }
};
</script>
