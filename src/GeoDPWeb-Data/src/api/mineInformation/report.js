/**矿山基本信息填报接口 */
import request from "@/lib/request";

export default {
  getAdministrative(code) {
    return request.get(
      `./api/services/app/Administrative/GetAdministrative?code=${code}`
    ); // 获取下一级区域
  },
  generateGeositeCode() {
    return request.post("/api/services/dr/MineInfo/GenerateGeositeCode"); // 生成矿山编号
  },
  create(data) {
    return request.post("/api/services/dr/MineInfo/Create", data); // 创建基本信息
  },
  getByStatus(data) {
    return request.post("./api/services/dr/MineInfoQuery/GetByStatus", data); // 获取各个状态的矿山基本信息数据
  },
  getFormProcessing(data) {
    return request.post("./api/services/dr/MineInfo/GetFormProcessing", data); // 分页查询审核单（审核中的）
  },
  cancel(id) {
    return request.post(`./api/services/dr/MineInfo/Cancel?formid=${id}`); // 矿山基本信息撤销申请
  },
  cancelGeosite(data) {
    return request.post("./api/services/dr/Geosite/CancelGeosite", data); // 矿山基本信息销号
  },
  commit(data) {
    return request.post("./api/services/dr/MineInfo/Commit", data); // 提交矿山基本信息至审批流程
  },
  delData(id) {
    return request.delete(`./api/services/dr/MineInfo/Delete?Id=${id}`); // 删除矿山
  },
  getById(id) {
    return request.get(`./api/services/dr/MineInfoQuery/GetById/?id=${id}`); // 查询基本信息（按矿山id）
  },
  edit(id) {
    return request.get(`./api/services/dr/MineInfo/Edit?id=${id}`); // 查询基本信息（按矿山id）
  },
  queryMineInfo(data) {
    return request.post(`./api/services/dr/MineInfoQuery/GetAll`, data); // 分页查询矿山(根据矿山名称和编号)
  },
  queryAllMineInfo(data) {
    return request.post(`./api/services/dr/MineInfoQuery/QueryAll`, data); // 多条件查询矿山(根据矿山名称和编号)
  },
  update(data) {
    return request.put("/api/services/dr/MineInfo/Update", data); // 修改基本信息
  }
};
