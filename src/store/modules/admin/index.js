import Vue from "vue";

const ADMIN_USERS = "ADMIN_USERS";
const ADMIN_USERS_REQUEST = "ADMIN_USERS: Getting users.";
const ADMIN_USERS_SUCCESS = "ADMIN_USERS: Successful request.";
const ADMIN_USERS_ERROR = "ADMIN_USERS: Failed request.";

const ADMIN_SET_USERS = "ADMIN_SET_USERS";
const ADMIN_CLEAR_USERS = "ADMIN_CLEAR_USERS";

const ADMIN_ORGANIZERS = "ADMIN_ORGANIZERS";
const ADMIN_ORGANIZERS_REQUEST = "ADMIN_ORGANIZERS: Getting users.";
const ADMIN_ORGANIZERS_SUCCESS = "ADMIN_ORGANIZERS: Successful request.";
const ADMIN_ORGANIZERS_ERROR = "ADMIN_ORGANIZERS: Failed request.";

const ADMIN_SET_ORGANIZERS = "ADMIN_SET_ORGANIZERS";
const ADMIN_CLEAR_ORGANIZERS = "ADMIN_CLEAR_ORGANIZERS";

export { ADMIN_USERS, ADMIN_CLEAR_USERS, ADMIN_ORGANIZERS, ADMIN_SET_ORGANIZERS, ADMIN_CLEAR_ORGANIZERS };

export default {
  state: {
    loadingUsers: false,
    users: [],
    loadingOrganizers: false,
    organizers: []
  },

  mutations: {
    [ADMIN_USERS_REQUEST](state) {
      state.loadingUsers = true;
    },
    [ADMIN_USERS_SUCCESS](state) {
      state.loadingUsers = false;
    },
    [ADMIN_USERS_ERROR](state) {
      state.loadingUsers = false;
    },
    [ADMIN_SET_USERS](state, users) {
      state.users = users;
    },
    [ADMIN_CLEAR_USERS](state) {
      state.users = [];
    },

    [ADMIN_ORGANIZERS_REQUEST](state) {
      state.loadingOrganizers = true;
    },
    [ADMIN_ORGANIZERS_SUCCESS](state) {
      state.loadingOrganizers = false;
    },
    [ADMIN_ORGANIZERS_ERROR](state) {
      state.loadingOrganizers = false;
    },
    [ADMIN_SET_ORGANIZERS](state, users) {
      state.organizers = users;
    },
    [ADMIN_CLEAR_ORGANIZERS](state) {
      state.organizers = [];
    }
  },
  actions: {
    [ADMIN_USERS]({ commit }) {
      commit(ADMIN_USERS_REQUEST);
      return Vue.axios
        .get("admin/switch")
        .then(response => {
          commit(ADMIN_USERS_SUCCESS);
          commit(ADMIN_SET_USERS, response.data);
        })
        .catch(error => {
          commit(ADMIN_USERS_ERROR);
          throw error;
        });
    },
    [ADMIN_ORGANIZERS]({ commit }) {
      commit(ADMIN_ORGANIZERS_REQUEST);
      return Vue.axios
        .get("admin/organizers")
        .then(response => {
          commit(ADMIN_ORGANIZERS_SUCCESS);
          commit(ADMIN_SET_ORGANIZERS, response.data);
        })
        .catch(error => {
          commit(ADMIN_ORGANIZERS_ERROR);
          throw error;
        });
    }
  }
};
