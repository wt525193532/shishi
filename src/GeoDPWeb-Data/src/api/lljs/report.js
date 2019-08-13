/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/CapacityBuilding/GetByStatus", data);
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/CapacityBuilding/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/CapacityBuilding/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post("./api/services/dr/CapacityBuilding/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/CapacityBuilding/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/CapacityBuilding/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(
      `./api/services/dr/CapacityBuildingQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put("./api/services/dr/CapacityBuilding/Update", data);
  },
  delData(id) {
    return request.delete(`./api/services/dr/CapacityBuilding/Delete?Id=${id}`);
  }
};
