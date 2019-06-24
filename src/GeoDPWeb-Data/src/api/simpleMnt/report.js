/**简易监测点数据采集填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/SimpleMnt/GetByStatus", data); // 分页查询所有简易监测点数据采集
  },
  getFormProcessing(data) {
    return request.post("./api/services/dr/SimpleMnt/GetFormProcessing", data); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/RelocationInfo/CancelCommit", data); //简易监测撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/SimpleMnt/Commit", data); // 提交简易监测点数据采集
  },
  create(data) {
    return request.post("./api/services/dr/SimpleMnt/Create", data); // 新增简易监测点数据采集
  },
  edit(id) {
    return request.get(`./api/services/dr/SimpleMnt/Edit?id=${id}`); // 编辑简易监测点数据采集详情
  },
  getById(id) {
    return request.get(`./api/services/dr/SimpleMnt/GetById?id=${id}`); // 查询简易监测点数据采集详情
  },
  update(data) {
    return request.put("./api/services/dr/SimpleMnt/Update", data); // 编辑简易监测点数据采集
  },
  delData(id) {
    return request.delete(`./api/services/dr/SimpleMnt/Delete?Id=${id}`); // 删除简易监测点数据采集
  }
};
