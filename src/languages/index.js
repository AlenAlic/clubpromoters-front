import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// Import translations for all available languages
import gb from "./en";
import nl from "./nl";

const messages = {
  gb,
  nl
};

// Create a new vuei18n object with the locale and all messages.
const i18n = new VueI18n({
  locale: "gb",
  fallbackLocale: "gb",
  messages
});

export default i18n;
