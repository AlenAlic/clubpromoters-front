<template>
  <v-row>
    <v-col cols="12" md="6" xl="3" class="py-0">
      <v-row>
        <v-col cols="12">
          <active-parties class="" />
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
        <v-col lg="4" xl="12">
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
import ActiveParties from "@/components/organizer/dashboard/ActiveParties";
import InactiveParties from "@/components/organizer/dashboard/InactiveParties";
import TodayParties from "@/components/organizer/dashboard/TodayParties";
import YearFinances from "@/components/organizer/dashboard/YearFinances";
import LastMonthFinances from "@/components/organizer/dashboard/LastMonthFinances";
import ThisMonthFinances from "@/components/organizer/dashboard/ThisMonthFinances";
import { INACTIVE_PARTIES, ACTIVE_PARTIES } from "@/store/modules/organizer/parties";
export default {
  components: { ThisMonthFinances, LastMonthFinances, YearFinances, TodayParties, InactiveParties, ActiveParties },
  created() {
    this.$nextTick(function() {
      this.$store.dispatch(INACTIVE_PARTIES);
      this.$store.dispatch(ACTIVE_PARTIES);
    });
  }
};
</script>
