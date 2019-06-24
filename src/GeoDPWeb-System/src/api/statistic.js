/**统计接口 */
import request from "@/lib/request";
export default {
  staByDisasterType(par) {
    return request.post(
      "/api/services/dr/BasicInfoStatistic/StaByDisasterType",
      par
    );
  }
};
