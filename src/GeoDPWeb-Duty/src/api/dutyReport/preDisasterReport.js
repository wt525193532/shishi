import request from "@/lib/request";
export default {
  createItem(data) {
    return request.post("./api/services/duty/DayStatistic/CreateItem", data); //新增待上报的灾险情数据
  },
  editItem(id) {
    return request.get(`./api/services/duty/DayStatistic/EditItem?id=${id}`); //获取待编辑的灾险情数据
  },
  saveEditItem(data) {
    return request.post("./api/services/duty/DayStatistic/SaveEditItem", data); //保存编辑后的灾险情数据
  },
  deleteItem(id) {
    return request.delete(
      `./api/services/duty/DayStatistic/DeleteItem?id=${id}`
    ); //删除灾险情数据
  },
  getItem(id) {
    return request.get(`./api/services/duty/DayStatistic/GetItem?id=${id}`); //获取灾险情数据
  },
  queryItems(data) {
    return request.post("./api/services/duty/DayStatistic/QueryItems", data); //分页查询灾险情数据
  },
  queryReportedItems(data) {
    return request.post(
      "./api/services/duty/DayStatistic/QueryReportedItems",
      data
    ); //分页查询已上报给我的灾险情数据项
  },
  queryReportedTables(data) {
    return request.post(
      "./api/services/duty/DayStatistic/QueryReportedTables",
      data
    ); //分页查询已上报给我的灾险情数据表
  },
  report(data) {
    return request.post("./api/services/duty/DayStatistic/Report", data); //灾险情数据表上报
  }
};
