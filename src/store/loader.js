import Vue from "vue";
import store from "@/store";
import { CONFIG } from "@/store/modules/organizer/config";

export default () => {
  if (Vue.prototype.$auth.isOrganizer) {
    store.dispatch(CONFIG);
  }
};
