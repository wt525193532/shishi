/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/RelocationPlan/GetByStatus", data);
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/RelocationPlan/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/RelocationPlan/CancelCommit", data);
  },
  commit(data) {
    return request.post("./api/services/dr/RelocationPlan/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/RelocationPlan/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/RelocationPlan/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(
      `./api/services/dr/RelocationPlanQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put("./api/services/dr/RelocationPlan/Update", data);
  },
  delData(id) {
    return request.delete(`./api/services/dr/RelocationPlan/Delete?Id=${id}`); // 删除应急排危数据采集
  }
};
