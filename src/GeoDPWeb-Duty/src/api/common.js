import request from "@/lib/request";
export default {
  getAll() {
    return request.get("./api/services/duty/DutyOrder/GetAll"); // 获取全部班次信息
  },
  getAllByType(parmas) {
    return request.post("./api/services/duty/DutyPerson/GetAllByType", parmas); // 获取全部人员信息(按值班人类型)
  },
  getAllTeam(parmas) {
    return request.post("./api/services/duty/DutyPerson/GetAllTeam", parmas); // 获取全部应急小组信息
  },
  getCurrent() {
    return request.get("./api/services/duty/DutySchedule/GetCurrent"); // 获取当前排班信息
  }
};
