/**防灾工作明白卡审核接口 */
import request from "@/lib/request";
export default {
  process(data) {
    return request.post("/api/services/dr/WorkCard/Process", data);
  }
};
