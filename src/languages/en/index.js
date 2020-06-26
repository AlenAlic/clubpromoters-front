// Please add the imports in alphabetical order for ease of finding when things become large.
import admin from "./admin";
import application from "./application";
import auth from "./auth";
import club_owner from "./club_owner";
import form from "./form";
import general from "./general";
import hostess from "./hostess";
import invoices from "./invoices";
import locale from "./locale";
import menu from "./menu";
import networkErrors from "./network-errors";
import organizer from "./organizer";
import page_not_found from "./page_not_found";
import party_card from "./party_card";
import password_requirements from "./password_requirements";
import promoter from "./promoter";
import purchase from "./purchase";
import user from "./user";
import vuetify from "./vuetify";

const gb = {
  ...admin,
  ...application,
  ...auth,
  ...club_owner,
  ...form,
  ...general,
  ...hostess,
  ...invoices,
  ...locale,
  ...menu,
  ...networkErrors,
  ...organizer,
  ...page_not_found,
  ...party_card,
  ...password_requirements,
  ...promoter,
  ...purchase,
  ...user,
  ...vuetify
};

export default gb;
