import { DateTime, Duration } from "luxon";
import { MONTHS } from "@/constants";

const UtilitiesHandler = {
  install(Vue) {
    /**
     * Utilities used in multiple components
     */
    Vue.prototype.$util = {
      /**
       * Check if valid email
       */
      isEmail: function(email) {
        return isEmail(email);
      },

      /**
       * Get a DateTime object.
       * @returns {DateTime}
       */
      dateTime(date) {
        return DateTime.fromFormat(date, "yyyy-LL-dd HH:mm:ss");
      },
      /**
       * Get the duration between two DateTime objects.
       * @returns {Duration}
       */
      duration(startDate, endDate) {
        return Duration.fromObject({
          milliseconds: endDate.toMillis() - startDate.toMillis()
        }).shiftTo("hours", "minutes");
      },
      /**
       * Get the current DateTime
       * @returns {DateTime}
       */
      get now() {
        return now();
      },
      /**
       * Get the string representation of the current DateTime
       * @returns {String}
       */
      get nowString() {
        return this.now.toISO({ includeOffset: false });
      },

      /**
       * Format a number to a currency format
       * @returns {String}
       */
      formatCurrency(value, currency = "€", replace = false, showMinus = true) {
        value = Number(value);
        let formatted = `${value < 0 && showMinus ? "-" : ""}${currency}${Math.abs(value).toFixed(2)}`;
        if (replace) return formatted.replace(".00", ".-");
        else return formatted;
      },

      /**
       * Returns an Array of years, starting from 2019
       * @returns (Array)
       */
      get financesYears() {
        return financesYears();
      },

      /**
       * Returns an Array of months that can be used for the <v-select /> component.
       * @returns (Array)
       */
      get selectMonths() {
        return selectMonths();
      },

      /**
       * Returns a
       * @returns (String)
       */
      displayMonth(month) {
        return displayMonth(month);
      }
    };
  }
};

export default UtilitiesHandler;

export const isEmail = email => {
  // eslint-disable-next-line no-useless-escape
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const now = () => {
  return DateTime.local();
};

const financesYears = () => {
  return Array.from(Array(now().year + 1 - 2019).keys()).map(n => n + 2019);
};

const selectMonths = () => {
  return Object.keys(MONTHS).map(m => ({ text: MONTHS[m], value: m }));
};

const displayMonth = month => {
  return MONTHS[month];
};
