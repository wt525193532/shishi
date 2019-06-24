/* 查询功能路由配置 */
import Layout from "@/layout";
import QueryLayout from "@/view/query";
export default [
  {
    path: "/query",
    component: Layout,
    name: "query",
    redirect: "/query/basicInfo",
    meta: {
      title: "查询",
      icon: "chaxun",
      permission: "Pages.Data.Query"
    },
    children: [
      {
        name: "query.basicInfo",
        path: "basicInfo",
        component: QueryLayout,
        meta: {
          title: "地质灾害隐患点查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/basicinfo/index",
        children: [
          {
            name: "query.basicInfoQuery",
            path: "index",
            component: () => import("@/view/query/basicInfo"),
            meta: {
              title: "地质灾害隐患点查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.basicInfoQueryDetail",
            path: "detail",
            component: () => import("@/view/query/detail/basicInfo"),
            meta: {
              title: "详情",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.preventPlan",
        path: "preventPlan",
        component: QueryLayout,
        meta: {
          title: "防灾预案表查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/preventPlan/index",
        children: [
          {
            name: "query.preventPlanQuery",
            path: "index",
            component: () => import("@/view/query/preventPlan"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.preventPlanQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "preventPlan",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.workCard",
        path: "workCard",
        component: QueryLayout,
        meta: {
          title: "防灾工作明白卡查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/workCard/index",
        children: [
          {
            name: "query.workCardQuery",
            path: "index",
            component: () => import("@/view/query/workCard"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.workCardQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "workCard",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.riskCard",
        path: "riskCard",
        component: QueryLayout,
        meta: {
          title: "避险明白卡查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/riskCard/index",
        children: [
          {
            name: "query.riskCardQuery",
            path: "index",
            component: () => import("@/view/query/riskCard"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.riskCardQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "riskCard",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.professionalMnt",
        path: "professionalMnt",
        component: QueryLayout,
        meta: {
          title: "专业监测点数据采集查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/professionalMnt/index",
        children: [
          {
            name: "query.professionalMntQuery",
            path: "index",
            component: () => import("@/view/query/professionalMnt"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.professionalMntQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "professionalMnt",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.simpleMnt",
        path: "simpleMnt",
        component: QueryLayout,
        meta: {
          title: "简易监测点数据采集查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/simpleMnt/index",
        children: [
          {
            name: "query.simpleMntQuery",
            path: "index",
            component: () => import("@/view/query/simpleMnt"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.simpleMntQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "simpleMnt",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.engineer",
        path: "engineer",
        component: QueryLayout,
        meta: {
          title: "治理工程数据采集查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/engineer/index",
        children: [
          {
            name: "query.engineerQuery",
            path: "index",
            component: () => import("@/view/query/engineer"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.engineerQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "engineer",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.eliminateDanger",
        path: "eliminateDanger",
        component: QueryLayout,
        meta: {
          title: "应急排危数据采集查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/eliminateDanger/index",
        children: [
          {
            name: "query.eliminateDangerQuery",
            path: "index",
            component: () => import("@/view/query/eliminateDanger"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.eliminateDangerQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "eliminateDanger",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.relocation",
        path: "relocation",
        component: QueryLayout,
        meta: {
          title: "搬迁避让数据采集查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/relocation/index",
        children: [
          {
            name: "query.relocationQuery",
            path: "index",
            component: () => import("@/view/query/relocation"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.relocationQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "relocation",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.training",
        path: "training",
        component: QueryLayout,
        meta: {
          title: "培训演练表查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/training/index",
        children: [
          {
            name: "query.trainingQuery",
            path: "index",
            component: () => import("@/view/query/training"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.trainingQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "training",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.mineInformation",
        path: "mineInformation",
        component: QueryLayout,
        meta: {
          title: "矿山基本信息",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/mineInformation/index",
        children: [
          {
            name: "query.mineInformationIndex",
            path: "index",
            component: () => import("@/view/query/mineInformation"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.mineInformationOtherForm",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "heritageProtection",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.heritageProtection",
        path: "heritageProtection",
        component: QueryLayout,
        meta: {
          title: "地质遗迹数据采集查询",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/heritageProtection/index",
        children: [
          {
            name: "query.heritageProtectionQuery",
            path: "index",
            component: () => import("@/view/query/heritageProtection"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.heritageProtectionQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "heritageProtection",
              permission: "Pages.Data.Query"
            }
          }
        ]
      },
      {
        name: "query.governDataCollect",
        path: "governDataCollect",
        component: QueryLayout,
        meta: {
          title: "矿山治理工程进展数据采集",
          icon: "chaxun",
          permission: "Pages.Data.Query"
        },
        redirect: "/query/governDataCollect/index",
        children: [
          {
            name: "query.governDataCollectQuery",
            path: "index",
            component: () => import("@/view/query/governDataCollect"),
            meta: {
              title: "查询",
              icon: "chaxun",
              permission: "Pages.Data.Query"
            }
          },
          {
            name: "query.governDataCollectQueryDetail",
            path: "otherFormDetail",
            component: () => import("@/view/query/detail/otherForm"),
            meta: {
              title: "详情",
              icon: "chaxun",
              formName: "governDataCollect",
              permission: "Pages.Data.Query"
            }
          }
        ]
      }
    ]
  }
];
