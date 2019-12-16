import { PROMOTER } from "@/constants";

const DefaultWrapper = () => import("@/components/general/DefaultWrapper.vue");
const DummyPage = () => import("@/pages/Dummy.vue");
const Code = () => import("@/pages/promoter/Code.vue");

const promoterPages = {
  path: "/promoter",
  component: DefaultWrapper,
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
      component: DummyPage,
      name: "promoter.finances"
    }
  ]
};
export default promoterPages;
