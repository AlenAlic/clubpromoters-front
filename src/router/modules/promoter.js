import { PROMOTER } from "@/constants";

const DefaultWrapper = () => import("@/components/wrappers/DefaultWrapper.vue");
const Code = () => import("@/pages/promoter/Code.vue");
const Income = () => import("@/pages/promoter/Income.vue");

const promoterPages = {
  path: "/promoter",
  component: DefaultWrapper,
  redirect: { name: "promoter.dashboard" },
  meta: {
    auth: true,
    access: PROMOTER
  },
  children: [
    {
      path: "code",
      name: "promoter.code",
      component: Code
    },
    {
      path: "finances",
      component: Income,
      name: "promoter.finances"
    }
  ]
};

export default promoterPages;
