<template>
  <v-row align="center">
    <v-col cols="12" v-if="!$store.getters.invoice_data_complete">
      <check-invoice-data class="mx-auto" style="max-width: 400px;" />
    </v-col>
    <v-col>
      <v-card class="mx-auto" max-width="400">
        <div v-if="!$store.state.code.loading && $store.state.code.code">
          <v-img :src="`data:image/png;base64,${$store.state.code.code.qr_code}`" alt="QR code"></v-img>
          <div class="text-center pb-5 display-1">{{ $store.state.code.code.code }}</div>
        </div>
        <v-skeleton-loader v-else-if="$store.state.code.loading" class="mx-auto" max-width="400" type="card" />
        <template v-else>
          <v-card-title>{{ $t("promoter.no_code.title") }}</v-card-title>
          <v-card-text>{{ $t("promoter.no_code.text") }}</v-card-text>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { CODE } from "@/store/modules/promoter/code";
import CheckInvoiceData from "@/components/general/dashboard/CheckInvoiceData";
export default {
  components: { CheckInvoiceData },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(CODE);
    });
  }
};
</script>
