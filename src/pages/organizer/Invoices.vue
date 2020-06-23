<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <invoices-card url="organizer/invoices/all" show-name :hide-default-footer="false" />
    </v-col>
  </v-row>
</template>

<script>
import InvoicesCard from "@/components/InvoicesCard";
export default {
  components: { InvoicesCard }
};
</script>
