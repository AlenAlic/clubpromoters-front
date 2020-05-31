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
      },
      minNumber(n) {
        return v => minNumber(v, n);
      },
      maxNumber(n) {
        return v => maxNumber(v, n);
      },
      get charactersAreLetters() {
        return charactersAreLetters;
      },
      minCharacterCount(o) {
        return minCharacterCount(o);
      },
      maxCharacterCount(o) {
        return maxCharacterCount(o);
      },
      exactCharacterCount(n) {
        return v => exactCharacterCount(v, n);
      },
      get pfdFile() {
        return pfdFile;
      }
    };
  }
};

export default FormRulesHandler;

export const fieldRequired = v => !!v || i18n.t("form_validation.errors.required");
export const fieldIsEmail = v => isEmail(v) || i18n.t("auth.errors.valid_email");
export const minNumber = (v, o) => v >= o || `Cannot be smaller than ${o}`;
export const maxNumber = (v, o) => v <= o || `Cannot be larger than ${o}`;
export const charactersAreLetters = v => (v && v.match("^[A-Za-z]+$")) || "Can only be letters";
export const minCharacterCount = (v, o) =>
  (v && v.length >= o) || `Must be at least ${o} characters long`;
export const maxCharacterCount = (v, o) =>
  v.length <= o || `Cannot be more than ${o} characters long`;
export const exactCharacterCount = (v, o) =>
  (v && v.length === o) || `Must be ${o} characters long`;
export const pfdFile = v => (!!v && v.type === "application/pdf") || "Must be a .pfd file";

export const commissionPositive = v => v >= 0 || "Commission must be positive";
export const commissionMax = v => v <= 50 || "Commission cannot exceed 50%";
export const commissionSumMax = (v, o) =>
  v +
    o.reduce((t, c) => {
      return t + c;
    }, 0) <=
    100 || "Total sum of the commissions cannot exceed 100%.";
