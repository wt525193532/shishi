import request from "@/lib/request";
export default {
  getAllPermissions() {
    return request.get(`./api/services/app/Authorization/GetAllPermissons`);
  },
  getAllPermissonsTree() {
    return request.get(`./api/services/app/Authorization/GetAllPermissonsTree`);
  }
};
