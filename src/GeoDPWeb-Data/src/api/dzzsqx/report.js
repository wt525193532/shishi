/**地质灾害驻守技术支撑抢险调查表接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/TechnicalSuppQuestionnaire/GetByStatus",
      data
    );
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/TechnicalSuppQuestionnaire/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/TechnicalSuppQuestionnaire/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post(
      "./api/services/dr/TechnicalSuppQuestionnaire/Commit",
      data
    );
  },
  create(data) {
    return request.post(
      "./api/services/dr/TechnicalSuppQuestionnaire/Create",
      data
    );
  },
  edit(id) {
    return request.get(
      `./api/services/dr/TechnicalSuppQuestionnaire/Edit?id=${id}`
    );
  },
  getById(id) {
    return request.get(
      `./api/services/dr/TechnicalSuppQuestionnaireQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put(
      "./api/services/dr/TechnicalSuppQuestionnaire/Update",
      data
    );
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/TechnicalSuppQuestionnaire/Delete?Id=${id}`
    );
  }
};
