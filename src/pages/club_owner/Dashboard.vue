<template>
  <v-row>
    <v-col cols="12" class="py-0" v-if="!$store.getters.invoice_data_complete">
      <v-row>
        <v-col cols="12" md="6" xl="3">
          <check-invoice-data />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6" xl="3" class="py-0">
      <v-row>
        <v-col cols="12">
          <active-parties />
        </v-col>
        <v-col cols="12">
          <inactive-parties />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6" xl="3" class="py-0">
      <v-row>
        <v-col>
          <today-parties />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" xl="6" class="py-0">
      <v-row>
        <v-col lg="4" xl="12" class="pb-0">
          <v-row>
            <v-col cols="12" lg="12" xl="6" class="pt-0">
              <this-month-finances />
            </v-col>
            <v-col cols="12" lg="12" xl="6" class="pt-0">
              <last-month-finances />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="8" xl="12">
          <year-finances />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ActiveParties from "@/components/club_owner/dashboard/ActiveParties";
import CheckInvoiceData from "@/components/general/dashboard/CheckInvoiceData";
import InactiveParties from "@/components/club_owner/dashboard/InactiveParties";
import TodayParties from "@/components/club_owner/dashboard/TodayParties";
import LastMonthFinances from "@/components/club_owner/dashboard/LastMonthFinances";
import ThisMonthFinances from "@/components/club_owner/dashboard/ThisMonthFinances";
import YearFinances from "@/components/club_owner/dashboard/YearFinances";
import { CO_ACTIVE_PARTIES, CO_INACTIVE_PARTIES } from "@/store/modules/club_owner/parties";
export default {
  components: {
    CheckInvoiceData,
    YearFinances,
    ThisMonthFinances,
    LastMonthFinances,
    TodayParties,
    InactiveParties,
    ActiveParties
  },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(CO_INACTIVE_PARTIES);
      this.$store.dispatch(CO_ACTIVE_PARTIES);
    });
  }
};
</script>
