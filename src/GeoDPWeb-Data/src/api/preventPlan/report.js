/**防灾预案表填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/PreventionPlan/GetByStatus", data); // 分页查询所有防灾预案
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/PreventionPlan/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/PreventionPlan/CancelCommit", data); // 防灾预案撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/PreventionPlan/Commit", data); // 提交防灾预案表
  },
  create(data) {
    return request.post("./api/services/dr/PreventionPlan/Create", data); // 新增防灾预案
  },
  edit(id) {
    return request.get(`./api/services/dr/PreventionPlan/Edit?id=${id}`); // 查询防灾预案详情
  },
  getById(id) {
    return request.get(
      `./api/services/dr/PreventionPlanQuery/GetById?id=${id}`
    ); // 查询防灾预案详情
  },
  update(data) {
    return request.put("./api/services/dr/PreventionPlan/Update", data); // 编辑防灾预案
  },
  delData(id) {
    return request.delete(`./api/services/dr/PreventionPlan/Delete?Id=${id}`); // 删除防灾预案表
  }
};
