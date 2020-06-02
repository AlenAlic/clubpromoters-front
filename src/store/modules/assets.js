import Vue from "vue";

const SET_ASSETS = "ASSETS: Set assets";
const CLEAR_ASSETS = "ASSETS: Clear assets";

const ASSETS = "ASSETS";
const ASSETS_REQUEST = "ASSETS: Login request sent.";
const ASSETS_SUCCESS = "ASSETS: Successful request.";
const ASSETS_ERROR = "ASSETS: Failed request.";

export { ASSETS, CLEAR_ASSETS };
export default {
  state: {
    images: [],
    logos: [],
    loading: false
  },

  mutations: {
    [SET_ASSETS](state, data) {
      state.images = data.images;
      state.logos = data.logos;
    },
    [CLEAR_ASSETS](state) {
      state.images = [];
      state.logos = [];
    },

    [ASSETS_REQUEST](state) {
      state.loading = true;
    },
    [ASSETS_SUCCESS](state) {
      state.loading = false;
    },
    [ASSETS_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    [ASSETS]({ commit }, { user_id }) {
      commit(ASSETS_REQUEST);
      return Vue.axios
        .get(`user/assets/${user_id}`)
        .then(response => {
          commit(SET_ASSETS, response.data);
          commit(ASSETS_SUCCESS);
        })
        .catch(error => {
          commit(ASSETS_ERROR);
          throw error;
        });
    }
  }
};
