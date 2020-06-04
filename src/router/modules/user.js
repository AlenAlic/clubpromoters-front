const Profile = () => import("@/pages/user/Profile");
const Security = () => import("@/pages/user/Security");

const userRoutes = [
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      auth: true
    }
  },
  {
    path: "/security",
    name: "security",
    component: Security,
    meta: {
      auth: true
    }
  }
];

export default userRoutes;
