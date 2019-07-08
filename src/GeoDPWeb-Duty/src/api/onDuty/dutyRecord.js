import request from "@/lib/request";

export default {
  create(data) {
    return request.post("./api/services/duty/DutyRecord/Create", data); // 添加值班记录
  },
  update(data) {
    return request.put("./api/services/duty/DutyRecord/Update", data); // 修改值班记录
  },
  getAllCurrent(data) {
    return request.post("./api/services/duty/DutyRecord/GetAllCurrent", data); // 分页查询当班记录
  },
  getAll(data) {
    return request.post("./api/services/duty/DutyRecord/GetAll", data); // 分页查询所有值班记录
  },
  getAllByKey(data) {
    return request.put("./api/services/duty/DutyRecord/GetAllByKey", data); // 分页查询所有值班记录(按关键词)
  }
};
