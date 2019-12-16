import store from "@/store";
import { LOGIN, LOGOUT, RENEW, ACTIVATE, RESET_PASSWORD } from "@/store/modules/auth";

const AuthHandler = {
  install(Vue) {
    Vue.prototype.$auth = {
      /**
       * Get the currently signed in user.
       */
      get currentUser() {
        return store.getters.currentUser;
      },

      /**
       * Get the currently signed in user's access level.
       */
      get access() {
        return store.getters.access;
      },

      /**
       * Checks if the current user is authenticated
       */
      get isAuthenticated() {
        return !!this.currentUser;
      },

      /**
       * Checks if the current user is an admin
       */
      get isAdmin() {
        return store.getters.isAdmin;
      },
      /**
       * Checks if the current user is an organizer
       */
      get isOrganizer() {
        return store.getters.isOrganizer;
      },
      /**
       * Checks if the current user is a club owner
       */
      get isClubOwner() {
        return store.getters.isClubOwner;
      },
      /**
       * Checks if the current user is a hostess
       */
      get isHostess() {
        return store.getters.isHostess;
      },
      /**
       * Checks if the current user is a promoter
       */
      get isPromoter() {
        return store.getters.isPromoter;
      },

      /**
       * Sign in a user with a username and password.
       * @param email
       * @param password
       * @param remember_me
       * @returns {Promise}
       */
      signInWithUsernameAndPassword(email, password, remember_me) {
        return store.dispatch(LOGIN, { email, password, remember_me });
      },

      /**
       * Renew a user's session
       * @returns {Promise}
       */
      renew() {
        return store.dispatch(RENEW);
      },

      /**
       * Sign out the currently signed in user.
       * @returns {Promise}
       */
      signOut() {
        return store.dispatch(LOGOUT);
      },

      /**
       * Activate an account using the activation token
       * @param {string} token
       * @param password
       * @param repeat_password
       * @returns {Promise}
       */
      activate(token, password, repeat_password) {
        return store.dispatch(ACTIVATE, { token, password, repeat_password });
      },

      /**
       * Activate an account using the activation token
       * @param {string} token
       * @param password
       * @param repeat_password
       * @returns {Promise}
       */
      resetPassword(token, password, repeat_password) {
        return store.dispatch(RESET_PASSWORD, { token, password, repeat_password });
      }
    };
  }
};

export default AuthHandler;
