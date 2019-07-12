const statisticalAnalysis = [
  {
    path: "statisticalAnalysis",
    name: "statisticalAnalysis",
    component: () =>
      import(/* webpackChunkName: "statisticalAnalysis" */ "@/components/comRouterView"),
    meta: {
      displayName: "统计分析",
      icon: "tianbao",
      permission: "Pages.Duty"
    },
    redirect: { name: "disasterRS" },
    children: [
      {
        path: "disasterRS",
        name: "disasterRS",
        component: () =>
          import(/* webpackChunkName: "disasterRS" */ "@/view/statisticalAnalysis/disasterRS/content"),
        meta: {
          displayName: "灾情报送统计",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      },
      {
        path: "emergencyRS",
        name: "emergencyRS",
        component: () =>
          import(/* webpackChunkName: "emergencyRS" */ "@/view/statisticalAnalysis/emergencyRS/content"),
        meta: {
          displayName: "险情报送统计",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      },
      {
        path: "successfulHedgeRS",
        name: "successfulHedgeRS",
        component: () =>
          import(/* webpackChunkName: "successfulHedgeRS" */ "@/view/statisticalAnalysis/successfulHedgeRS/content"),
        meta: {
          displayName: "成功避险报送统计",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      },
      // {
      //   path: "disasterSummaryRS",
      //   name: "disasterSummaryRS",
      //   component: () =>
      //     import(/* webpackChunkName: "disasterSummaryRS" */ "@/view/statisticalAnalysis/disasterSummaryRS/content"),
      //   meta: {
      //     displayName: "防灾概述报送统计",
      //     icon: "tianbao",
      //     permission: "Pages.Duty"
      //   }
      // },
      // {
      //   path: "disasterEmergencyWorkRS",
      //   name: "disasterEmergencyWorkRS",
      //   component: () =>
      //     import(/* webpackChunkName: "disasterEmergencyWorkRS" */ "@/view/statisticalAnalysis/disasterEmergencyWorkRS/content"),
      //   meta: {
      //     displayName: "防灾应急工作统计报表报送统计",
      //     icon: "tianbao",
      //     permission: "Pages.Duty"
      //   }
      // },
      {
        path: "postStatistics",
        name: "postStatistics",
        component: () =>
          import(/* webpackChunkName: "postStatistics" */ "@/view/statisticalAnalysis/postStatistics/content"),
        meta: {
          displayName: "发文统计",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      },
      {
        path: "receiveStatistics",
        name: "receiveStatistics",
        component: () =>
          import(/* webpackChunkName: "receiveStatistics" */ "@/view/statisticalAnalysis/receiveStatistics/content"),
        meta: {
          displayName: "收文统计",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      },
      {
        path: "SMSStatistics",
        name: "SMSStatistics",
        component: () =>
          import(/* webpackChunkName: "SMSStatistics" */ "@/view/statisticalAnalysis/SMSStatistics/content"),
        meta: {
          displayName: "短信统计",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      }
    ]
  }
];

export default [...statisticalAnalysis];
