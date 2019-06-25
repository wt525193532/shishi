import request from "@/lib/request";
export default {
  getAllFlow() {
    return request.get(`./api/services/app/ApprovalSetting/GetAllFlow`);
  },
  getAllFlowWithNodes() {
    return request.get(
      `./api/services/app/ApprovalSetting/GetAllFlowWithNodes`
    );
  },
  createNode(params) {
    return request.post(
      `./api/services/app/ApprovalSetting/CreateNode`,
      params
    );
  },
  updateNode(params) {
    return request.put(`./api/services/app/ApprovalSetting/UpdateNode`, params);
  },
  deleteNode(id) {
    return request.delete(
      `./api/services/app/ApprovalSetting/DeleteNode?id=${id}`
    );
  },
  updateObject(params) {
    return request.put(
      `./api/services/app/ApprovalSetting/UpdateObject`,
      params
    );
  },
  getObject(id) {
    return request.get(`./api/services/app/ApprovalSetting/GetObject?id=${id}`);
  },
  getAllObjects(params) {
    return request.post(
      `./api/services/app/ApprovalSetting/GetAllObjects`,
      params
    );
  }
};
