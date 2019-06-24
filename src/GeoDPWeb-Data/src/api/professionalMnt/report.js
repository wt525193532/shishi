/**专业监测点数据采集填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post("./api/services/dr/ProfessionalMnt/GetByStatus", data); // 分页查询所有专业监测点数据采集
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/ProfessionalMnt/GetFormProcessing",
      data
    ); // 分页查询审核单（审核中的）
  },
  cancelCommit(data) {
    return request.post("./api/services/dr/ProfessionalMnt/CancelCommit", data); // 专业监测点撤销申请
  },
  commit(data) {
    return request.post("./api/services/dr/ProfessionalMnt/Commit", data); // 提交专业监测点数据采集
  },
  create(data) {
    return request.post("./api/services/dr/ProfessionalMnt/Create", data); // 新增专业监测点数据采集
  },
  edit(id) {
    return request.get(`./api/services/dr/ProfessionalMnt/Edit?id=${id}`); // 编辑专业监测点数据采集详情
  },
  getById(id) {
    return request.get(`./api/services/dr/ProfessionalMnt/GetById?id=${id}`); // 查询专业监测点数据采集详情
  },
  update(data) {
    return request.put("./api/services/dr/ProfessionalMnt/Update", data); // 编辑专业监测点数据采集
  },
  delData(id) {
    return request.delete(`./api/services/dr/ProfessionalMnt/Delete?Id=${id}`); // 删除专业监测点数据采集
  }
};
