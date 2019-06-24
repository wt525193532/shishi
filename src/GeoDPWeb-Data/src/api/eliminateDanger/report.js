/**应急排危数据采集填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/EliminateInfo/GetByStatus", data); // 分页查询所有应急排危数据采集
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/EliminateInfo/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/EliminateInfo/CancelCommit", data); // 防灾明白卡撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/EliminateInfo/Commit", data); // 提交应急排危数据采集
  },
  create(data) {
    return request.post("./api/services/dr/EliminateInfo/Create", data); // 新增应急排危数据采集
  },
  edit(id) {
    return request.get(`./api/services/dr/EliminateInfo/Edit?id=${id}`); // 查询避险明白卡详情
  },
  getById(id) {
    return request.get(`./api/services/dr/EliminateInfo/GetById?id=${id}`); // 查询避险明白卡详情
  },
  update(data) {
    return request.put("./api/services/dr/EliminateInfo/Update", data); // 编辑应急排危数据采集
  },
  delData(id) {
    return request.delete(`./api/services/dr/EliminateInfo/Delete?Id=${id}`); // 删除应急排危数据采集
  }
};
