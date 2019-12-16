import Vue from "vue";

const CO_INACTIVE_PARTIES = "CO_INACTIVE_PARTIES";
const CO_INACTIVE_PARTIES_REQUEST = "CO_INACTIVE_PARTIES: Getting inactive parties.";
const CO_INACTIVE_PARTIES_SUCCESS = "CO_INACTIVE_PARTIES: Successful request.";
const CO_INACTIVE_PARTIES_ERROR = "CO_INACTIVE_PARTIES: Failed request.";

const CO_ACTIVE_PARTIES = "CO_ACTIVE_PARTIES";
const CO_ACTIVE_PARTIES_REQUEST = "CO_ACTIVE_PARTIES: Getting active parties.";
const CO_ACTIVE_PARTIES_SUCCESS = "CO_ACTIVE_PARTIES: Successful request.";
const CO_ACTIVE_PARTIES_ERROR = "CO_ACTIVE_PARTIES: Failed request.";

const CO_PAST_PARTIES = "CO_PAST_PARTIES";
const CO_PAST_PARTIES_REQUEST = "CO_PAST_PARTIES: Getting past parties.";
const CO_PAST_PARTIES_SUCCESS = "CO_PAST_PARTIES: Successful request.";
const CO_PAST_PARTIES_ERROR = "CO_PAST_PARTIES: Failed request.";

export { CO_INACTIVE_PARTIES, CO_ACTIVE_PARTIES, CO_PAST_PARTIES };

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
    [CO_INACTIVE_PARTIES_REQUEST](state) {
      state.loadingInactiveParties = true;
    },
    [CO_INACTIVE_PARTIES_SUCCESS](state, parties) {
      state.inactiveParties = parties;
      state.loadingInactiveParties = false;
    },
    [CO_INACTIVE_PARTIES_ERROR](state) {
      state.loadingInactiveParties = false;
    },

    [CO_ACTIVE_PARTIES_REQUEST](state) {
      state.loadingActiveParties = true;
    },
    [CO_ACTIVE_PARTIES_SUCCESS](state, parties) {
      state.activeParties = parties;
      state.loadingActiveParties = false;
    },
    [CO_ACTIVE_PARTIES_ERROR](state) {
      state.loadingActiveParties = false;
    },

    [CO_PAST_PARTIES_REQUEST](state) {
      state.loadingPastParties = true;
    },
    [CO_PAST_PARTIES_SUCCESS](state, parties) {
      state.pastParties = parties;
      state.loadingPastParties = false;
    },
    [CO_PAST_PARTIES_ERROR](state) {
      state.loadingPastParties = false;
    }
  },
  actions: {
    // Get inactive parties
    [CO_INACTIVE_PARTIES]({ commit }) {
      commit(CO_INACTIVE_PARTIES_REQUEST);
      return Vue.axios
        .get("club_owner/inactive_parties")
        .then(response => {
          commit(CO_INACTIVE_PARTIES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(CO_INACTIVE_PARTIES_ERROR);
          throw error;
        });
    },
    // Get active parties
    [CO_ACTIVE_PARTIES]: ({ commit }) => {
      commit(CO_ACTIVE_PARTIES_REQUEST);
      return Vue.axios
        .get("club_owner/active_parties")
        .then(response => {
          commit(CO_ACTIVE_PARTIES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(CO_ACTIVE_PARTIES_ERROR);
          throw error;
        });
    },
    // Get past parties
    [CO_PAST_PARTIES]: ({ commit }) => {
      commit(CO_PAST_PARTIES_REQUEST);
      return Vue.axios
        .get("club_owner/past_parties")
        .then(response => {
          commit(CO_PAST_PARTIES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(CO_PAST_PARTIES_ERROR);
          throw error;
        });
    }
  }
};
