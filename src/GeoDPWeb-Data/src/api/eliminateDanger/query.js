import request from "@/lib/request";
export default {
  getById: data => {
    return request.get(
      `./api/services/dr/EliminateInfoQuery/GetById/?id=${data}`
    );
  }, // 查询基本信息（按隐患点id）
  getByCode: code => {
    return request.get(
      `./api/services/dr/EliminateInfoQuery/GetByCode/?code=${code}`
    );
  } // 查询基本信息（按隐患点编号）
};
