/**地质灾害驻守技术支撑工作报表接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/TechnicalSupportReport/GetByStatus",
      data
    );
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/TechnicalSupportReport/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/TechnicalSupportReport/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post(
      "./api/services/dr/TechnicalSupportReport/Commit",
      data
    );
  },
  create(data) {
    return request.post(
      "./api/services/dr/TechnicalSupportReport/Create",
      data
    );
  },
  edit(id) {
    return request.get(
      `./api/services/dr/TechnicalSupportReport/Edit?id=${id}`
    );
  },
  getById(id) {
    return request.get(
      `./api/services/dr/TechnicalSupportReportQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put("./api/services/dr/TechnicalSupportReport/Update", data);
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/TechnicalSupportReport/Delete?Id=${id}`
    );
  }
};
