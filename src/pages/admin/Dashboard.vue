<template>
  <v-row align="center">
    <v-col>
      <switch-user-card></switch-user-card>
    </v-col>
  </v-row>
</template>
<script>
import SwitchUserCard from "@/components/admin/SwitchUserCard";
export default {
  components: { SwitchUserCard }
};
</script>
