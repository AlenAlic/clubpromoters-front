import { backendServer } from "@/api/backend";

const CODE_KEY = "club.code";

export const codeApi = {
  /**
   * Checks if a code is valid
   *
   * @returns {Promise}
   */
  async checkCode(code) {
    return await backendServer.post("check_code", { code: code });
  },

  setCode(code) {
    if (code) {
      localStorage.setItem(CODE_KEY, code);
    } else {
      localStorage.removeItem(CODE_KEY);
    }
  },

  getCode() {
    return localStorage.getItem(CODE_KEY);
  }
};
