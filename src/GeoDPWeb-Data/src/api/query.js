/**查询接口 */
import request from "@/lib/request";
export default {
  basicInfoQuery(par) {
    return request.post("/api/services/dr/BasicInfoQuery/QueryAll", par);
  },
  preventionPlanQuery(par) {
    return request.post("/api/services/dr/PreventionPlanQuery/QueryAll", par);
  },
  /**专业监测数据 */
  ProfessionalMntQuery(par) {
    return request.post("/api/services/dr/ProfessionalMntQuery/QueryAll", par);
  },
  /**搬迁避让 */
  RelocationInfoQuery(par) {
    return request.post("/api/services/dr/RelocationInfoQuery/QueryAll", par);
  },
  /** 避险明白卡*/
  RiskCardQuery(par) {
    return request.post("/api/services/dr/RiskCardQuery/QueryAll", par);
  },
  /** 简易监测*/
  SimpleMntQuery(par) {
    return request.post("/api/services/dr/SimpleMntQuery/QueryAll", par);
  },
  /** 防灾工作*/
  WorkCardQuery(par) {
    return request.post("/api/services/dr/WorkCardQuery/QueryAll", par);
  },
  /** 地质遗迹保护项目进度数据*/
  HeritageProtectionQuery(par) {
    return request.post(
      "/api/services/dr/HeritageProtectionQuery/QueryAll",
      par
    );
  },
  /**矿山基本信息 */
  MineInfoQuery(par) {
    return request.post("/api/services/dr/MineInfoQuery/QueryAll", par);
  },
  /** 培训演练*/
  TrainingQuery(par) {
    return request.post("/api/services/dr/TrainingQuery/QueryAll", par);
  },
  /** 治理工程*/
  EngineerInfoQuery(par) {
    return request.post("/api/services/dr/EngineerInfoQuery/QueryAll", par);
  },
  /** 应急排危信息*/
  EliminateInfoQuery(par) {
    return request.post("/api/services/dr/EliminateInfoQuery/QueryAll", par);
  },
  /**矿山治理工程进展数据采集 */
  MineEngineerQuery(par) {
    return request.post("/api/services/dr/MineEngineerQuery/QueryAll", par);
  }
};
