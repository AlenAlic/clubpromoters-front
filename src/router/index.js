import Vue from "vue";
import VueRouter from "vue-router";

// Pages
const Home = () => import("@/pages/Home.vue");
const Login = () => import("@/pages/Login.vue");
const Register = () => import("@/pages/Register.vue");
const PageNotFound = () => import("@/pages/PageNotFound.vue");

// Pages modules
import authPages from "@/router/modules/auth";
import userRoutes from "@/router/modules/user";
import organizerPages from "@/router/modules/organizer";
import adminPages from "@/router/modules/admin";
import purchasePages from "@/router/modules/purchase";
import hostessPages from "@/router/modules/hostess";
import clubOwnerPages from "@/router/modules/club_owner";
import promoterPages from "@/router/modules/promoter";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index.html",
    alias: "/",
    component: Home
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  ...authPages,
  ...userRoutes,
  adminPages,
  organizerPages,
  purchasePages,
  clubOwnerPages,
  hostessPages,
  promoterPages,
  {
    path: "**",
    name: "PageNotFound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  linkExactActiveClass: "primary",
  routes
});

/**
 * Handle routes that need authentication
 */
router.beforeEach((to, from, next) => {
  if (!Vue.prototype.$auth.isAuthenticated) {
    if (to.matched.filter(r => r.meta.auth).length > 0) {
      next({
        name: "home",
        query: {
          redirect: to.path
        }
      });
      return;
    }
  } else {
    if (
      [
        "dashboard",
        "home",
        "login",
        "register",
        "activate",
        "reset",
        "reset.token",
        "purchase.index",
        "purchase.order",
        "purchase.completed",
        "purchase.failed",
        "purchase.qr_code"
      ].includes(to.name) ||
      (to.name && to.fullPath === "/")
    ) {
      if (Vue.prototype.$auth.isAdmin) {
        next({ name: "admin.dashboard" });
      }
      if (Vue.prototype.$auth.isOrganizer) {
        next({ name: "organizer.dashboard" });
      }
      if (Vue.prototype.$auth.isClubOwner) {
        next({ name: "club_owner.dashboard" });
      }
      if (Vue.prototype.$auth.isHostess) {
        next({ name: "hostess.dashboard" });
      }
      if (Vue.prototype.$auth.isPromoter) {
        next({ name: "promoter.code" });
      }
      return;
    } else {
      if (Vue.prototype.$auth.isPromoter && !Vue.prototype.$auth.hasAcceptedTerms && to.name !== "promoter.terms") {
        next({ name: "promoter.terms" });
      }
      if (
        to.matched.filter(r => r.meta.access !== undefined && r.meta.access !== Vue.prototype.$auth.access).length > 0
      ) {
        next({ name: "home" });
        return;
      }
    }
  }
  next();
});

/**
 * Disable debug routes on production
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.debugRoute)) {
    if (!Vue.prototype.$config.debug) {
      next({ name: "home" });
    }
  }
  next();
});

export default router;
