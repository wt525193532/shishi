/**隐患点基本信息填报接口 */
import request from "@/lib/request";

export default {
  getAdministrative(code) {
    return request.get(
      `./api/services/app/Administrative/GetAdministrative?code=${code}`
    ); // 获取下一级区域
  },
  generateGeositeCode(data) {
    return request.post("/api/services/dr/Geosite/GenerateGeositeCode", data); // 生成隐患点编号
  },
  create(data) {
    return request.post("/api/services/dr/BasicInfo/Create", data); // 创建基本信息
  },
  getByStatus(data) {
    return request.post("./api/services/dr/BasicInfo/GetByStatus", data); // 获取各个状态的隐患点基本信息数据
  },
  getFormProcessing(data) {
    return request.post("./api/services/dr/BasicInfo/GetFormProcessing", data); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/BasicInfo/CancelCommit", data); // 隐患点基本信息撤销申请
  },
  cancelGeosite(data) {
    return request.post("./api/services/dr/BasicInfo/CancelGeosite", data); // 隐患点基本信息销号
  },
  commit(data) {
    return request.post("./api/services/dr/BasicInfo/Commit", data); // 提交隐患点基本信息至审批流程
  },
  delData(id) {
    return request.delete(`./api/services/dr/BasicInfo/Delete?Id=${id}`); // 删除隐患点
  },
  getById(id) {
    return request.get(`./api/services/dr/BasicInfo/GetById/?id=${id}`); // 查询基本信息（按隐患点id）
  },
  edit(id) {
    return request.get(`./api/services/dr/BasicInfo/Edit?id=${id}`); // 查询基本信息（按隐患点id）
  },
  queryBasicInfo(data) {
    return request.post(`./api/services/dr/Geosite/QueryAll`, data); // 分页查询隐患点(根据隐患点名称和编号)
  },
  update(data) {
    return request.put("/api/services/dr/BasicInfo/Update", data); // 修改基本信息
  }
};
