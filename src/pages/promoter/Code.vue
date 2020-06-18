<template>
  <v-row align="center">
    <v-col>
      <v-card class="mx-auto" max-width="400">
        <div v-if="!$store.state.code.loading && $store.state.code.code">
          <v-img :src="`data:image/png;base64,${$store.state.code.code.qr_code}`" alt="QR code"></v-img>
          <div class="text-center pb-5 display-1">{{ $store.state.code.code.code }}</div>
        </div>
        <v-skeleton-loader v-else class="mx-auto" max-width="400" type="card"></v-skeleton-loader>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { CODE } from "@/store/modules/promoter/code";
export default {
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(CODE);
    });
  }
};
</script>
