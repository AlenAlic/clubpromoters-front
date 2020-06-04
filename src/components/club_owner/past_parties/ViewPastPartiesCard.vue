<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.past_parties.title") }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="$store.state.club_owner_parties.loadingPastParties"
      :headers="headers"
      :items="items"
      :search="search"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
    >
      <template v-slot:item.ticket_price="{ item }">
        <div>{{ $util.formatCurrency(item.ticket_price) }}</div>
      </template>
      <template v-slot:item.start_date="{ item }">
        <div>{{ $util.dateTime(item.start_date).toFormat("d LLLL") }}</div>
      </template>
      <template v-slot:item.party_profit="{ item }">
        <div>{{ $util.formatCurrency(item.party_profit) }}</div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="showModalFunc(item)">
              mdi-card-search
            </v-icon>
          </template>
          <span>{{ $t("organizer.past_parties.view") }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <modal :show="showModal" @closeModal="hideModalFunc">
      <party-finances-data-card :party="party" @closeModal="hideModalFunc" club_owner></party-finances-data-card>
    </modal>
  </v-card>
</template>

<script>
// TODO => Viw party stats
import i18n from "@/languages";
import Modal from "@/components/modal/Modal";
import PartyFinancesDataCard from "@/components/organizer/past_parties/PartyFinancesDataCard";
export default {
  components: { PartyFinancesDataCard, Modal },
  data: function() {
    return {
      dialog: false,
      showModal: false,
      party: null,
      search: "",
      headers: [
        {
          text: i18n.t("organizer.past_parties.table.headers.club"),
          value: "club"
        },
        {
          text: i18n.t("organizer.past_parties.table.headers.name"),
          value: "name"
        },
        {
          text: i18n.t("organizer.past_parties.table.headers.start_date"),
          value: "start_date"
        },
        {
          text: i18n.t("organizer.past_parties.table.headers.duration"),
          value: "duration"
        },
        {
          text: i18n.t("organizer.past_parties.table.headers.party_profit"),
          value: "party_profit"
        },
        {
          value: "action",
          align: "right"
        }
      ]
    };
  },
  computed: {
    items() {
      return this.$store.state.club_owner_parties.pastParties.map(p =>
        Object.assign(p, {
          duration: `${this.$util.dateTime(p.start_date).toFormat("HH:mm")} - ${this.$util
            .dateTime(p.end_date)
            .toFormat("HH:mm")}`,
          club_owner_commission: `${this.$t("organizer.active_parties.table.club_owner_commission")}: ${
            p.club_owner_commission
          }%`,
          promoter_commission: `${this.$t("organizer.active_parties.table.promoter_commission")}: ${
            p.promoter_commission
          }%`
        })
      );
    }
  },
  methods: {
    showModalFunc: function(item) {
      this.showModal = true;
      this.party = item;
    },
    hideModalFunc: function() {
      this.showModal = false;
      this.party = {};
    }
  }
};
</script>

<style scoped></style>
