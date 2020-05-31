<template>
  <v-row align="center">
    <v-col cols="12" lg="4">
      <switch-user-card />
    </v-col>
  </v-row>
</template>
<script>
import SwitchUserCard from "@/components/admin/SwitchUserCard";
export default {
  components: { SwitchUserCard }
};
</script>
