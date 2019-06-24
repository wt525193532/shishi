/**矿山治理数据采集审核接口 */
import request from "@/lib/request";
export default {
  process ( data ) {
    return request.post( "/api/services/dr/WorkCard/Process", data );
  }
};
