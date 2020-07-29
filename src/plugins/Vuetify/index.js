import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: colors.blue,
        secondary: colors.teal.darken1,
        accent: colors.yellow.accent1,
        error: colors.red.accent2,
        warning: colors.orange.darken1,
        info: colors.lightBlue.darken1,
        success: colors.green
      },
      dark: {
        primary: colors.deepPurple,
        secondary: colors.blue,
        accent: colors.yellow.accent1,
        error: colors.red.accent2,
        warning: colors.orange.darken1,
        info: colors.lightBlue.darken1,
        success: colors.green
      }
    }
  },
  icons: {
    iconfont: "mdi"
  }
};

export default new Vuetify(opts);
