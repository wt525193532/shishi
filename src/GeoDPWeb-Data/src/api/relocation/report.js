/**搬迁避让数据采集填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/RelocationInfo/GetByStatus", data); // 分页查询所有搬迁避让数据采集
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/RelocationInfo/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/RelocationInfo/CancelCommit", data); // 搬迁避让撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/RelocationInfo/Commit", data); // 提交搬迁避让数据采集
  },
  create(data) {
    return request.post("./api/services/dr/RelocationInfo/Create", data); // 新增搬迁避让数据采集
  },
  edit(id) {
    return request.get(`./api/services/dr/RelocationInfo/Edit?id=${id}`); // 查询避险明白卡详情
  },
  getById(id) {
    return request.get(`./api/services/dr/RelocationInfo/GetById?id=${id}`); // 查询避险明白卡详情
  },
  update(data) {
    return request.put("./api/services/dr/RelocationInfo/Update", data); // 编辑搬迁避让数据采集
  },
  delData(id) {
    return request.delete(`./api/services/dr/RelocationInfo/Delete?Id=${id}`); // 删除搬迁避让数据采集
  }
};
