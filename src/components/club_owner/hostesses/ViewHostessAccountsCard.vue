<template>
  <v-card>
    <v-card-title>
      {{ $t("club_owner.hostesses.title") }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('general.search')"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            {{ $t("club_owner.hostesses.new_account") }}
          </v-btn>
        </template>
        <create-new-hostess-account-card @close="dialog = false"></create-new-hostess-account-card>
      </v-dialog>
    </v-card-title>
    <v-data-table
      :loading="$store.state.hostesses.loading"
      :headers="headers"
      :items="items"
      :search="search"
      :footer-props="{
        'items-per-page-text': $t('vuetify.data-footer.items-per-page-text'),
        'items-per-page-all-text': $t('vuetify.data-footer.items-per-page-all-text')
      }"
    >
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon class="mr-2" v-on="on" @click="activateHostess(item)">
              {{ item.working ? "mdi-stop" : "mdi-play-circle" }}
            </v-icon>
          </template>
          <span v-if="item.working">{{ $t("club_owner.hostesses.deactivate") }}</span>
          <span v-else>{{ $t("club_owner.hostesses.activate") }}</span>
        </v-tooltip>
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
// TODO => (De)activate
import Vue from "vue";
import i18n from "@/languages";
import CreateNewHostessAccountCard from "@/components/club_owner/hostesses/CreateNewHostessAccountCard";
import store from "@/store";
import { HOSTESSES } from "@/store/modules/club_owner/hostesses";
export default {
  components: { CreateNewHostessAccountCard },
  data: function() {
    return {
      dialog: false,
      showModal: false,
      search: "",
      headers: [
        {
          text: i18n.t("club_owner.hostesses.table.headers.hostess"),
          value: "hostess"
        },
        {
          text: i18n.t("club_owner.hostesses.table.headers.email"),
          value: "email"
        },
        {
          text: i18n.t("club_owner.hostesses.table.headers.is_active"),
          value: "is_active"
        },
        {
          text: i18n.t("club_owner.hostesses.table.headers.working"),
          value: "working"
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
      return this.$store.state.hostesses.hostesses.map(u => ({
        id: u.id,
        hostess: u.name,
        email: u.email,
        is_active: u.is_active ? "Yes" : "No",
        working: u.working
      }));
    }
  },
  methods: {
    showModalFunc() {
      this.showModal = true;
    },
    activateHostess(hostess) {
      return Vue.axios.patch(`club_owner/activate_hostess/${hostess.id}`, { working: !hostess.working }).then(() => {
        store.dispatch(HOSTESSES);
      });
    }
  }
};
</script>

<style scoped></style>
