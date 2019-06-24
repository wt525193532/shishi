/**应急避让场所采集填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/EmShelter/GetByStatus", data); // 分页查询所有应急避让场所采集
  },
  getFormProcessing(data) {
    return request.post("./api/services/dr/EmShelter/GetFormProcessing", data); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/EmShelter/CancelCommit", data); // 应急避让场所采集撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/EmShelter/Commit", data); // 提交应急避让场所采集
  },
  create(data) {
    return request.post("./api/services/dr/EmShelter/Create", data); // 新增应急避让场所采集
  },
  getById(id) {
    return request.get(`./api/services/dr/EmShelter/GetById?id=${id}`); // 查询应急避让场所采集详情
  },
  update(data) {
    return request.put("./api/services/dr/EmShelter/Update", data); // 编辑应急避让场所采集
  },
  delData(id) {
    return request.delete(`./api/services/dr/EmShelter/Delete?Id=${id}`); // 删除应急避让场所采集
  }
};
