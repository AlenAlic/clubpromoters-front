<template>
  <v-card>
    <v-card-title>
      {{ $t("organizer.club_owner_accounts.title") }}
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
            {{ $t("organizer.club_owner_accounts.new_account") }}
          </v-btn>
        </template>
        <create-new-club-owner-account-card
          @close="dialog = false"
        ></create-new-club-owner-account-card>
      </v-dialog>
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
    >
      <template v-slot:item.is_active="{ item }">
        <div>{{ item.is_active ? "Yes" : "No" }}</div>
      </template>
      <template v-slot:item.commission="{ item }">
        <v-edit-dialog :return-value.sync="item.commission" large persistent @save="save(item)">
          <div>{{ `${item.commission}%` }}</div>
          <template v-slot:input>
            <v-text-field
              v-model="item.commission"
              :rules="[$form.commissionPositive, $form.commissionMax]"
              :label="$t('organizer.club_owner_accounts.commission')"
              autofocus
              single-line
              suffix="%"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Vue from "vue";
import i18n from "@/languages";
import CreateNewClubOwnerAccountCard from "@/components/organizer/club_owner_accounts/CreateNewClubOwnerAccountCard";
import store from "@/store";
import { USERS } from "@/store/modules/organizer/users";
export default {
  components: { CreateNewClubOwnerAccountCard },
  data: function() {
    return {
      dialog: false,
      showModal: false,
      account: {},
      search: "",
      headers: [
        {
          text: i18n.t("organizer.club_owner_accounts.table.headers.club"),
          value: "club"
        },
        {
          text: i18n.t("organizer.club_owner_accounts.table.headers.active"),
          value: "is_active"
        },
        {
          text: i18n.t("organizer.club_owner_accounts.table.headers.email"),
          value: "email"
        },
        {
          text: i18n.t("organizer.club_owner_accounts.table.headers.commission"),
          value: "commission"
        }
      ]
    };
  },
  computed: {
    items() {
      return this.$store.state.users.clubOwners;
    }
  },
  methods: {
    save(account) {
      return Vue.axios
        .patch("organizer/update_user_commission", {
          user_id: account.id,
          commission: account.commission
        })
        .then(() => {
          store.dispatch(USERS);
        });
    }
  }
};
</script>
