/**防灾明白卡填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/MineEngineer/GetByStatus", data); // 分页查询所有防灾明白卡
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/MineEngineer/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancel(id) {
    return request.post(`./api/services/dr/MineEngineer/Cancel?formid=${id}`); // 防灾明白卡撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/MineEngineer/Commit", data); // 提交防灾明白卡
  },
  create(data) {
    return request.post("./api/services/dr/MineEngineer/Create", data); // 新增防灾明白卡
  },
  getById(id) {
    return request.get(`./api/services/dr/MineEngineer/GetById?id=${id}`); // 查询防灾明白卡详情
  },
  edit(id) {
    return request.get(`./api/services/dr/MineEngineer/Edit?id=${id}`); // 查询防灾明白卡详情
  },
  update(data) {
    return request.put("./api/services/dr/MineEngineer/Update", data); // 编辑防灾明白卡
  },
  delData(id) {
    return request.delete(`./api/services/dr/MineEngineer/Delete?Id=${id}`); // 删除防灾明白卡
  }
};
