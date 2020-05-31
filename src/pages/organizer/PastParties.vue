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
export default {
  components: { ViewPastPartiesCard }
};
</script>
