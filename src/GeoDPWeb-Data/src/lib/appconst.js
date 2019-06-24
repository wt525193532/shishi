/**
 * 系统静态变量
 */
const AppConst = {
  userManagement: {
    defaultAdminUserName: "admin"
  },
  localization: {
    defaultLocalizationSourceName: "GeoDP"
  },
  authorization: {
    encrptedAuthTokenName: "enc_auth_token"
  },
  cookieName: {
    token: "Abp.AuthToken"
  },
  /// <summary>
  /// 数据状态
  /// </summary>
  DataStatusEnum: {
    /// <summary>
    /// 未提交至审核流程
    UnCommit: 0,
    UnCommitName: "待提交",
    /// <summary>
    /// 已提交至审核流程，但还未开始进行审核
    Commited: 1,
    CommitedName: "已提交",
    /// <summary>
    ///  正在进行审核
    Processing: 2,
    ProcessingName: "审核中",
    /// <summary>
    /// 已发起撤销申请，正在等待审核人确认
    Canceling: 3,
    CancelingName: "撤销中",
    /// <summary>
    /// 已撤销审核，数据进入待提交状态
    Canceled: 4,
    CanceledName: "已撤销",
    /// <summary>
    /// 未通过审核
    Disapproval: 8,
    DisapprovalName: "未通过",
    /// <summary>
    /// 通过审核,数据入库
    Approval: 9,
    ApprovalName: "已入库"
  },
  dataType: {
    隐患点基本信息: "BasicInfo",
    EliminateInfo: "EliminateInfo",
    EmShelter: "EmShelter",
    治理工程数据采集: "EngineerInfo",
    防灾预案表: "PreventionPlan",
    专业监测点数据采集: "ProfessionalMnt",
    搬迁避让数据采集: "RelocationInfo",
    避险明白卡: "RiskCard",
    简易监测点数据采集: "SimpleMnt",
    防灾工作明白卡: "WorkCard"
  }
};
export default AppConst;
