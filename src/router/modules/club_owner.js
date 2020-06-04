import { CLUB_OWNER } from "@/constants";

const DefaultWrapper = () => import("@/components/wrappers/DefaultWrapper.vue");
const DummyPage = () => import("@/pages/Dummy.vue");
const Hostesses = () => import("@/pages/club_owner/Hostesses.vue");
const PastParties = () => import("@/pages/club_owner/PastParties.vue");
const Income = () => import("@/pages/club_owner/Income.vue");

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
      component: DummyPage
    },
    {
      path: "hostesses",
      component: Hostesses,
      name: "club_owner.hostesses"
    },
    {
      path: "active_parties",
      component: DummyPage,
      name: "club_owner.active_parties"
    },
    {
      path: "inactive_parties",
      component: DummyPage,
      name: "club_owner.inactive_parties"
    },
    {
      path: "past_parties",
      component: PastParties,
      name: "club_owner.past_parties"
    },
    {
      path: "party_income",
      component: Income,
      name: "club_owner.party_income"
    }
  ]
};
export default clubOwnerPages;
