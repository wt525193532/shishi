/**防灾工作明白卡查询接口 */
import request from "@/lib/request";
export default {
  //id查询

  getById: id => {
    var res = request.get(`./api/services/dr/WorkCardQuery/GetById/?id=${id}`); // 查询基本信息（按隐患点id）
    return res;
  },
  getByCode: code => {
    var res = request.get(
      `./api/services/dr/WorkCardQuery/GetByCode/?code=${code}`
    ); // 查询基本信息（按隐患点id）
    return res;
  }
};
