/**查询接口 */
import request from "@/lib/request";
export default {
  queryAll(par) {
    return request.post("/api/services/dr/BasicInfoQuery/QueryAll", par);
  }
};
