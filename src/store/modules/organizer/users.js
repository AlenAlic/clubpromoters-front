import Vue from "vue";
import { CLUB_OWNER, PROMOTER } from "@/constants";

const USERS = "USERS";
const USERS_REQUEST = "USERS: Getting users.";
const USERS_SUCCESS = "USERS: Successful request.";
const USERS_ERROR = "USERS: Failed request.";

export { USERS };

export default {
  state: {
    loading: false,
    clubOwners: [],
    promoters: []
  },

  mutations: {
    [USERS_REQUEST](state) {
      state.loading = true;
    },
    [USERS_SUCCESS](state, users) {
      state.clubOwners = users.filter(u => u.access === CLUB_OWNER);
      state.promoters = users.filter(u => u.access === PROMOTER);
      state.loading = false;
    },
    [USERS_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    // Get users
    [USERS]({ commit }) {
      commit(USERS_REQUEST);
      return Vue.axios
        .get("organizer/users")
        .then(response => {
          commit(USERS_SUCCESS, response.data);
        })
        .catch(error => {
          commit(USERS_ERROR);
          throw error;
        });
    }
  }
};
