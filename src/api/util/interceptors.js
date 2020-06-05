import Vue from "vue";
import { backendServer } from "./servers";
import { loadServerToken } from "./token-storage";
import router from "@/router";
import { ERROR_CODES, getNetworkErrorCode, localizeNetworkErrorCode } from "@/api/util/network-errors";
import { codeApi } from "@/api/code";

backendServer.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const errorCode = getNetworkErrorCode(error);
    if (errorCode === ERROR_CODES.NETWORK) {
      Vue.$toast.error(localizeNetworkErrorCode(errorCode));
      return Promise.reject(error);
    }
    if (errorCode === ERROR_CODES.UNAUTHORIZED && router.currentRoute.meta.auth) {
      router.push({ name: "login" });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

backendServer.interceptors.request.use(async request => {
  // Inject authorization token if present
  const token = loadServerToken(backendServer);
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
  const code = codeApi.getCode();
  if (code) request.headers["Code"] = code;
  return request;
});

export { backendServer };
