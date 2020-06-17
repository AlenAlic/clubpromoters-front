<template>
  <div style="width: 100%;">
    <v-app-bar dark app prominent shrink-on-scroll fade-img-on-scroll color="black" :src="logo">
      <v-btn icon>
        <v-img style="width: 48px; height: 48px;" :src="tiger" contain></v-img>
      </v-btn>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" contain></v-img>
      </template>
      <v-toolbar-title style="width: 100%;">
        <v-select
          v-model="selectedDays"
          color="white"
          hide-details
          dense
          placeholder="Choose day"
          :items="days"
          multiple
          chips
          small-chips
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 2" small>
              <span>{{ item.text }}</span>
            </v-chip>
            <v-chip v-if="index === 2" small class="caption">
              <span>...</span>
            </v-chip>
          </template>
        </v-select>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon :to="{ name: 'login' }">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row justify="center" no-gutters v-for="date in Object.keys(sortedParties)" :key="date">
      <template v-for="(party, index) in sortedParties[date]">
        <v-col
          cols="12"
          class="headline white--text text-center my-5"
          :style="{ visibility: index > 0 ? 'hidden' : 'visible' }"
          :key="`title-${party.id}`"
        >
          {{ getDisplayDateFromISO(date) }}
        </v-col>
        <v-col cols="12" :key="`party-${party.id}`">
          <party-card :party="party" />
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
import store from "@/store";
import PartyCard from "@/components/general/party_card/PartyCard";
import { DateTime } from "luxon";
import tiger from "@/assets/images/logo_tiger_black.svg";
import logo from "@/assets/images/logo_black.svg";
export default {
  components: { PartyCard },
  data: function() {
    return {
      selectedDays: []
    };
  },
  computed: {
    tiger() {
      return tiger;
    },
    logo() {
      return logo;
    },
    parties() {
      const parties = [...store.state.parties.activeParties];
      if (this.selectedDays.length) {
        const dates = this.selectedDays;
        dates.sort();
        const filterStart = DateTime.fromISO(this.selectedDays[0].toISO()).startOf("day");
        const filterEnd = DateTime.fromISO(this.selectedDays[this.selectedDays.length - 1].toISO()).endOf("day");
        return parties.filter(p => {
          let startDate = this.$util.dateTimeFromUTCString(p.start_date);
          return filterStart <= startDate && filterEnd >= startDate;
        });
      }
      return parties;
    },
    sortedParties() {
      let dates = new Set(
        this.parties.map(p =>
          this.$util
            .dateTimeFromUTCString(p.start_date)
            .startOf("day")
            .toISO()
        )
      );
      dates = Array.from(dates);
      if (!dates.length) return {};
      const parties = Object.assign(...dates.map(k => ({ [k]: [] })));
      this.parties.forEach(p => {
        const date = this.$util
          .dateTimeFromUTCString(p.start_date)
          .startOf("day")
          .toISO();
        parties[date].push(p);
      });
      return parties;
    },
    days() {
      const today = this.$util.now;
      const tomorrow = today.plus({ days: 1 });
      let days = [
        { text: "Today", value: today },
        { text: "Tomorrow", value: tomorrow }
      ];
      for (let i = 1; i <= 5; i++) {
        const day = tomorrow.plus({ days: i });
        days.push({ text: day.toFormat("cccc"), value: day });
      }
      return days;
    }
  },
  methods: {
    getDisplayDateFromISO(ISOdate) {
      const date = DateTime.fromISO(ISOdate);
      const today = this.$util.now;
      if (date.startOf("day").toISO() === today.startOf("day").toISO()) return "Today";
      const tomorrow = today.plus({ days: 1 });
      if (date.startOf("day").toISO() === tomorrow.startOf("day").toISO()) return "Tomorrow";
      if (this.selectedDays.length) return date.toFormat("cccc");
      return date.toFormat("dd LLLL");
    }
  }
};
</script>
