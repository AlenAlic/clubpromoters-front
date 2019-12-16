import { ORGANIZER } from "@/constants";

const DefaultWrapper = () => import("@/components/general/DefaultWrapper.vue");
const Dashboard = () => import("@/pages/organizer/Dashboard.vue");
const Codes = () => import("@/pages/organizer/Codes.vue");
const ClubOwnerAccounts = () => import("@/pages/organizer/ClubOwnerAccounts.vue");
const PromoterAccounts = () => import("@/pages/organizer/PromoterAccounts.vue");
const CreateNewParty = () => import("@/pages/organizer/CreateNewParty.vue");
const InactiveParties = () => import("@/pages/organizer/InactiveParties.vue");
const ActiveParties = () => import("@/pages/organizer/ActiveParties.vue");
const PastParties = () => import("@/pages/organizer/PastParties.vue");
const Income = () => import("@/pages/organizer/Income.vue");
const Refunds = () => import("@/pages/organizer/Refunds.vue");
const Commissions = () => import("@/pages/organizer/Commissions.vue");

const organizerPages = {
  path: "/organizer",
  component: DefaultWrapper,
  meta: {
    auth: true,
    access: ORGANIZER
  },
  children: [
    {
      path: "dashboard",
      name: "organizer.dashboard",
      component: Dashboard
    },
    {
      path: "club_owner_accounts",
      component: ClubOwnerAccounts,
      name: "organizer.club_owner_accounts"
    },
    {
      path: "promoter_accounts",
      component: PromoterAccounts,
      name: "organizer.promoter_accounts"
    },
    {
      path: "codes",
      component: Codes,
      name: "organizer.codes"
    },
    {
      path: "create_new_party",
      component: CreateNewParty,
      name: "organizer.create_new_party"
    },
    {
      path: "inactive_parties",
      component: InactiveParties,
      name: "organizer.inactive_parties"
    },
    {
      path: "active_parties",
      component: ActiveParties,
      name: "organizer.active_parties"
    },
    {
      path: "past_parties",
      component: PastParties,
      name: "organizer.past_parties"
    },
    {
      path: "party_income",
      component: Income,
      name: "organizer.party_income"
    },
    {
      path: "refunds",
      component: Refunds,
      name: "organizer.refunds"
    },
    {
      path: "commissions",
      component: Commissions,
      name: "organizer.commissions"
    }
  ]
};
export default organizerPages;
