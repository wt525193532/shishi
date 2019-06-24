import request from "@/lib/request";
export default {
  getWorkspaceByCode() {
    return request.get("./api/services/app/Organization/GetWorkspaceByCode"); // 获取工作单位(按行政区划编号)
  },
  getAdministrative(code) {
    return request.get(
      `./api/services/app/Administrative/GetAdministrative?code=${code}`
    ); // 获取行政区划（只含下一级区划）
  }
};
