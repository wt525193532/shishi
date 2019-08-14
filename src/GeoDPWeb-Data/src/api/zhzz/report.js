/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/CompreControl/GetByStatus", data);
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/CompreControl/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/CompreControl/CancelCommit", data);
  },
  commit(data) {
    return request.post("./api/services/dr/CompreControl/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/CompreControl/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/CompreControl/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(`./api/services/dr/CompreControlQuery/GetById?id=${id}`);
  },
  update(data) {
    return request.put("./api/services/dr/CompreControl/Update", data);
  },
  delData(id) {
    return request.delete(`./api/services/dr/CompreControl/Delete?Id=${id}`);
  }
};
