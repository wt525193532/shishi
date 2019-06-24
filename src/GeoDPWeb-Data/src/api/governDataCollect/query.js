/**矿山治理数据采集查询接口 */
import request from "@/lib/request";
export default {
  //查询全部信息
  getById: id => {
    var res = request.get(
      `./api/services/dr/MineEngineerQuery/GetById/?id=${id}`
    ); // 查询基本信息（按隐患点id）
    return res;
  },
  getByCode: code => {
    var res = request.get(
      `./api/services/dr/MineEngineerQuery/GetByCode/?code=${code}`
    ); // 查询基本信息（按隐患点id）
    return res;
  }
};
