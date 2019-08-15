/**民生工程接口 */
import request from "@/lib/request";
export default {
  getByStatus(data) {
    return request.post(
      "./api/services/dr/PeopleLiveProject/GetByStatus",
      data
    );
  },
  getFormProcessing(data) {
    return request.post(
      "./api/services/dr/PeopleLiveProject/GetFormProcessing",
      data
    );
  },
  cancelCommit(data) {
    return request.post(
      "./api/services/dr/PeopleLiveProject/CancelCommit",
      data
    );
  },
  commit(data) {
    return request.post("./api/services/dr/PeopleLiveProject/Commit", data);
  },
  create(data) {
    return request.post("./api/services/dr/PeopleLiveProject/Create", data);
  },
  edit(id) {
    return request.get(`./api/services/dr/PeopleLiveProject/Edit?id=${id}`);
  },
  getById(id) {
    return request.get(
      `./api/services/dr/PeopleLiveProjectQuery/GetById?id=${id}`
    );
  },
  update(data) {
    return request.put("./api/services/dr/PeopleLiveProject/Update", data);
  },
  delData(id) {
    return request.delete(
      `./api/services/dr/PeopleLiveProject/Delete?Id=${id}`
    );
  }
};
