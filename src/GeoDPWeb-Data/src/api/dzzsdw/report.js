/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/GeoTechnicalSupportUnit/GetByStatus",
      data
    );
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/GeoTechnicalSupportUnit/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/GeoTechnicalSupportUnit/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post(
      "./api/services/dr/GeoTechnicalSupportUnit/Commit",
      data
    );
  },
  create(data) {
    return request.post(
      "./api/services/dr/GeoTechnicalSupportUnit/Create",
      data
    );
  },
  edit(id) {
    return request.get(
      `./api/services/dr/GeoTechnicalSupportUnit/Edit?id=${id}`
    );
  },
  getById(id) {
    return request.get(
      `./api/services/dr/GeoTechnicalSupportUnitQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put(
      "./api/services/dr/GeoTechnicalSupportUnit/Update",
      data
    );
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/GeoTechnicalSupportUnit/Delete?Id=${id}`
    );
  }
};
