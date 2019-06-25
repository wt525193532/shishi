import request from "@/lib/request";
export default {
  getAll(params) {
    return request.post(`./api/services/app/Role/GetAll`, params);
  },
  edit(rid) {
    return request.get(`./api/services/app/Role/Edit?rid=${rid}`);
  },
  create(params) {
    return request.post(`./api/services/app/Role/Create`, params);
  },
  update(params) {
    return request.put(`./api/services/app/Role/Update`, params);
  },
  deleteRole(id) {
    return request.delete(`./api/services/app/Role/Delete?id=${id}`);
  }
};
