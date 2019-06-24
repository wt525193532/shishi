import request from "@/lib/request";
export default {
  getById: id => {
    var res = request.get(`./api/services/dr/MineInfoQuery/GetById/?id=${id}`); // 查询基本信息（按隐患点id）
    return res;
  },
  getByCode: code => {
    var res = request.get(
      `./api/services/dr/MineInfoQuery/GetByCode/?code=${code}`
    ); // 查询基本信息（按隐患点id）
    return res;
  }
};
