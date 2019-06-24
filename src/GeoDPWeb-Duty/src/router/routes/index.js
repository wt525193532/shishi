// import report from "./report";
// import query from "./query";
// import statistic from "./statistic";

import systemManage from "./systemManage";
import statisticalAnalysis from "./statisticalAnalysis";
import onDuty from "./onDuty";
import dutyManage from "./dutyManage";
export default [
  ...onDuty,
  ...dutyManage,
  ...systemManage,
  ...statisticalAnalysis
];

// export default [...report, ...query, ...statistic];
