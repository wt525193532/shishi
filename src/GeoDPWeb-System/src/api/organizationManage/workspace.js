import request from "@/lib/request";
export default {
  getAllByCode(params) {
    let acode = "";
    if (params) {
      acode = "?acode=" + params;
    }
    return request.get("./api/services/app/Workspace/GetAllByCode" + acode); // 获取工作单位(按行政区划编号)
  },
  createDepartment(params) {
    return request.post(
      `./api/services/app/Workspace/CreateDepartment`,
      params
    );
  },
  createWorkspace(params) {
    return request.post(`./api/services/app/Workspace/CreateWorkspace`, params);
  },
  updateWorkspace(params) {
    return request.put(`./api/services/app/Workspace/UpdateWorkspace`, params);
  },
  updateDepartment(params) {
    return request.put(`./api/services/app/Workspace/UpdateDepartment`, params);
  },
  delDepartment(id) {
    return request.delete(
      `./api/services/app/Workspace/DeleteDepartment?oid=${id}`
    );
  },
  delWorkspace(id) {
    return request.delete(
      `./api/services/app/Workspace/DeleteWorkspace?oid=${id}`
    );
  }
};
