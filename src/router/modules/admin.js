import { ADMIN } from "@/constants";

const DefaultWrapper = () => import("@/components/general/DefaultWrapper.vue");
const DummyPage = () => import("@/pages/Dummy.vue");
const Dashboard = () => import("@/pages/admin/Dashboard.vue");
const Setup = () => import("@/pages/admin/Setup.vue");

const adminPages = {
  path: "/admin",
  component: DefaultWrapper,
  meta: {
    auth: true,
    access: ADMIN
  },
  children: [
    {
      path: "dashboard",
      name: "admin.dashboard",
      component: Dashboard
    },
    {
      path: "setup",
      component: Setup,
      name: "admin.setup"
    },
    {
      path: "test_data",
      component: DummyPage,
      name: "admin.test_data"
    }
  ]
};
export default adminPages;
