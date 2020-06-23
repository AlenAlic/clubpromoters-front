import { CLUB_OWNER } from "@/constants";

const DefaultWrapper = () => import("@/components/wrappers/DefaultWrapper.vue");
const Dashboard = () => import("@/pages/club_owner/Dashboard.vue");
const Hostesses = () => import("@/pages/club_owner/Hostesses.vue");
const InactiveParties = () => import("@/pages/club_owner/InactiveParties.vue");
const ActiveParties = () => import("@/pages/club_owner/ActiveParties.vue");
const PastParties = () => import("@/pages/club_owner/PastParties.vue");
const PartyIncome = () => import("@/pages/club_owner/PartyIncome.vue");
const Invoices = () => import("@/pages/club_owner/Invoices.vue");

const clubOwnerPages = {
  path: "/club_owner",
  component: DefaultWrapper,
  redirect: { name: "club_owner.dashboard" },
  meta: {
    auth: true,
    access: CLUB_OWNER
  },
  children: [
    {
      path: "dashboard",
      name: "club_owner.dashboard",
      component: Dashboard
    },
    {
      path: "hostesses",
      component: Hostesses,
      name: "club_owner.hostesses"
    },
    {
      path: "active_parties",
      component: ActiveParties,
      name: "club_owner.active_parties"
    },
    {
      path: "inactive_parties",
      component: InactiveParties,
      name: "club_owner.inactive_parties"
    },
    {
      path: "past_parties",
      component: PastParties,
      name: "club_owner.past_parties"
    },
    {
      path: "party_income",
      component: PartyIncome,
      name: "club_owner.party_income"
    },
    {
      path: "invoices",
      component: Invoices,
      name: "club_owner.invoices"
    }
  ]
};
export default clubOwnerPages;
