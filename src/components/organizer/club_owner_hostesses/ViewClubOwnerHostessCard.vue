<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.club_owner_hostesses.title") }}
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
            {{ $t("organizer.club_owner_hostesses.add_new_hostess") }}
          </v-btn>
        </template>
        <create-new-club-owner-hostess-card
          @close="dialog = false"
          :club-owner="clubOwner"
          @added="hostessAdded"
        ></create-new-club-owner-hostess-card>
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
      <template v-slot:item.is_active="{ item }">
        <span>{{ item.working ? "Yes" : "No" }}</span>
      </template>

      <template v-slot:item.working="{ item }">
        <span>{{ item.working ? "Yes" : "No" }}</span>
      </template>

      <template v-slot:header.working>
        <span>
          Working
          <v-tooltip top max-width="250">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                mdi-information
              </v-icon>
            </template>
            <span>{{ $t("club_owner.hostesses.working") }}</span>
          </v-tooltip>
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { ORGANIZER } from "@/constants";
import i18n from "@/languages";
import CreateNewClubOwnerHostessCard from "@/components/organizer/club_owner_hostesses/CreateNewClubOwnerHostessCard";
export default {
  components: { CreateNewClubOwnerHostessCard },
  data: function() {
    return {
      dialog: false,
      showModal: false,
      clubOwner: null,
      headers: [
        {
          text: i18n.t("organizer.club_owner_hostesses.table.headers.name"),
          value: "name"
        },
        {
          text: i18n.t("organizer.club_owner_hostesses.table.headers.email"),
          value: "email"
        },
        {
          text: i18n.t("organizer.club_owner_hostesses.table.headers.is_active"),
          value: "is_active"
        },
        {
          text: i18n.t("organizer.club_owner_hostesses.table.headers.working"),
          value: "working"
        }
      ]
    };
  },
  computed: {
    showClubOwner() {
      return this.$store.getters.access === ORGANIZER;
    },
    items() {
      return this.clubOwner ? this.clubOwner.hostesses : [];
    },
    clubOwners() {
      return this.$store.state.users.clubOwners.filter(c => c.is_active);
    }
  },
  methods: {
    hostessAdded() {
      this.clubOwner = this.$store.getters.getClubOwner(this.clubOwner.id);
    }
  }
};
</script>
