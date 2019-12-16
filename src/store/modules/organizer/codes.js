import Vue from "vue";

const INACTIVE_CODES = "INACTIVE_CODES";
const INACTIVE_CODES_REQUEST = "INACTIVE_CODES: Getting inactive codes.";
const INACTIVE_CODES_SUCCESS = "INACTIVE_CODES: Successful request.";
const INACTIVE_CODES_ERROR = "INACTIVE_CODES: Failed request.";

const ACTIVE_CODES = "ACTIVE_CODES";
const ACTIVE_CODES_REQUEST = "ACTIVE_CODES: Getting active codes.";
const ACTIVE_CODES_SUCCESS = "ACTIVE_CODES: Successful request.";
const ACTIVE_CODES_ERROR = "ACTIVE_CODES: Failed request.";

const NEW_CODES = "NEW_CODES";
const NEW_CODES_REQUEST = "NEW_CODES: Creating new codes.";
const NEW_CODES_SUCCESS = "NEW_CODES: Successful request.";
const NEW_CODES_ERROR = "NEW_CODES: Failed request.";

export { INACTIVE_CODES, ACTIVE_CODES, NEW_CODES };

export default {
  state: {
    inactiveCodes: [],
    loadingInactiveCodes: false,
    activeCodes: [],
    loadingActiveCodes: false
  },

  mutations: {
    [INACTIVE_CODES_REQUEST](state) {
      state.loadingInactiveCodes = true;
    },
    [INACTIVE_CODES_SUCCESS](state, codes) {
      state.inactiveCodes = codes;
      state.loadingInactiveCodes = false;
    },
    [INACTIVE_CODES_ERROR](state) {
      state.loadingInactiveCodes = false;
    },

    [ACTIVE_CODES_REQUEST](state) {
      state.loadingActiveCodes = true;
    },
    [ACTIVE_CODES_SUCCESS](state, codes) {
      state.activeCodes = codes;
      state.loadingActiveCodes = false;
    },
    [ACTIVE_CODES_ERROR](state) {
      state.loadingActiveCodes = false;
    },

    [NEW_CODES_REQUEST](state) {
      state.loadingActiveCodes = true;
    },
    [NEW_CODES_SUCCESS](state) {
      state.loadingActiveCodes = false;
    },
    [NEW_CODES_ERROR](state) {
      state.loadingActiveCodes = false;
    }
  },
  actions: {
    // Get inactive codes
    [INACTIVE_CODES]({ commit }) {
      commit(INACTIVE_CODES_REQUEST);
      return Vue.axios
        .get("organizer/codes/inactive")
        .then(response => {
          commit(INACTIVE_CODES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(INACTIVE_CODES_ERROR);
          throw error;
        });
    },
    // Get active codes
    [ACTIVE_CODES]: ({ commit }) => {
      commit(ACTIVE_CODES_REQUEST);
      return Vue.axios
        .get("organizer/codes/active")
        .then(response => {
          commit(ACTIVE_CODES_SUCCESS, response.data);
        })
        .catch(error => {
          commit(ACTIVE_CODES_ERROR);
          throw error;
        });
    },
    // Create new codes
    [NEW_CODES]: ({ commit, dispatch }, { num }) => {
      commit(NEW_CODES_REQUEST);
      return Vue.axios
        .post("organizer/codes", { num: num })
        .then(() => {
          commit(NEW_CODES_SUCCESS);
          dispatch(ACTIVE_CODES);
        })
        .catch(error => {
          commit(NEW_CODES_ERROR);
          throw error;
        });
    }
  }
};
