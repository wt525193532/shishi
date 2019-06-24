export default {
  appName: "值班管理系统",
  route: {
    dashboard: "首页",
    icons: "图标",
    back: "返回",
    backToTop: "返回顶部",
    charts: "图表",
    menu: "菜单",
    table: "表格",
    form: "表单",
    errorPages: "错误页面",
    page401: "401",
    page404: "404",
    errorLog: "错误日志"
  },
  navbar: {
    logout: "退出登录",
    switch: "切换系统",
    screenfull: "全屏",
    theme: "换肤",
    message: "消息",
    profile: "个人资料"
  },
  login: {
    title: "系统登录",
    login: "登录",
    username: "账号",
    password: "密码"
  },
  enums: {
    DutyObjectType: {
      0: "值班人员",
      1: "局值班领导",
      2: "站值班领导",
      3: "值班驾驶员",
      4: "应急处理组"
    },
    SmsSendStatus: {
      0: "待发送",
      1: "发送中",
      2: "已发送",
      3: "已读",
      4: "发送失败"
    }
  },
  codes: {
    FileMailType: {
      "1": "指挥部下发文件",
      "2": "上级下发文件",
      "3": "快报",
      "4": "续报",
      "5": "简报",
      "6": "防灾概述和降雨情况上报",
      "7": "应急工作情况上报",
      "8": "气象文件",
      "9": "速报",
      "10": "抽查记录上报"
    }
  },
  disasterType: {
    0: "滑坡",
    1: "崩塌",
    2: "泥石流",
    3: "地面塌陷",
    4: "地裂缝",
    5: "地面沉降"
  },
  landType: {
    0: "耕地",
    1: "林地",
    2: "园地",
    3: "宅基用地",
    4: "交通运输用地"
  },
  scaleLevel: {
    0: "未分级",
    1: "小型",
    2: "中型",
    3: "大型",
    4: "特大型"
  }
};
