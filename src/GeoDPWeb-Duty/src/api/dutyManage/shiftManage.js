import request from "@/lib/request";

export default {
  getAll() {
    return request.get("./api/services/duty/DutyOrder/GetAll"); // 获取全部班次信息
  },
  edit(id) {
    return request.get(`./api/services/duty/DutyOrder/Edit?id=${id}`); // 获取待编辑的班次
  },
  save(data) {
    return request.post("./api/services/duty/DutyOrder/Save", data); // 保存班次(新增或修改)
  },
  saveBatch(data) {
    return request.post("./api/services/duty/DutyOrder/SaveBatch", data); // 批量保存班次(新增或修改)
  },
  delShift(id) {
    return request.delete(`./api/services/duty/DutyOrder/Delete?id=${id}`); // 删除班次
  }
};
