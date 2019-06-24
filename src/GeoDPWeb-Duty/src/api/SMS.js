/**短信管理服务 */
import request from "@/lib/request";
export default {
  send(params) {
    return request.post("./api/services/duty/SMS/Send", params); // 发送短信
  },
  queryTemplate(params) {
    return request.post("./api/services/duty/SMS/QueryTemplate", params); // 分页查询短信模版
  },
  saveTemplate(params) {
    return request.post("./api/services/duty/SMS/SaveTemplate", params); // 保存短信模版
  },
  deleteTemplate(params) {
    return request.post("./api/services/duty/SMS/DeleteTemplate", params); // 删除短信模版
  },
  querySendInfo(params) {
    return request.post("./api/services/duty/SMS/QuerySendInfo", params); // 分页查询短信发送记录
  }
};
