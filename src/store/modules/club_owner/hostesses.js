import Vue from "vue";

const HOSTESSES = "HOSTESSES";
const HOSTESSES_REQUEST = "HOSTESSES: Getting hostesses.";
const HOSTESSES_SUCCESS = "HOSTESSES: Successful request.";
const HOSTESSES_ERROR = "HOSTESSES: Failed request.";

export { HOSTESSES };

export default {
  state: {
    loading: false,
    hostesses: []
  },

  mutations: {
    [HOSTESSES_REQUEST](state) {
      state.loading = true;
    },
    [HOSTESSES_SUCCESS](state, hostesses) {
      state.hostesses = hostesses;
      state.loading = false;
    },
    [HOSTESSES_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    // Get hostesses
    [HOSTESSES]({ commit }) {
      commit(HOSTESSES_REQUEST);
      return Vue.axios
        .get("club_owner/hostesses")
        .then(response => {
          commit(HOSTESSES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(HOSTESSES_ERROR);
          throw error;
        });
    }
  }
};
