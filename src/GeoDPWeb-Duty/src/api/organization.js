import request from "@/lib/request";
export default {
  getAllByCode(params) {
    let acode = "";
    if (params) {
      acode = "?acode=" + params;
    }
    return request.get("./api/services/app/Workspace/GetAllByCode" + acode); // 获取工作单位(按行政区划编号)
  },
  getAdministrative(code) {
    return request.get(
      `./api/services/app/Administrative/GetAdministrative?code=${code}`
    ); // 获取行政区划（只含下一级区划）
  }
};
