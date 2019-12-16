import Vue from "vue";

const CODE = "CODE";
const CODE_REQUEST = "CODE: Getting code.";
const CODE_SUCCESS = "CODE: Successful request.";
const CODE_ERROR = "CODE: Failed request.";

export { CODE };

export default {
  state: {
    loading: false,
    code: null
  },

  mutations: {
    [CODE_REQUEST](state) {
      state.loading = true;
    },
    [CODE_SUCCESS](state, code) {
      state.code = code;
      state.loading = false;
    },
    [CODE_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    // Get hostesses
    [CODE]({ commit }) {
      commit(CODE_REQUEST);
      return Vue.axios
        .get("promoter/code")
        .then(response => {
          commit(CODE_SUCCESS, response.data);
        })
        .catch(error => {
          commit(CODE_ERROR);
          throw error;
        });
    }
  }
};
