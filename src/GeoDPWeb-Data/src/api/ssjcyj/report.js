/**自动化实时监测预警明细表接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/AutoMonAlarmDetail/GetByStatus",
      data
    );
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/AutoMonAlarmDetail/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/AutoMonAlarmDetail/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post("./api/services/dr/AutoMonAlarmDetail/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/AutoMonAlarmDetail/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/AutoMonAlarmDetail/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(
      `./api/services/dr/AutoMonAlarmDetailQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put("./api/services/dr/AutoMonAlarmDetail/Update", data);
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/AutoMonAlarmDetail/Delete?Id=${id}`
    );
  }
};
