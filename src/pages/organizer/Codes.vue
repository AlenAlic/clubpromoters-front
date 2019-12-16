<template>
  <div>
    <v-row>
      <v-col>
        <create-new-codes-card></create-new-codes-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <view-active-codes-card></view-active-codes-card>
      </v-col>
      <v-col>
        <view-inactive-codes-card></view-inactive-codes-card>
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
