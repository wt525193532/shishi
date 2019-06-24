/**隐患点基本信息审核接口 */
import request from "@/lib/request";
export default {
  process(data) {
    return request.post("/api/services/dr/PreventionPlan/Process", data);
  }
};
