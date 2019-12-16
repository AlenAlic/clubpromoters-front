import Vue from "vue";

const INACTIVE_PARTIES = "INACTIVE_PARTIES";
const INACTIVE_PARTIES_REQUEST = "INACTIVE_PARTIES: Getting inactive parties.";
const INACTIVE_PARTIES_SUCCESS = "INACTIVE_PARTIES: Successful request.";
const INACTIVE_PARTIES_ERROR = "INACTIVE_PARTIES: Failed request.";

const ACTIVE_PARTIES = "ACTIVE_PARTIES";
const ACTIVE_PARTIES_REQUEST = "ACTIVE_PARTIES: Getting active parties.";
const ACTIVE_PARTIES_SUCCESS = "ACTIVE_PARTIES: Successful request.";
const ACTIVE_PARTIES_ERROR = "ACTIVE_PARTIES: Failed request.";

const PAST_PARTIES = "PAST_PARTIES";
const PAST_PARTIES_REQUEST = "PAST_PARTIES: Getting past parties.";
const PAST_PARTIES_SUCCESS = "PAST_PARTIES: Successful request.";
const PAST_PARTIES_ERROR = "PAST_PARTIES: Failed request.";

export { INACTIVE_PARTIES, ACTIVE_PARTIES, PAST_PARTIES };

export default {
  state: {
    inactiveParties: [],
    loadingInactiveParties: false,
    activeParties: [],
    loadingActiveParties: false,
    pastParties: [],
    loadingPastParties: false
  },

  mutations: {
    [INACTIVE_PARTIES_REQUEST](state) {
      state.loadingInactiveParties = true;
    },
    [INACTIVE_PARTIES_SUCCESS](state, parties) {
      state.inactiveParties = parties;
      state.loadingInactiveParties = false;
    },
    [INACTIVE_PARTIES_ERROR](state) {
      state.loadingInactiveParties = false;
    },

    [ACTIVE_PARTIES_REQUEST](state) {
      state.loadingActiveParties = true;
    },
    [ACTIVE_PARTIES_SUCCESS](state, parties) {
      state.activeParties = parties;
      state.loadingActiveParties = false;
    },
    [ACTIVE_PARTIES_ERROR](state) {
      state.loadingActiveParties = false;
    },

    [PAST_PARTIES_REQUEST](state) {
      state.loadingPastParties = true;
    },
    [PAST_PARTIES_SUCCESS](state, parties) {
      state.pastParties = parties;
      state.loadingPastParties = false;
    },
    [PAST_PARTIES_ERROR](state) {
      state.loadingPastParties = false;
    }
  },
  actions: {
    // Get inactive parties
    [INACTIVE_PARTIES]({ commit }) {
      commit(INACTIVE_PARTIES_REQUEST);
      return Vue.axios
        .get("organizer/inactive_parties")
        .then(response => {
          commit(INACTIVE_PARTIES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(INACTIVE_PARTIES_ERROR);
          throw error;
        });
    },
    // Get active parties
    [ACTIVE_PARTIES]: ({ commit }) => {
      commit(ACTIVE_PARTIES_REQUEST);
      return Vue.axios
        .get("active_parties")
        .then(response => {
          commit(ACTIVE_PARTIES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(ACTIVE_PARTIES_ERROR);
          throw error;
        });
    },
    // Get past parties
    [PAST_PARTIES]: ({ commit }) => {
      commit(PAST_PARTIES_REQUEST);
      return Vue.axios
        .get("organizer/past_parties")
        .then(response => {
          commit(PAST_PARTIES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(PAST_PARTIES_ERROR);
          throw error;
        });
    }
  }
};
