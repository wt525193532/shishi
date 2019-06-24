import request from "@/lib/request";

export const loginByUserName = data => {
  return request.post("/api/TokenAuth/Authenticate", data);
};

export const getLoginInfo = () =>
  request.get("/api/services/app/Session/GetCurrentLoginInformations");
export const getCurrentUserConfig = () =>
  request.get("./api/services/app/Session/GetCurrentUserConfig");

export const getUserConfig = () =>
  request.get("/api/services/app/Session/GetUserConfig");

export const ChangePassword = data => {
  return request.post("/api/services/app/User/ChangePassword", data);
};
export const UpdateProfile = data => {
  return request.put("/api/services/app/User/UpdateProfile", data);
};
export default {
  loginByUserName,
  getLoginInfo,
  getUserConfig,
  ChangePassword,
  UpdateProfile
};
