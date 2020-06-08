<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.club_owner_locations.title") }}
      <v-spacer></v-spacer>
      <v-select
        v-if="showClubOwner"
        v-model="clubOwner"
        :items="clubOwners"
        persistent-hint
        :hint="$t('organizer.club_owner_locations.user.hint')"
        :disabled="$store.state.users.loading"
        :loading="$store.state.users.loading"
        item-text="club"
        item-value="id"
        return-object
      />
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on" :dark="!!clubOwner" :disabled="!clubOwner">
            {{ $t("organizer.club_owner_locations.add_new_location") }}
          </v-btn>
        </template>
        <create-new-club-owner-location-card
          @close="dialog = false"
          :club-owner="clubOwner"
          @added="locationAdded"
        ></create-new-club-owner-location-card>
      </v-dialog>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
    >
      <template v-slot:item.address="{ item }">
        <span>{{ `${item.street} ${item.street_number}${item.street_number_addition}` }}</span>
      </template>
      <template v-slot:item.postal="{ item }">
        <span>{{ `${item.postal_code} ${item.postal_code_letters}` }}</span>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="showEditModalFunc(item)">
              mdi-pencil
            </v-icon>
          </template>
          <span>{{ $t("general.edit") }}</span>
        </v-tooltip>
        <modal v-if="showEditModal" :show="showEditModal">
          <create-new-club-owner-location-card
            @close="showEditModal = false"
            :club-owner="clubOwner"
            :loc="item"
            @added="locationAdded"
          ></create-new-club-owner-location-card>
        </modal>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { ORGANIZER } from "@/constants";
import i18n from "@/languages";
import CreateNewClubOwnerLocationCard from "@/components/organizer/club_owner_locations/CreateNewClubOwnerLocationCard";
import Modal from "@/components/modal/Modal";
export default {
  components: { Modal, CreateNewClubOwnerLocationCard },
  data: function() {
    return {
      dialog: false,
      showModal: false,
      clubOwner: null,
      headers: [
        {
          text: i18n.t("organizer.club_owner_locations.table.headers.name"),
          value: "name"
        },
        {
          text: i18n.t("organizer.club_owner_locations.table.headers.address"),
          value: "address"
        },
        {
          text: i18n.t("organizer.club_owner_locations.table.headers.postal"),
          value: "postal"
        },
        {
          text: i18n.t("organizer.club_owner_locations.table.headers.city"),
          value: "city"
        },
        { value: "action", align: "right" }
      ],
      showEditModal: false
    };
  },
  computed: {
    showClubOwner() {
      return this.$store.getters.access === ORGANIZER;
    },
    items() {
      return this.clubOwner ? this.clubOwner.locations : [];
    },
    clubOwners() {
      return this.$store.state.users.clubOwners.filter(c => c.is_active);
    }
  },
  methods: {
    locationAdded() {
      this.clubOwner = this.$store.getters.getClubOwner(this.clubOwner.id);
    },
    showEditModalFunc() {
      this.showEditModal = true;
    }
  }
};
</script>
