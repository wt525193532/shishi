/**培训演练填报接口 */
import request from "@/lib/request";
export default {
  create(data) {
    return request.post("./api/services/dr/Training/Create", data); // 新增培训演练
  },
  edit(id) {
    return request.get(`./api/services/dr/Training/Edit?id=${id}`); // 编辑培训演练详情
  },
  update(data) {
    return request.put("./api/services/dr/Training/Update", data); // 更新培训演练
  },
  getById(id) {
    return request.get(`./api/services/dr/TrainingQuery/GetById?id=${id}`); // 查询培训演练详情
  },
  delData(id) {
    return request.delete(`./api/services/dr/Training/Delete?Id=${id}`); // 删除培训演练
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/Training/CancelCommit", data); //简易监测撤销申请
  },
  getByStatus(data) {
    return request.post("./api/services/dr/Training/GetByStatus", data); // 分页查询所有培训演练(按数据状态)
  },
  commit(data) {
    return request.post("./api/services/dr/Training/Commit", data); // 提交培训演练
  }
};
