import request from "@/lib/request";
export default {
  getAllByUnit(parms) {
    return request.post("./api/services/app/User/GetAllByUnit", parms); // 根据组织单元获取用户(包括: 工作单位 )
  }
};
