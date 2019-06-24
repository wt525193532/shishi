/**隐患点基本信息填报接口 */
import request from "@/lib/request";
export default {
  create(data) {
    return request.post("/api/services/dr/BasicInfo/Create", data);
  }
};
