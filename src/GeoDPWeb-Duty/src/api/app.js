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
export const canTakeOver = () =>
  request.post("/api/services/duty/DutySchedule/CanTakeOver"); // 当前用户是否可接班
export const takeOver = () =>
  request.post("./api/services/duty/DutySchedule/TakeOver"); // 当前用户是否可接班

export default {
  loginByUserName,
  getLoginInfo,
  getUserConfig,
  canTakeOver,
  takeOver
};
