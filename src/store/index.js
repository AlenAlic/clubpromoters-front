import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import config from "./modules/organizer/config";
import codes from "./modules/organizer/codes";
import users from "./modules/organizer/users";
import parties from "./modules/organizer/parties";
import hostesses from "./modules/club_owner/hostesses";
import club_owner_parties from "./modules/club_owner/parties";
import code from "./modules/promoter/code";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    config: config,
    codes: codes,
    users: users,
    parties: parties,
    hostesses: hostesses,
    club_owner_parties: club_owner_parties,
    code: code
  }
});