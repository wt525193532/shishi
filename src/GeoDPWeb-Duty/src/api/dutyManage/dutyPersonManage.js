import request from "@/lib/request";

export default {
  getAllPeople(data) {
    return request.post(`./api/services/duty/DutyPerson/GetAllPeople`, data); // 获取全部人员信息
  },
  getAllUserNotInDuty(data) {
    return request.post(
      `./api/services/duty/DutyPerson/GetAllUserNotInDuty`,
      data
    ); // 获取未添加到值班人中的用户
  },
  getAllTeam(data) {
    return request.post(`./api/services/duty/DutyPerson/GetAllTeam`, data); // 获取全部应急小组信息
  },
  addPerson(data) {
    return request.post("./api/services/duty/DutyPerson/AddPerson", data); // 添加值班人员
  },
  saveTeam(data) {
    return request.post("./api/services/duty/DutyPerson/SaveTeam", data); // 保存组信息(新增或修改)
  },
  editTeam(id) {
    return request.get(`./api/services/duty/DutyPerson/EditTeam?id=${id}`); // 获取待编辑的组
  },
  removePerson(id) {
    return request.delete(
      `./api/services/duty/DutyPerson/RemovePerson?id=${id}`
    ); // 删除值班人
  },
  deleteTeam(id) {
    return request.delete(`./api/services/duty/DutyPerson/DeleteTeam?id=${id}`); // 删除小组信息
  },
  getAllUser(data) {
    return request.post("./api/services/app/UserQuery/GetAll", data); // 获取全部用户信息
  }
};
