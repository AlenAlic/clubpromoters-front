const Profile = () => import("@/pages/Profile.vue");

const userRoutes = {
  path: "/profile",
  name: "profile",
  component: Profile,
  meta: {
    auth: true
  }
};
export default userRoutes;
