import Vue from "vue";

import { authApi, getUser } from "@/api/auth";
import { saveServerToken } from "@/api/util/token-storage";
import { backendServer } from "@/api/util/servers";
import { ADMIN, CLUB_OWNER, HOSTESS, ORGANIZER, PROMOTER } from "@/constants";

const SET_USER = "AUTH: Set user";
const CLEAR_USER = "CLEAR_USER";

const LOGIN = "LOGIN";
const LOGIN_REQUEST = "LOGIN: Login request sent.";
const LOGIN_SUCCESS = "LOGIN: Successful request.";
const LOGIN_ERROR = "LOGIN: Failed request.";

const LOGOUT = "LOGOUT";
const LOGOUT_REQUEST = "LOGOUT: Logout request sent.";
const LOGOUT_SUCCESS = "LOGOUT: Successful request.";
const LOGOUT_ERROR = "LOGOUT: Failed request.";

const RENEW = "RENEW";
const RENEW_REQUEST = "RENEW: Renew token request sent.";
const RENEW_SUCCESS = "RENEW: Successful request.";
const RENEW_ERROR = "RENEW: Failed request.";

const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD: Change password request sent.";
const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD: Successful request.";
const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD: Failed request.";

const GET_PROFILE = "GET_PROFILE";
const SET_PROFILE = "SET_PROFILE";
const CLEAR_PROFILE = "CLEAR_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";

const PROFILE_REQUEST = "PROFILE: Profile request sent.";
const PROFILE_SUCCESS = "PROFILE: Successful request.";
const PROFILE_ERROR = "PROFILE: Failed request.";

export { LOGIN, LOGOUT, RENEW, SET_USER, CHANGE_PASSWORD, SET_PROFILE, UPDATE_PROFILE };

const setUser = token => {
  saveServerToken(backendServer, token);
  return getUser();
};

export default {
  state: {
    user: getUser(),
    profile: null,
    loadingProfile: false
  },

  mutations: {
    [SET_USER](state, token) {
      state.user = setUser(token);
    },
    [CLEAR_USER](state) {
      setUser(null);
      state.user = null;
      state.profile = null;
    },

    [LOGIN_REQUEST]() {},
    [LOGIN_SUCCESS]() {},
    [LOGIN_ERROR]() {},

    [LOGOUT_REQUEST]() {},
    [LOGOUT_SUCCESS]() {},
    [LOGOUT_ERROR]() {},

    [RENEW_REQUEST]() {},
    [RENEW_SUCCESS]() {},
    [RENEW_ERROR]() {},

    [CHANGE_PASSWORD_REQUEST]() {},
    [CHANGE_PASSWORD_SUCCESS]() {},
    [CHANGE_PASSWORD_ERROR]() {},
    [SET_PROFILE](state, profile) {
      state.profile = profile;
    },
    [CLEAR_PROFILE](state) {
      state.profile = null;
    },
    [PROFILE_REQUEST](state) {
      state.loadingProfile = true;
    },
    [PROFILE_SUCCESS](state) {
      state.loadingProfile = false;
    },
    [PROFILE_ERROR](state) {
      state.loadingProfile = false;
    }
  },
  actions: {
    [SET_USER]: ({ commit }, token) => {
      commit(SET_USER, token);
    },
    [CLEAR_USER]: ({ commit }) => {
      commit(CLEAR_USER);
    },
    // Sign a user in
    [LOGIN]({ commit, dispatch }, { email, password, remember_me }) {
      commit(LOGIN_REQUEST);
      return authApi
        .login(email, password, remember_me)
        .then(response => {
          commit(SET_USER, response.data);
          commit(LOGIN_SUCCESS);
          dispatch(GET_PROFILE);
        })
        .catch(error => {
          commit(LOGIN_ERROR);
          throw error;
        });
    },
    // Set user
    [SET_USER]: ({ commit }, { token }) => {
      commit(SET_USER, token);
    },
    // Sign a user out
    [LOGOUT]: ({ commit }) => {
      commit(LOGOUT_REQUEST);
      return authApi
        .logout()
        .then(() => {
          commit(CLEAR_USER);
          commit(LOGOUT_SUCCESS);
        })
        .catch(error => {
          commit(LOGOUT_ERROR);
          throw error;
        });
    },
    // Renew user token
    [RENEW]({ commit, dispatch }) {
      commit(RENEW_REQUEST);
      return authApi
        .renew()
        .then(response => {
          commit(SET_USER, response.data);
          commit(RENEW_SUCCESS);
          dispatch(GET_PROFILE);
        })
        .catch(() => {
          commit(CLEAR_USER);
          commit(RENEW_ERROR);
        });
    },
    // Change user password
    [CHANGE_PASSWORD]: ({ commit }, { password, new_password, repeat_password }) => {
      commit(CHANGE_PASSWORD_REQUEST);
      return authApi
        .changePassword(password, new_password, repeat_password)
        .then(() => {
          commit(CHANGE_PASSWORD_SUCCESS);
          commit(CLEAR_USER);
        })
        .catch(error => {
          commit(CHANGE_PASSWORD_ERROR);
          throw error;
        });
    },
    [GET_PROFILE]({ commit }) {
      commit(PROFILE_REQUEST);
      return Vue.axios
        .get("/user/profile")
        .then(response => {
          commit(PROFILE_SUCCESS);
          commit(SET_PROFILE, response.data);
        })
        .catch(() => {
          commit(PROFILE_ERROR);
        });
    },
    [UPDATE_PROFILE]({ commit }, { first_name, last_name }) {
      commit(PROFILE_REQUEST);
      return Vue.axios
        .patch("/user/profile", {
          first_name: first_name,
          last_name: last_name
        })
        .then(response => {
          commit(PROFILE_SUCCESS);
          commit(SET_PROFILE, response.data);
        })
        .catch(() => {
          commit(PROFILE_ERROR);
        });
    }
  },
  getters: {
    currentUser: state => {
      return state.user;
    },
    access: state => {
      return state.user ? state.user.access : -1;
    },
    userId: state => {
      return state.user ? state.user.id : -1;
    },
    isAdmin: state => {
      return state.user && state.user.access === ADMIN;
    },
    isOrganizer: state => {
      return state.user && state.user.access === ORGANIZER;
    },
    isClubOwner: state => {
      return state.user && state.user.access === CLUB_OWNER;
    },
    isHostess: state => {
      return state.user && state.user.access === HOSTESS;
    },
    isPromoter: state => {
      return state.user && state.user.access === PROMOTER;
    }
  }
};
