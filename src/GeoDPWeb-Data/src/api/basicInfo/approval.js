/**隐患点基本信息审核接口 */
import request from "@/lib/request";
export default {
  getAllProcessed: data =>
    request.post("./api/services/dr/DataReportApproval/GetAllProcess", data), // 分页查询审核单（已处理的）
  getAllToDo: data =>
    request.post("./api/services/dr/DataReportApproval/GetAllToDo", data), // 分页查询审核单（待处理的）
  process: data =>
    request.post("./api/services/dr/DataReportApproval/Process", data) // 审核单处理
};
