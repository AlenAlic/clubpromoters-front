// Main components
import Vue from "vue";
import App from "@/App";
import AppNotLoaded from "@/AppNotLoaded";

// Main extension
import router from "@/router";
import store from "@/store";
import i18n from "@/languages";

// Service Worker
import "./registerServiceWorker";

// Import the config independent modules.
import vuetify from "@/plugins/Vuetify";
import { frontendApi } from "@/api/frontend";
import { backendServer } from "@/api/backend";
import VueAxios from "vue-axios";
import AuthHandler from "@/components/auth/AuthHandler";
import utilities from "@/plugins/utilities";
import form from "@/plugins/form";
import toast from "@/plugins/toast";
import Datetime from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

// Register the config independent modules.
Vue.use(AuthHandler);
Vue.use(utilities);
Vue.use(form);
Vue.use(toast);
Vue.use(Datetime);

// External flag css
import "flag-icon-css/css/flag-icon.min.css";

// Turn off Vue Production tip
Vue.config.productionTip = false;

// Mount App function
async function main() {
  try {
    const config = await frontendApi.fetchConfig().catch(err => {
      throw err;
    });

    // Set config
    Vue.prototype.$config = config;
    Vue.prototype.$config.debug = config.debug || process.env.NODE_ENV === "development";

    // Set the baseURL according to the latest config and register the instance.
    backendServer.defaults.baseURL = Vue.prototype.$config.api.url;

    // Register the backend server as the Vue.axios instance.
    Vue.use(VueAxios, backendServer);

    new Vue({
      router,
      store,
      i18n,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  } catch (error) {
    new Vue({
      el: "#app",
      render: h => h(AppNotLoaded)
    }).$mount("#app");
  }
}

// Mount App
main().then(() => {});
