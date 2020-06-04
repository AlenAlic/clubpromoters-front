const CenterWrapper = () => import("@/components/wrappers/CenterWrapper");
const ActivateAccount = () => import("../../components/auth/ActivateAccount");
const RequestNewPassword = () => import("../../components/auth/RequestNewPassword");
const SetNewPassword = () => import("../../components/auth/SetNewPassword");

const authRoutes = [
  {
    path: "/activate/:token",
    component: ActivateAccount,
    name: "activate"
  },
  {
    path: "/password",
    component: CenterWrapper,
    redirect: { name: "reset" },
    children: [
      {
        path: "reset",
        component: RequestNewPassword,
        name: "reset"
      },
      {
        path: "reset/:token",
        component: SetNewPassword,
        name: "reset.token"
      }
    ]
  }
];
export default authRoutes;
