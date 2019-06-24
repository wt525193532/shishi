/**矿山基本信息审核接口 */
import request from "@/lib/request";
export default {
  getAllProcessed: data =>
    request.post("./api/services/dr/MineInfoApproval/GetAllProcess", data), // 分页查询审核单（已处理的）
  getAllToDo: data =>
    request.post("./api/services/dr/MineInfoApproval/GetAllToDo", data), // 分页查询审核单（待处理的）
  getMineInfo: data =>
    request.GET(`./api/services/dr/MineInfoQuery/GetById/?id=${data}`), // 查询基本信息（按矿山id）
  process: data =>
    request.post("./api/services/dr/MineInfoApproval/Process", data) // 审核单处理
};
