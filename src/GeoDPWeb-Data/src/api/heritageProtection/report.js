/**避险明白卡填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/HeritageProtection/GetByStatus",
      data
    ); // 分页查询所有避险明白卡
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/HeritageProtection/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/HeritageProtection/CancelCommit",
      data
    ); // 避险明白卡撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/HeritageProtection/Commit", data); // 提交避险明白卡
  },
  create(data) {
    return request.post("./api/services/dr/HeritageProtection/Create", data); // 新增避险明白卡
  },
  edit(id) {
    return request.get(`./api/services/dr/HeritageProtection/Edit?id=${id}`); // 查询避险明白卡详情
  },
  getById(id) {
    return request.get(`./api/services/dr/HeritageProtection/GetById?id=${id}`); // 查询避险明白卡详情
  },
  update(data) {
    return request.put("./api/services/dr/HeritageProtection/Update", data); // 编辑避险明白卡
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/HeritageProtection/Delete?Id=${id}`
    ); // 删除避险明白卡
  }
};
