import { HOSTESS } from "@/constants";

const DefaultWrapper = () => import("@/components/general/DefaultWrapper.vue");
const Dashboard = () => import("@/pages/hostess/Dashboard.vue");
const Party = () => import("@/pages/hostess/Party.vue");

const hostessPages = {
  path: "/hostess",
  component: DefaultWrapper,
  redirect: { name: "hostess.dashboard" },
  meta: {
    auth: true,
    access: HOSTESS
  },
  children: [
    {
      path: "dashboard",
      name: "hostess.dashboard",
      component: Dashboard
    },
    {
      path: "party/:id",
      component: Party,
      name: "hostess.party"
    }
  ]
};
export default hostessPages;
