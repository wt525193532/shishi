/**统计接口 */
import request from "@/lib/request";
export default {
  // 已入库数据统计,按灾害类型统计隐患点数量,威胁人数,威胁户数,威胁财产
  staByDisasterType: par =>
    request.post("/api/services/dr/GeositeStatistic/StaByDisasterType", par),
  // 已入库数据统计,按灾害规模等级统计隐患点数量,威胁人数,威胁户数,威胁财产
  staByDisasterScale: par =>
    request.post("./api/services/dr/GeositeStatistic/StaByDisasterScale", par),
  getAdministrative: code =>
    request.get(
      `./api/services/app/Administrative/GetAdministrative?code=${code}`
    ), // 获取下一级区域
  // 已入库数据统计:按矿类分类统计数量
  staByClass: par =>
    request.post("/api/services/dr/MineStatistic/StaByClass", par),
  // 已入库数据统计,按灾害规模等级统计隐患点数量,威胁人数,威胁户数,威胁财产
  staByType: par =>
    request.post("./api/services/dr/MineStatistic/StaByType", par)
};
