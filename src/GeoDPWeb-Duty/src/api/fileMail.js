import request from "@/lib/request";
export default {
  send(params) {
    return request.post("./api/services/duty/FileMail/Send", params); // 发送文件
  },
  reSend(params) {
    return request.post("./api/services/duty/FileMail/ReSend", params); // 转发文件
  },
  editDraft(params) {
    return request.get(`./api/services/duty/FileMail/EditDraft?id=${params}`); // 获取待编辑的草稿
  },
  queryReceive(params) {
    return request.post("./api/services/duty/FileMail/QueryReceive", params); // 分页查询收文箱
  },
  querySend(params) {
    return request.post("./api/services/duty/FileMail/QuerySend", params); // 分页查询发文箱
  },
  queryDraft(params) {
    return request.post("./api/services/duty/FileMail/QueryDraft", params); // 分页查询草稿箱
  },
  saveDraft(params) {
    return request.post("./api/services/duty/FileMail/SaveDraft", params); // 保存草稿
  },
  delReceivedMails(params) {
    return request.post(
      "./api/services/duty/FileMail/DeleteReceivedMails",
      params
    ); // 删除收件箱中的邮件
  },
  delSendedMails(params) {
    return request.post(
      "./api/services/duty/FileMail/DeleteSendedMails",
      params
    ); // 删除发件箱中的邮件
  },
  delDraftMails(params) {
    return request.post(
      "./api/services/duty/FileMail/DeleteDraftMails",
      params
    ); // 删除草稿箱中的邮件
  }
};
