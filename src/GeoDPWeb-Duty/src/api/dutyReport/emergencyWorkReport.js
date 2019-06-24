import request from "@/lib/request";
export default {
  createItem(data) {
    return request.post("./api/services/duty/MonthStatistic/CreateItem", data); //新增待上报的灾险情数据
  },
  editItem(id) {
    return request.get(`./api/services/duty/MonthStatistic/EditItem?id=${id}`); //获取待编辑的灾险情数据
  },
  saveEditItem(data) {
    return request.post(
      "./api/services/duty/MonthStatistic/SaveEditItem",
      data
    ); //保存编辑后的灾险情数据
  },
  deleteItem(id) {
    return request.delete(
      `./api/services/duty/MonthStatistic/DeleteItem?id=${id}`
    ); //删除灾险情数据
  },
  getItem(id) {
    return request.get(`./api/services/duty/MonthStatistic/GetItem?id=${id}`); //获取灾险情数据
  },
  queryItems(data) {
    return request.post("./api/services/duty/MonthStatistic/QueryItems", data); //分页查询灾险情数据
  },
  report(data) {
    return request.post("./api/services/duty/MonthStatistic/Report", data); //灾险情数据表上报
  }
};
