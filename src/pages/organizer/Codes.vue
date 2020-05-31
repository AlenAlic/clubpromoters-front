<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <create-new-codes-card />
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
export default {
  components: { ViewInactiveCodesCard, ViewActiveCodesCard, CreateNewCodesCard }
};
</script>
