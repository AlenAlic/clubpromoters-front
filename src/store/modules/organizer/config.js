import Vue from "vue";

const CONFIG = "CONFIG";
const CONFIG_REQUEST = "CONFIG: Getting config.";
const CONFIG_SUCCESS = "CONFIG: Successful request.";
const CONFIG_ERROR = "CONFIG: Failed request.";

const UPDATE_CONFIG = "UPDATE_CONFIG";
const UPDATE_CONFIG_REQUEST = "UPDATE_CONFIG: Updating config.";
const UPDATE_CONFIG_SUCCESS = "UPDATE_CONFIG: Successful request.";
const UPDATE_CONFIG_ERROR = "UPDATE_CONFIG: Failed request.";

export { CONFIG, UPDATE_CONFIG };

export default {
  state: {
    settings: {},
    loading: false
  },

  mutations: {
    [CONFIG_REQUEST](state) {
      state.loading = true;
    },
    [CONFIG_SUCCESS](state, settings) {
      state.settings = settings;
      state.loading = false;
    },
    [CONFIG_ERROR](state) {
      state.loading = false;
    },

    [UPDATE_CONFIG_REQUEST](state) {
      state.loading = true;
    },
    [UPDATE_CONFIG_SUCCESS](state, settings) {
      state.settings = settings;
      state.loading = false;
    },
    [UPDATE_CONFIG_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    // Get config settings
    [CONFIG]({ commit }) {
      commit(CONFIG_REQUEST);
      return Vue.axios
        .get("organizer/config")
        .then(response => {
          commit(CONFIG_SUCCESS, response.data);
        })
        .catch(error => {
          commit(CONFIG_ERROR);
          throw error;
        });
    },
    // Update config settings
    [UPDATE_CONFIG]({ commit }, data) {
      commit(UPDATE_CONFIG_REQUEST);
      return Vue.axios
        .post("organizer/config", data)
        .then(response => {
          commit(UPDATE_CONFIG_SUCCESS, response.data);
        })
        .catch(error => {
          commit(UPDATE_CONFIG_ERROR);
          throw error;
        });
    }
  }
};
