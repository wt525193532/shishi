import request from "@/lib/request";

export const loginByUserName = (username, psd, rememberMe) =>
  request.post("/api/TokenAuth/Authenticate", {
    userNameOrEmailAddress: username,
    password: psd,
    rememberClient: !!rememberMe
  });

export const getLoginInfo = () =>
  request.get("/api/services/app/Session/GetCurrentLoginInformations");

export const getUserConfig = () =>
  request.get("/api/services/app/Session/GetUserConfig");

export default {
  loginByUserName,
  getLoginInfo,
  getUserConfig
};
