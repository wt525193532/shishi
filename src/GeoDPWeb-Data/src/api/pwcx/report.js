/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/RiskRemoval/GetByStatus", data);
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/RiskRemoval/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/RiskRemoval/CancelCommit", data);
  },
  commit(data) {
    return request.post("./api/services/dr/RiskRemoval/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/RiskRemoval/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/RiskRemoval/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(`./api/services/dr/RiskRemovalQuery/GetById?id=${id}`);
  },
  update(data) {
    return request.put("./api/services/dr/RiskRemoval/Update", data);
  },
  delData(id) {
    return request.delete(`./api/services/dr/RiskRemoval/Delete?Id=${id}`);
  }
};
