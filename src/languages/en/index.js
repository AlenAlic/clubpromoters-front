// Please add the imports in alphabetical order for ease of finding when things become large.
import admin from "./admin";
import application from "./application";
import auth from "./auth";
import club_owner from "./club_owner";
import form from "./form";
import general from "./general";
import menu from "./menu";
import networkErrors from "./network-errors";
import organizer from "./organizer";
import page_not_found from "./page_not_found";
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
  ...menu,
  ...networkErrors,
  ...organizer,
  ...page_not_found,
  ...password_requirements,
  ...promoter,
  ...purchase,
  ...user,
  ...vuetify
};

export default gb;
