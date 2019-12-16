import Vue from "vue";
import store from "@/store";
import { CONFIG } from "@/store/modules/organizer/config";
import { ACTIVE_CODES, INACTIVE_CODES } from "@/store/modules/organizer/codes";
import { USERS } from "@/store/modules/organizer/users";
import { ACTIVE_PARTIES, INACTIVE_PARTIES, PAST_PARTIES } from "@/store/modules/organizer/parties";
import { HOSTESSES } from "@/store/modules/club_owner/hostesses";
import {
  CO_INACTIVE_PARTIES,
  CO_ACTIVE_PARTIES,
  CO_PAST_PARTIES
} from "@/store/modules/club_owner/parties";
import { CODE } from "@/store/modules/promoter/code";

export default () => {
  if (Vue.prototype.$auth.isOrganizer) {
    store.dispatch(CONFIG);
    store.dispatch(ACTIVE_CODES);
    store.dispatch(INACTIVE_CODES);
    store.dispatch(USERS);
    store.dispatch(ACTIVE_PARTIES);
    store.dispatch(INACTIVE_PARTIES);
    store.dispatch(PAST_PARTIES);
  } else if (Vue.prototype.$auth.isClubOwner) {
    store.dispatch(HOSTESSES);
    store.dispatch(CO_INACTIVE_PARTIES);
    store.dispatch(CO_ACTIVE_PARTIES);
    store.dispatch(CO_PAST_PARTIES);
  } else if (Vue.prototype.$auth.isPromoter) {
    store.dispatch(CODE);
  } else {
    store.dispatch(ACTIVE_PARTIES);
  }
};
