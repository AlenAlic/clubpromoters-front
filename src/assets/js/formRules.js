import i18n from "@/languages";
import { isEmail } from "@/assets/js/utilities";

const FormRulesHandler = {
  install(Vue) {
    Vue.prototype.$form = {
      get fieldRequired() {
        return fieldRequired;
      },
      get fieldIsEmail() {
        return fieldIsEmail;
      },
      get commissionPositive() {
        return commissionPositive;
      },
      get commissionMax() {
        return commissionMax;
      }
    };
  }
};

export default FormRulesHandler;

export const fieldRequired = v => !!v || i18n.t("form_validation.errors.required");
export const fieldIsEmail = v => isEmail(v) || i18n.t("auth.errors.valid_email");

export const commissionPositive = v => v >= 0 || "Commission must be positive";
export const commissionMax = v => v <= 50 || "Commission cannot exceed 50%";
export const commissionSumMax = (v, o) =>
  v +
    o.reduce((t, c) => {
      return t + c;
    }, 0) <=
    100 || "Total sum of the commissions cannot exceed 100%.";
