<template>
  <v-navigation-drawer :value="drawer" @input="toggleDrawer" :clipped="breakpoint" :permanent="breakpoint" app>
    <v-list dense>
      <div v-for="(item, index) in items" :key="index">
        <v-list-item v-if="item.to" link :to="{ name: item.to }" active-class="accent" dense>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-else-if="item.divider" />
        <v-subheader v-else class="is-uppercase">{{ item.title }}</v-subheader>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import i18n from "@/languages";

export default {
  props: {
    breakpoint: { type: Boolean, default: false },
    drawer: { type: Boolean, default: null }
  },
  model: {
    prop: "drawer",
    event: "input"
  },
  methods: {
    toggleDrawer(flag) {
      this.$emit("input", flag);
    }
  },
  computed: {
    items() {
      if (this.$auth.isAdmin)
        return [{ to: "admin.dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" }];
      if (this.$auth.isOrganizer)
        return [
          { to: "organizer.dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" },
          { divider: true },
          { title: i18n.t("menu.organizer.subheader.organizers") },
          {
            to: "organizer.club_owner_accounts",
            title: i18n.t("menu.organizer.club_owner_accounts"),
            icon: "mdi-folder-account"
          },
          {
            to: "organizer.club_owner_locations",
            title: i18n.t("menu.organizer.club_owner_locations"),
            icon: "mdi-map-marker"
          },
          {
            to: "organizer.upload_assets",
            title: i18n.t("menu.organizer.upload_assets"),
            icon: "mdi-image"
          },
          {
            to: "organizer.hostesses",
            title: i18n.t("menu.organizer.hostesses"),
            icon: "mdi-human-female"
          },
          { divider: true },
          { title: i18n.t("menu.organizer.subheader.promoters") },
          {
            to: "organizer.promoter_accounts",
            title: i18n.t("menu.organizer.promoter_accounts"),
            icon: "mdi-account"
          },
          {
            to: "organizer.codes",
            title: i18n.t("menu.organizer.codes"),
            icon: "mdi-format-list-numbered"
          },
          { divider: true },
          { title: i18n.t("menu.organizer.subheader.parties") },
          {
            to: "organizer.create_new_party",
            title: i18n.t("menu.organizer.create_new_party"),
            icon: "mdi-calendar-outline"
          },
          {
            to: "organizer.inactive_parties",
            title: i18n.t("menu.organizer.inactive_parties"),
            icon: "mdi-calendar-remove-outline"
          },
          {
            to: "organizer.active_parties",
            title: i18n.t("menu.organizer.active_parties"),
            icon: "mdi-calendar-check"
          },
          {
            to: "organizer.past_parties",
            title: i18n.t("menu.organizer.past_parties"),
            icon: "mdi-history"
          },
          { divider: true },
          { title: i18n.t("menu.organizer.subheader.insight") },
          {
            to: "organizer.party_income",
            title: i18n.t("menu.organizer.party_income"),
            icon: "mdi-cash-multiple"
          },
          {
            to: "organizer.commissions",
            title: i18n.t("menu.organizer.commissions"),
            icon: "mdi-cash"
          },
          { divider: true },
          { title: i18n.t("menu.organizer.subheader.finances") },
          {
            to: "organizer.refunds",
            title: i18n.t("menu.organizer.refunds"),
            icon: "mdi-currency-usd-off"
          },
          {
            to: "organizer.payments",
            title: i18n.t("menu.organizer.payments"),
            icon: "mdi-currency-usd"
          },
          {
            to: "organizer.invoices",
            title: i18n.t("menu.organizer.invoices"),
            icon: "mdi-receipt"
          }
        ];
      if (this.$auth.isClubOwner)
        return [
          { to: "club_owner.dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" },
          { divider: true },
          { title: i18n.t("menu.club_owner.subheader.user_accounts") },
          {
            to: "club_owner.hostesses",
            title: i18n.t("menu.club_owner.hostesses"),
            icon: "mdi-human-female"
          },
          { divider: true },
          { title: i18n.t("menu.club_owner.subheader.parties") },
          {
            to: "club_owner.inactive_parties",
            title: i18n.t("menu.club_owner.inactive_parties"),
            icon: "mdi-calendar-remove-outline"
          },
          {
            to: "club_owner.active_parties",
            title: i18n.t("menu.club_owner.active_parties"),
            icon: "mdi-calendar-outline"
          },
          {
            to: "club_owner.past_parties",
            title: i18n.t("menu.club_owner.past_parties"),
            icon: "mdi-calendar-check"
          },
          { divider: true },
          { title: i18n.t("menu.club_owner.subheader.finances") },
          {
            to: "club_owner.party_income",
            title: i18n.t("menu.club_owner.party_commissions"),
            icon: "mdi-calendar-outline"
          },
          {
            to: "club_owner.invoices",
            title: i18n.t("menu.club_owner.invoices"),
            icon: "mdi-receipt"
          }
        ];
      if (this.$auth.isPromoter)
        return [
          {
            to: "promoter.code",
            title: i18n.t("menu.promoter.code"),
            icon: "mdi-qrcode"
          },
          {
            to: "promoter.finances",
            title: i18n.t("menu.promoter.finances"),
            icon: "mdi-account-cash"
          },
          {
            to: "promoter.invoices",
            title: i18n.t("menu.promoter.invoices"),
            icon: "mdi-receipt"
          }
        ];
      return [];
    }
  }
};
</script>
