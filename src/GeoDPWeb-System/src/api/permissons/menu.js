import request from "@/lib/request";
export default {
  getAll() {
    return request.get(`./api/services/app/Navigation/GetAll`);
  },
  createOrUpdate(params) {
    return request.post(`./api/services/app/Navigation/CreateOrUpdate`, params);
  },
  deleteMenu(id) {
    return request.delete(`./api/services/app/Navigation/Delete?id=${id}`);
  }
};
