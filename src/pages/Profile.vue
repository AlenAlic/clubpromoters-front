<template>
  <v-container fluid class="py-0">
    <v-row>
      <v-col cols="12" lg="4">
        <change-password-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChangePasswordCard from "@/components/auth/cards/ChangePasswordCard";

export default {
  components: {
    ChangePasswordCard
  }
};
</script>
