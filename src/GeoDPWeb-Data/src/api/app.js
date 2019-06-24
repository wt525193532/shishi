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

export const getAllEnum = () => request.get("/api/services/app/Enum/GetAllMap"); // 获取全部枚举对象(返回键值对)

export const getAllCode = () => request.get("/api/services/app/Code/GetAllMap"); // 获取全部编码(返回编码键值对)

export default {
  loginByUserName,
  getLoginInfo,
  getUserConfig,
  getAllCode,
  getAllEnum
};
