/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/GeoPatrol/GetByStatus", data);
  },
  getFormProcessing(data) {
    return request.post("./api/services/dr/GeoPatrol/GetFormProcessing", data);
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/GeoPatrol/CancelCommit", data);
  },
  commit(data) {
    return request.post("./api/services/dr/GeoPatrol/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/GeoPatrol/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/GeoPatrol/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(`./api/services/dr/GeoPatrolQuery/GetById?id=${id}`);
  },
  update(data) {
    return request.put("./api/services/dr/GeoPatrol/Update", data);
  },
  delData(id) {
    return request.delete(`./api/services/dr/GeoPatrol/Delete?Id=${id}`);
  }
};
