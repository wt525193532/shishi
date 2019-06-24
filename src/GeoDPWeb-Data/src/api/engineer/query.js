import request from "@/lib/request";
export default {
  getById: id => {
    return request.get(`./api/services/dr/EngineerInfoQuery/GetById?id=${id}`);
  }, // 查询基本信息（按隐患点id）
  getByCode: code => {
    return request.get(
      `./api/services/dr/EngineerInfoQuery/GetByCode/?code=${code}`
    );
  } // 查询基本信息（按隐患点编号）
};
