import request from "@/lib/request";
export default {
  createItem(data) {
    return request.post("./api/services/duty/DisasterInfo/CreateItem", data); //新增待上报的灾险情数据
  },
  editItem(id) {
    return request.get(`./api/services/duty/DisasterInfo/EditItem?id=${id}`); //获取待编辑的灾险情数据
  },
  saveEditItem(data) {
    return request.post("./api/services/duty/DisasterInfo/SaveEditItem", data); //保存编辑后的灾险情数据
  },
  deleteItem(id) {
    return request.delete(
      `./api/services/duty/DisasterInfo/DeleteItem?id=${id}`
    ); //删除灾险情数据
  },
  getItem(id) {
    return request.get(`./api/services/duty/DisasterInfo/GetItem?id=${id}`); //获取灾险情数据
  },
  queryItems(data) {
    return request.post("./api/services/duty/DisasterInfo/QueryItems", data); //分页查询灾险情数据
  },
  queryReportedItems(data) {
    return request.post(
      "./api/services/duty/DisasterInfo/QueryReportedItems",
      data
    ); //分页查询已上报给我的灾险情数据项
  },
  queryReportedTables(data) {
    return request.post(
      "./api/services/duty/DisasterInfo/QueryReportedTables",
      data
    ); //分页查询已上报给我的灾险情数据表
  },
  report(data) {
    return request.post("./api/services/duty/DisasterInfo/Report", data); //灾险情数据表上报
  }
};
