import i18n from "@/languages";
import { ADMIN, CLUB_OWNER, ORGANIZER, PROMOTER } from "@/constants";

export const admin_drawer_content = [
  { to: "admin.dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" },
  { divider: true },
  {
    to: "admin.setup",
    title: i18n.t("menu.admin.setup"),
    icon: "mdi-atom"
  },
  {
    to: "admin.test_data",
    title: i18n.t("menu.admin.test_data"),
    icon: "mdi-flask-empty-outline"
  }
];

export const organizer_drawer_content = [
  { to: "organizer.dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" },
  { divider: true },
  { title: i18n.t("menu.organizer.subheader.user_accounts") },
  {
    to: "organizer.club_owner_accounts",
    title: i18n.t("menu.organizer.club_owner_accounts"),
    icon: "mdi-folder-account"
  },
  {
    to: "organizer.promoter_accounts",
    title: i18n.t("menu.organizer.promoter_accounts"),
    icon: "mdi-account"
  },
  { divider: true },
  // { title: i18n.t("menu.organizer.subheader.codes") },
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
  { title: i18n.t("menu.organizer.subheader.finances") },
  {
    to: "organizer.party_income",
    title: i18n.t("menu.organizer.party_income"),
    icon: "mdi-calendar-outline"
  },
  {
    to: "organizer.refunds",
    title: i18n.t("menu.organizer.refunds"),
    icon: "mdi-calendar-outline"
  },
  {
    to: "organizer.commissions",
    title: i18n.t("menu.organizer.commissions"),
    icon: "mdi-calendar-outline"
  }
];

export const club_owner_drawer_content = [
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
    to: "club_owner.active_parties",
    title: i18n.t("menu.club_owner.active_parties"),
    icon: "mdi-calendar-outline"
  },
  {
    to: "club_owner.inactive_parties",
    title: i18n.t("menu.club_owner.inactive_parties"),
    icon: "mdi-calendar-remove-outline"
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
    title: i18n.t("menu.club_owner.party_income"),
    icon: "mdi-calendar-outline"
  }
];

export const promoter_drawer_content = [
  {
    to: "promoter.code",
    title: i18n.t("menu.promoter.code"),
    icon: "mdi-qrcode"
  },
  {
    to: "promoter.finances",
    title: i18n.t("menu.promoter.finances"),
    icon: "mdi-account-cash"
  }
];

export const drawerContent = {
  [ADMIN]: admin_drawer_content,
  [ORGANIZER]: organizer_drawer_content,
  [CLUB_OWNER]: club_owner_drawer_content,
  [PROMOTER]: promoter_drawer_content
};
