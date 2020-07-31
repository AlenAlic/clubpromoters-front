import store from "@/store";
import { LOGIN, LOGOUT, RENEW, CHANGE_PASSWORD } from "@/store/modules/auth";
import { authApi } from "@/api/auth";

const AuthHandler = {
  install(Vue) {
    Vue.prototype.$auth = {
      get currentUser() {
        return store.getters.currentUser;
      },
      get access() {
        return store.getters.access;
      },
      get isAuthenticated() {
        return !!this.currentUser;
      },

      get isAdmin() {
        return store.getters.isAdmin;
      },
      get isOrganizer() {
        return store.getters.isOrganizer;
      },
      get isClubOwner() {
        return store.getters.isClubOwner;
      },
      get isHostess() {
        return store.getters.isHostess;
      },
      get isPromoter() {
        return store.getters.isPromoter;
      },
      get hasAcceptedTerms() {
        return store.getters.accepted_terms;
      },

      signInWithUsernameAndPassword(email, password, remember_me) {
        return store.dispatch(LOGIN, { email, password, remember_me });
      },
      renew() {
        return store.dispatch(RENEW);
      },
      signOut() {
        return store.dispatch(LOGOUT);
      },
      changePassword(password, new_password, repeat_password) {
        return store.dispatch(CHANGE_PASSWORD, { password, new_password, repeat_password });
      },
      activate(token, password, repeat_password) {
        return authApi.activate(token, password, repeat_password);
      },
      resetPassword(token, new_password, repeat_password) {
        return authApi.resetPassword(token, new_password, repeat_password);
      }
    };
  }
};

export default AuthHandler;
