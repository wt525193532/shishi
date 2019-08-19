/**搬迁规划填报接口 */
import request from "@/lib/request";
export default {
  getAllBook() {
    return request.post(`./api/services/dr/TaskBookInfoQuery/GetAllMap`);
  },
  getAllFund() {
    return request.post(
      `./api/services/dr/CenterProvincialFundQuery/GetAllMap`
    );
  }
};
