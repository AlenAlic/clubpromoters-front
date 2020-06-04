import { ADMIN } from "@/constants";

const DefaultWrapper = () => import("@/components/general/DefaultWrapper.vue");
const Dashboard = () => import("@/pages/admin/Dashboard.vue");

const adminPages = {
  path: "/admin",
  component: DefaultWrapper,
  redirect: { name: "admin.dashboard" },
  meta: {
    auth: true,
    access: ADMIN
  },
  children: [
    {
      path: "dashboard",
      name: "admin.dashboard",
      component: Dashboard
    }
  ]
};
export default adminPages;
