import request from "@/lib/request";
export default {
  updateCurrent(parmas) {
    return request.put(
      "./api/services/duty/DutySchedule/UpdateCurrent",
      parmas
    ); // 更新实际的排班信息
  },
  getCurrent() {
    return request.get("./api/services/duty/DutySchedule/GetCurrent"); // 获取当前排班信息
  },
  canTakeOver() {
    return request.post("./api/services/duty/DutySchedule/CanTakeOver"); // 当前用户是否可接班
  },
  getAllHandOverInfo(params) {
    return request.post(
      "./api/services/duty/DutySchedule/GetAllHandOverInfo",
      params
    ); // 分页查询交接班信息
  },
  takeOver() {
    return request.post("./api/services/duty/DutySchedule/TakeOver"); // 当前用户接班
  },
  handOver(parmas) {
    return request.post("./api/services/duty/DutySchedule/HandOver", parmas); // 当前用户交班
  },
  getAllPlan(parmas) {
    return request.post("./api/services/duty/DutySchedule/GetAllPlan", parmas); // 获取全部计划的排班信息
  },
  createPlan(parmas) {
    return request.post("./api/services/duty/DutySchedule/CreatePlan", parmas); // 新增计划的排班信息
  },
  deletePlan(ids) {
    return request.post(`./api/services/duty/DutySchedule/DeletePlan`, ids); // 删除计划的排班信息
  }
};
