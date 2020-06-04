<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.inactive_parties.title") }}
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
      :loading="$store.state.users.loading"
      :headers="headers"
      :items="items"
      :search="search"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
      show-expand
      :expanded.sync="expanded"
      item-key="id"
      single-expand
    >
      <template v-slot:item.ticket_price="{ item }">
        <div>{{ $util.formatCurrency(item.ticket_price) }}</div>
      </template>
      <template v-slot:item.start_date="{ item }">
        <div>{{ $util.dateTime(item.start_date).toFormat("d LLLL") }}</div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="showModalFunc(item)">
              mdi-play-circle
            </v-icon>
          </template>
          <span>{{ $t("organizer.inactive_parties.activate") }}</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="showEditModalFunc(item)">
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t("general.edit") }}</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="showDataModalFunc(item)">
              mdi-magnify
            </v-icon>
          </template>
          <span>{{ $t("organizer.active_parties.view") }}</span>
        </v-tooltip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td colspan="2">
          {{ `${$t("organizer.inactive_parties.table.club_owner_commission")}: ${item.club_owner_commission}%` }}
        </td>
        <td colspan="4">
          {{ `${$t("organizer.inactive_parties.table.promoter_commission")}: ${item.promoter_commission}%` }}
        </td>
      </template>
    </v-data-table>
    <modal
      :show="showModal"
      :id="id"
      @closeModal="hideModalFunc"
      :title="$t('organizer.inactive_parties.modal.title', { party: party ? party.name : '' })"
      :text="$t('organizer.inactive_parties.modal.text')"
      :yes="$t('organizer.inactive_parties.modal.yes')"
      :no="$t('organizer.inactive_parties.modal.no')"
    ></modal>
    <modal
      :show="showEditModal"
      :id="id"
      @closeModal="hideEditModalFunc"
      title="Edit party"
      text="Todo"
      yes="OK"
      no="CANCEL"
    >
      <edit-party-card :party="party" @close="showEditModal = false" />
    </modal>
    <modal :show="showDataModal" @closeModal="hideDataModalFunc">
      <party-finances-data-card
        v-if="party"
        :party="party"
        @closeModal="hideDataModalFunc"
        organiser
      ></party-finances-data-card>
    </modal>
  </v-card>
</template>

<script>
// TODO => Edit party
import Vue from "vue";
import i18n from "@/languages";
import Modal from "@/components/general/Modal";
import store from "@/store";
import PartyFinancesDataCard from "@/components/organizer/past_parties/PartyFinancesDataCard";
import { ACTIVE_PARTIES, INACTIVE_PARTIES } from "@/store/modules/organizer/parties";
import EditPartyCard from "@/components/organizer/inactive_parties/EditPartyCard";
export default {
  components: { EditPartyCard, Modal, PartyFinancesDataCard },
  data: function() {
    return {
      dialog: false,
      showModal: false,
      showDataModal: false,
      id: -1,
      party: null,
      showEditModal: false,
      expanded: [],
      search: "",
      headers: [
        {
          text: i18n.t("organizer.inactive_parties.table.headers.club"),
          value: "club"
        },
        {
          text: i18n.t("organizer.active_parties.table.headers.name"),
          value: "name"
        },
        {
          text: i18n.t("organizer.inactive_parties.table.headers.location"),
          value: "location.name"
        },
        {
          text: i18n.t("organizer.inactive_parties.table.headers.start_date"),
          value: "start_date"
        },
        {
          text: i18n.t("organizer.inactive_parties.table.headers.duration"),
          value: "duration"
        },
        {
          text: i18n.t("organizer.inactive_parties.table.headers.num_available_tickets"),
          value: "num_available_tickets"
        },
        {
          text: i18n.t("organizer.inactive_parties.table.headers.ticket_price"),
          value: "ticket_price"
        },
        { value: "action", align: "right" },
        { text: "", value: "data-table-expand" }
      ],
      preview: {}
    };
  },
  computed: {
    items() {
      return this.$store.state.parties.inactiveParties.map(p =>
        Object.assign(p, {
          duration: `${this.$util.dateTime(p.start_date).toFormat("HH:mm")} - ${this.$util
            .dateTime(p.end_date)
            .toFormat("HH:mm")}`
        })
      );
    }
  },
  methods: {
    setData(item) {
      this.id = item.id;
      this.party = item;
    },
    cleanUp() {
      this.showEditModal = false;
      this.showModal = false;
      this.id = -1;
      this.party = null;
    },
    showModalFunc(item) {
      this.showModal = true;
      this.setData(item);
    },
    hideModalFunc(data) {
      if (data.agree) this.activateParty();
      this.cleanUp();
    },
    showDataModalFunc: function(item) {
      this.showDataModal = true;
      this.party = item;
    },
    hideDataModalFunc: function() {
      this.showDataModal = false;
    },
    activateParty() {
      return Vue.axios.patch(`organizer/activate_party/${this.id}`).then(() => {
        store.dispatch(ACTIVE_PARTIES);
        store.dispatch(INACTIVE_PARTIES);
      });
    },
    showEditModalFunc(item) {
      this.showEditModal = true;
      this.setData(item);
    },
    hideEditModalFunc() {
      this.cleanUp();
    },
    getPreviewObject(o) {
      this.preview = o;
    }
  }
};
</script>

<style scoped></style>
