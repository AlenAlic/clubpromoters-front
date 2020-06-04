const PurchaseWrapper = () => import("@/pages/purchase/PurchaseWrapper.vue");
const DummyPage = () => import("@/pages/Dummy.vue");
const Index = () => import("@/pages/purchase/Index.vue");
const Order = () => import("@/pages/purchase/Order.vue");
const Completed = () => import("@/pages/purchase/Completed.vue");
const Failed = () => import("@/pages/purchase/Failed.vue");

const purchasePages = {
  path: "/purchase",
  component: PurchaseWrapper,
  redirect: { name: "purchase.index" },
  children: [
    {
      path: "index",
      name: "purchase.index",
      component: Index
    },
    {
      path: "order/:id/:tickets",
      name: "purchase.order",
      component: Order
    },
    {
      path: "completed/:hash",
      component: Completed,
      name: "purchase.completed"
    },
    {
      path: "failed",
      component: Failed,
      name: "purchase.failed"
    },
    {
      path: "qr_code/:hash",
      component: DummyPage,
      name: "purchase.qr_code"
    }
  ]
};
export default purchasePages;
