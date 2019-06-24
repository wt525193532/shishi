import request from "@/lib/request";
export default {
  createItem(params) {
    return request.post("./api/services/duty/AvoidRiskInfo/CreateItem", params); // 新增待上报的灾险情数据
  },
  saveEditItem(params) {
    return request.post(
      "./api/services/duty/AvoidRiskInfo/SaveEditItem",
      params
    ); // 保存编辑后的灾险情数据
  },
  queryItems(params) {
    return request.post("./api/services/duty/AvoidRiskInfo/QueryItems", params); // 分页查询灾险情数据
  },
  queryReportedItems(params) {
    return request.post(
      "./api/services/duty/AvoidRiskInfo/QueryReportedItems",
      params
    ); // 分页查询已上报给我的灾险情数据项
  },
  queryReportedTables(params) {
    return request.post(
      "./api/services/duty/AvoidRiskInfo/QueryReportedTables",
      params
    ); // 分页查询已上报给我的灾险情数据表
  },
  report(params) {
    return request.post("./api/services/duty/AvoidRiskInfo/Report", params); // 灾险情数据表上报
  },
  editItem(id) {
    return request.get(`./api/services/duty/AvoidRiskInfo/EditItem?id=${id}`); // 获取待编辑的灾险情数据
  },
  getItem(id) {
    return request.get(`./api/services/duty/AvoidRiskInfo/GetItem?id=${id}`); // 获取灾险情数据
  },
  deleteItem(id) {
    return request.delete(
      `./api/services/duty/AvoidRiskInfo/DeleteItem?id=${id}`
    ); // 灾险情数据表上报
  }
};
