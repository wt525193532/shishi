/**工程填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/EngineerInfo/GetByStatus", data); // 分页查询所有工程
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/EngineerInfo/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/EngineerInfo/CancelCommit", data); // 工程撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/EngineerInfo/Commit", data); // 提交工程
  },
  create(data) {
    return request.post("./api/services/dr/EngineerInfo/Create", data); // 新增工程
  },
  edit(id) {
    return request.get(`./api/services/dr/EngineerInfo/Edit?id=${id}`); // 查询避险明白卡详情
  },
  getById(id) {
    return request.get(`./api/services/dr/EngineerInfo/GetById?id=${id}`); // 查询避险明白卡详情
  },
  update(data) {
    return request.put("./api/services/dr/EngineerInfo/Update", data); // 编辑工程
  },
  delData(id) {
    return request.delete(`./api/services/dr/EngineerInfo/Delete?Id=${id}`); // 删除工程
  }
};
