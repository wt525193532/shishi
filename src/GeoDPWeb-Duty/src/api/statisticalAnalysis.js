import request from "@/lib/request";
export default {
  smsQuey(parms) {
    return request.post("./api/services/duty/DutyStatistic/SmsQuey", parms); // 分页查询短信
  },
  smsSta(parms) {
    return request.post("./api/services/duty/DutyStatistic/SmsSta", parms); // 短信统计
  },
  mailQueryReceived(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/MailQueryReceived",
      parms
    ); // 分页查询收文箱
  },
  mailStaReceived(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/MailStaReceived",
      parms
    ); // 收文箱统计
  },
  mailQuerySended(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/MailQuerySended",
      parms
    ); // 分页查询发文箱
  },
  mailStaSended(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/MailStaSended",
      parms
    ); // 统计发文箱
  },
  disasterInfoQuey(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/DisasterInfoQuey",
      parms
    ); // 分页查询灾情送报信息
  },
  disasterInfoSta(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/DisasterInfoSta",
      parms
    ); // 统计灾情报送
  },
  dangerInfoQuey(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/DangerInfoQuey",
      parms
    ); // 分页查询险情报送
  },
  dangerInfoSta(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/DangerInfoSta",
      parms
    ); // 统计险情报送
  },
  avoidRiskInfoQuey(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/AvoidRiskInfoQuey",
      parms
    ); // 分页查询成功避险报送信息
  },
  avoidRiskInfoSta(parms) {
    return request.post(
      "./api/services/duty/DutyStatistic/AvoidRiskInfoSta",
      parms
    ); // 统计成功避险报送信息
  }
};
