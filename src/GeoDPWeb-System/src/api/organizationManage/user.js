import request from "@/lib/request";
export default {
  getAllByUnit(params) {
    return request.post(`./api/services/app/User/GetAllByUnit`, params);
  },
  getAll(params) {
    return request.post(`./api/services/app/User/GetAll`, params);
  },
  getUser(id) {
    return request.get(`./api/services/app/User/Get?id=${id}`);
  },
  create(params) {
    return request.post(`./api/services/app/User/Create`, params);
  },
  update(params) {
    return request.put(`./api/services/app/User/Update`, params);
  },
  deleteUser(id) {
    return request.delete(`./api/services/app/User/Delete?id=${id}`);
  }
};
