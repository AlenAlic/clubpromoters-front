import Vue from "vue";

const PUBLIC_PARTIES = "PUBLIC_PARTIES";
const PUBLIC_PARTIES_REQUEST = "PUBLIC_PARTIES: Getting active parties.";
const PUBLIC_PARTIES_SUCCESS = "PUBLIC_PARTIES: Successful request.";
const PUBLIC_PARTIES_ERROR = "PUBLIC_PARTIES: Failed request.";

const SET_PUBLIC_PARTIES = "SET_PUBLIC_PARTIES";

export { PUBLIC_PARTIES };
export default {
  state: {
    parties: [],
    loadingParties: false
  },

  mutations: {
    [SET_PUBLIC_PARTIES](state, parties) {
      state.parties = parties;
    },

    [PUBLIC_PARTIES_REQUEST](state) {
      state.loadingParties = true;
    },
    [PUBLIC_PARTIES_SUCCESS](state) {
      state.loadingParties = false;
    },
    [PUBLIC_PARTIES_ERROR](state) {
      state.loadingParties = false;
    }
  },
  actions: {
    [PUBLIC_PARTIES]({ commit }) {
      commit(PUBLIC_PARTIES_REQUEST);
      return Vue.axios
        .get("public/active_parties")
        .then(response => {
          commit(SET_PUBLIC_PARTIES, response.data);
          commit(PUBLIC_PARTIES_SUCCESS);
        })
        .catch(error => {
          commit(PUBLIC_PARTIES_ERROR);
          throw error;
        });
    }
  }
};
