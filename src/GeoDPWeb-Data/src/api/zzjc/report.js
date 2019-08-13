/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/FullTimeMonitoring/GetByStatus",
      data
    );
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/FullTimeMonitoring/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/FullTimeMonitoring/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post("./api/services/dr/FullTimeMonitoring/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/FullTimeMonitoring/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/FullTimeMonitoring/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(
      `./api/services/dr/FullTimeMonitoringQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put("./api/services/dr/FullTimeMonitoring/Update", data);
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/FullTimeMonitoring/Delete?Id=${id}`
    );
  }
};
