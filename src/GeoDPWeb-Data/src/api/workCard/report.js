/**防灾明白卡填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/WorkCard/GetByStatus", data); // 分页查询所有防灾明白卡
  },
  getFormProcessing(data) {
    return request.post("./api/services/dr/WorkCard/GetFormProcessing", data); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/WorkCard/CancelCommit", data); // 防灾明白卡撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/WorkCard/Commit", data); // 提交防灾明白卡
  },
  create(data) {
    return request.post("./api/services/dr/WorkCard/Create", data); // 新增防灾明白卡
  },
  edit(id) {
    return request.get(`./api/services/dr/WorkCard/Edit?id=${id}`); // 查询避险明白卡详情
  },
  getById(id) {
    return request.get(`./api/services/dr/WorkCard/GetById?id=${id}`); // 查询避险明白卡详情
  },
  update(data) {
    return request.put("./api/services/dr/WorkCard/Update", data); // 编辑防灾明白卡
  },
  delData(id) {
    return request.delete(`./api/services/dr/WorkCard/Delete?Id=${id}`); // 删除防灾明白卡
  }
};
