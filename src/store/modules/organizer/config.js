import Vue from "vue";

const CONFIG = "CONFIG";
const CONFIG_REQUEST = "CONFIG: Getting config.";
const CONFIG_SUCCESS = "CONFIG: Successful request.";
const CONFIG_ERROR = "CONFIG: Failed request.";

const SET_CONFIG = "SET_CONFIG";

export { CONFIG, SET_CONFIG };

export default {
  state: {
    settings: {},
    loading: false
  },

  mutations: {
    [CONFIG_REQUEST](state) {
      state.loading = true;
    },
    [CONFIG_SUCCESS](state) {
      state.loading = false;
    },
    [CONFIG_ERROR](state) {
      state.loading = false;
    },

    [SET_CONFIG](state, settings) {
      state.settings = settings;
    }
  },
  actions: {
    // Get config settings
    [CONFIG]({ commit }) {
      commit(CONFIG_REQUEST);
      return Vue.axios
        .get("organizer/config")
        .then(response => {
          commit(CONFIG_SUCCESS);
          commit(SET_CONFIG, response.data);
        })
        .catch(error => {
          commit(CONFIG_ERROR);
          throw error;
        });
    }
  }
};
