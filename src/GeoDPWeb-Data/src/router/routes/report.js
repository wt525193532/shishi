/* 填报功能路由配置 */
import Layout from "@/layout";
import ReportLayout from "@/view/report";

export default [
  {
    name: "report",
    path: "/report",
    component: Layout,
    redirect: "/report/workspace",
    meta: {
      title: "填报",
      icon: "tianbao",
      permission: "Pages.Data.Report"
    },
    children: [
      {
        name: "report.workspace",
        path: "workspace",
        component: () => import("@/view/report/workspace"),
        meta: {
          title: "填报工作台",
          icon: "tianbao",
          permission: "Pages.Data.Report"
        }
      },
      {
        name: "report.basicInfo",
        path: "basicinfo",
        component: ReportLayout,
        meta: {
          title: "隐患点基本信息",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/basicinfo/index",
        children: [
          {
            name: "report.basicInfoIndex",
            path: "index",
            component: () => import("@/view/report/basicInfo/basicInfo"),
            meta: {
              title: "隐患点基本信息",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addBasicInfo",
            path: "add",
            component: () => import("@/view/forms/basicinfoForm/default"),
            meta: {
              title: "新增隐患点基本信息",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editBasicInfo",
            path: "edit",
            component: () => import("@/view/forms/basicinfoForm/default"),
            meta: {
              title: "编辑隐患点基本信息",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewBasicInfo",
            path: "view",
            component: () => import("@/view/forms/basicinfoForm/default"),
            meta: {
              title: "查看隐患点基本信息",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.preventPlan",
        path: "preventPlan",
        component: ReportLayout,
        meta: {
          title: "防灾预案表",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/preventPlan/index",
        children: [
          {
            name: "report.preventPlanIndex",
            path: "index",
            component: () => import("@/view/report/preventPlan/preventPlan"),
            meta: {
              title: "防灾预案表",
              permission: "",
              icon: "Pages.Data.Report"
            }
          },
          {
            name: "report.addPreventPlan",
            path: "add",
            component: () => import("@/view/forms/preventPlanForm/default"),
            meta: {
              title: "新增防灾预案表",
              permission: "Pages.Data.Report",
              icon: "",
              formType: "create"
            }
          },
          {
            name: "report.editPreventPlan",
            path: "edit",
            component: () => import("@/view/forms/preventPlanForm/default"),
            meta: {
              title: "编辑防灾预案表",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewPreventPlan",
            path: "view",
            component: () => import("@/view/forms/preventPlanForm/default"),
            meta: {
              title: "查看防灾预案表",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.workCard",
        path: "workCard",
        component: ReportLayout,
        meta: {
          title: "防灾工作明白卡",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/workCard/index",
        children: [
          {
            name: "report.workCardIndex",
            path: "index",
            component: () => import("@/view/report/workCard/workCard"),
            meta: {
              title: "防灾工作明白卡",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addWorkCard",
            path: "add",
            component: () => import("@/view/forms/workCardForm/default"),
            meta: {
              title: "新增防灾工作明白卡",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editWorkCard",
            path: "edit",
            component: () => import("@/view/forms/workCardForm/default"),
            meta: {
              title: "编辑防灾工作明白卡",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewWorkCard",
            path: "view",
            component: () => import("@/view/forms/workCardForm/default"),
            meta: {
              title: "查看防灾工作明白卡",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.riskCard",
        path: "riskCard",
        component: ReportLayout,
        meta: {
          title: "避险明白卡",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/riskCard/index",
        children: [
          {
            name: "report.riskCardIndex",
            path: "index",
            component: () => import("@/view/report/riskCard/riskCard"),
            meta: {
              title: "避险明白卡",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addRiskCard",
            path: "add",
            component: () => import("@/view/forms/riskCardForm/default"),
            meta: {
              title: "新增避险明白卡",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editRiskCard",
            path: "edit",
            component: () => import("@/view/forms/riskCardForm/default"),
            meta: {
              title: "编辑避险明白卡",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewRiskCard",
            path: "view",
            component: () => import("@/view/forms/riskCardForm/default"),
            meta: {
              title: "查看避险明白卡",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.professionalMnt",
        path: "professionalMnt",
        component: ReportLayout,
        meta: {
          title: "专业监测点数据采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/professionalMnt/index",
        children: [
          {
            name: "report.professionalMntIndex",
            path: "index",
            component: () =>
              import("@/view/report/professionalMnt/professionalMnt"),
            meta: {
              title: "专业监测点数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addProfessionalMnt",
            path: "add",
            component: () => import("@/view/forms/professionalMntForm/default"),
            meta: {
              title: "新增专业监测点数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editProfessionalMnt",
            path: "edit",
            component: () => import("@/view/forms/professionalMntForm/default"),
            meta: {
              title: "编辑专业监测点数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewProfessionalMnt",
            path: "view",
            component: () => import("@/view/forms/professionalMntForm/default"),
            meta: {
              title: "查看专业监测点数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.simpleMnt",
        path: "simpleMnt",
        component: ReportLayout,
        meta: {
          title: "简易监测点数据采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/simpleMnt/index",
        children: [
          {
            name: "report.simpleMntIndex",
            path: "index",
            component: () => import("@/view/report/simpleMnt/simpleMnt"),
            meta: {
              title: "简易监测点数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addSimpleMnt",
            path: "add",
            component: () => import("@/view/forms/simpleMntForm/default"),
            meta: {
              title: "新增简易监测点数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editSimpleMnt",
            path: "edit",
            component: () => import("@/view/forms/simpleMntForm/default"),
            meta: {
              title: "编辑简易监测点数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewSimpleMnt",
            path: "view",
            component: () => import("@/view/forms/simpleMntForm/default"),
            meta: {
              title: "查看简易监测点数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.engineer",
        path: "engineer",
        component: ReportLayout,
        meta: {
          title: "治理工程数据采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/engineer/index",
        children: [
          {
            name: "report.engineerIndex",
            path: "index",
            component: () => import("@/view/report/engineer/engineer"),
            meta: {
              title: "治理工程数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addEngineer",
            path: "add",
            component: () => import("@/view/forms/engineerForm/default"),
            meta: {
              title: "新增治理工程数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editEngineer",
            path: "edit",
            component: () => import("@/view/forms/engineerForm/default"),
            meta: {
              title: "编辑治理工程数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewEngineer",
            path: "view",
            component: () => import("@/view/forms/engineerForm/default"),
            meta: {
              title: "查看治理工程数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.eliminateDanger",
        path: "eliminateDanger",
        component: ReportLayout,
        meta: {
          title: "应急排危数据采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/eliminateDanger/index",
        children: [
          {
            name: "report.eliminateDangerIndex",
            path: "index",
            component: () =>
              import("@/view/report/eliminateDanger/eliminateDanger"),
            meta: {
              title: "应急排危数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addEliminateDanger",
            path: "add",
            component: () => import("@/view/forms/eliminateDangerForm/default"),
            meta: {
              title: "新增应急排危数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editEliminateDanger",
            path: "edit",
            component: () => import("@/view/forms/eliminateDangerForm/default"),
            meta: {
              title: "编辑应急排危数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewEliminateDanger",
            path: "view",
            component: () => import("@/view/forms/eliminateDangerForm/default"),
            meta: {
              title: "查看应急排危数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.relocation",
        path: "relocation",
        component: ReportLayout,
        meta: {
          title: "搬迁避让数据采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/relocation/index",
        children: [
          {
            name: "report.relocationIndex",
            path: "index",
            component: () => import("@/view/report/relocation/relocation"),
            meta: {
              title: "搬迁避让数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addRelocation",
            path: "add",
            component: () => import("@/view/forms/relocationForm/default"),
            meta: {
              title: "新增搬迁避让数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editRelocation",
            path: "edit",
            component: () => import("@/view/forms/relocationForm/default"),
            meta: {
              title: "编辑搬迁避让数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewRelocation",
            path: "view",
            component: () => import("@/view/forms/relocationForm/default"),
            meta: {
              title: "查看搬迁避让数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.training",
        path: "training",
        component: ReportLayout,
        meta: {
          title: "培训演练",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/training/index",
        children: [
          {
            name: "report.trainingIndex",
            path: "index",
            component: () => import("@/view/report/training/training"),
            meta: {
              title: "培训演练",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addTaining",
            path: "add",
            component: () => import("@/view/forms/trainingForm/default"),
            meta: {
              title: "新增培训演练",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editTraining",
            path: "edit",
            component: () => import("@/view/forms/trainingForm/default"),
            meta: {
              title: "编辑培训演练",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewTraining",
            path: "view",
            component: () => import("@/view/forms/trainingForm/default"),
            meta: {
              title: "查看培训演练",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.mineInformation",
        path: "mineInformation",
        component: ReportLayout,
        meta: {
          title: "矿山基本信息",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/mineInformation/index",
        children: [
          {
            name: "report.mineInformationIndex",
            path: "index",
            component: () =>
              import("@/view/report/mineInformation/mineInformation"),
            meta: {
              title: "矿山基本信息",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addMineInformation",
            path: "add",
            component: () => import("@/view/forms/mineInformationForm/default"),
            meta: {
              title: "新增矿山基本信息",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editMineInformation",
            path: "edit",
            component: () => import("@/view/forms/mineInformationForm/default"),
            meta: {
              title: "编辑矿山基本信息",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewMineInformation",
            path: "view",
            component: () => import("@/view/forms/mineInformationForm/default"),
            meta: {
              title: "查看矿山基本信息",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.heritageProtection",
        path: "heritageProtection",
        component: ReportLayout,
        meta: {
          title: "地质遗迹数据采集",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/heritageProtection/index",
        children: [
          {
            name: "report.heritageProtectionIndex",
            path: "index",
            component: () =>
              import("@/view/report/heritageProtection/heritageProtection"),
            meta: {
              title: "地质遗迹数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addHeritageProtection",
            path: "add",
            component: () =>
              import("@/view/forms/heritageProtectionForm/default"),
            meta: {
              title: "新增地质遗迹数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editHeritageProtection",
            path: "edit",
            component: () =>
              import("@/view/forms/heritageProtectionForm/default"),
            meta: {
              title: "编辑地质遗迹数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewHeritageProtection",
            path: "view",
            component: () =>
              import("@/view/forms/heritageProtectionForm/default"),
            meta: {
              title: "查看地质遗迹数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.governDataCollect",
        path: "governDataCollect",
        component: ReportLayout,
        meta: {
          title: "矿山治理数据采集",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/governDataCollect/index",
        children: [
          {
            name: "report.governDataCollectIndex",
            path: "index",
            component: () =>
              import("@/view/report/governDataCollect/governDataCollect"),
            meta: {
              title: "矿山治理数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addGovernDataCollect",
            path: "add",
            component: () =>
              import("@/view/forms/governDataCollectForm/default"),
            meta: {
              title: "新增矿山治理数据采集",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editGovernDataCollect",
            path: "edit",
            component: () =>
              import("@/view/forms/governDataCollectForm/default"),
            meta: {
              title: "编辑矿山治理数据采集",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewGovernDataCollect",
            path: "view",
            component: () =>
              import("@/view/forms/governDataCollectForm/default"),
            meta: {
              title: "查看矿山治理数据采集",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.bqgh",
        path: "bqgh",
        component: ReportLayout,
        meta: {
          title: "搬迁规划",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/bqgh/index",
        children: [
          {
            name: "report.bqghIndex",
            path: "index",
            component: () => import("@/view/report/bqgh/bqgh"),
            meta: {
              title: "搬迁规划",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addBqgh",
            path: "add",
            component: () => import("@/view/forms/bqghForm/default"),
            meta: {
              title: "新增搬迁规划",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editBqgh",
            path: "edit",
            component: () => import("@/view/forms/bqghForm/default"),
            meta: {
              title: "编辑搬迁规划",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewBqgh",
            path: "view",
            component: () => import("@/view/forms/bqghForm/default"),
            meta: {
              title: "查看搬迁规划",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.zzjc",
        path: "zzjc",
        component: ReportLayout,
        meta: {
          title: "专职监测",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/zzjc/index",
        children: [
          {
            name: "report.zzjcIndex",
            path: "index",
            component: () => import("@/view/report/zzjc/zzjc"),
            meta: {
              title: "专职监测",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addZzjc",
            path: "add",
            component: () => import("@/view/forms/zzjcForm/default"),
            meta: {
              title: "新增专职监测",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editZzjc",
            path: "edit",
            component: () => import("@/view/forms/zzjcForm/default"),
            meta: {
              title: "编辑专职监测",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewZzjc",
            path: "view",
            component: () => import("@/view/forms/zzjcForm/default"),
            meta: {
              title: "查看专职监测",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.lljs",
        path: "lljs",
        component: ReportLayout,
        meta: {
          title: "能力建设",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/lljs/index",
        children: [
          {
            name: "report.lljsIndex",
            path: "index",
            component: () => import("@/view/report/lljs/lljs"),
            meta: {
              title: "能力建设",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addLljs",
            path: "add",
            component: () => import("@/view/forms/lljsForm/default"),
            meta: {
              title: "新增能力建设",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editLljs",
            path: "edit",
            component: () => import("@/view/forms/lljsForm/default"),
            meta: {
              title: "编辑能力建设",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewLljs",
            path: "view",
            component: () => import("@/view/forms/lljsForm/default"),
            meta: {
              title: "查看能力建设",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.zhzz",
        path: "zhzz",
        component: ReportLayout,
        meta: {
          title: "综合整治",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/zhzz/index",
        children: [
          {
            name: "report.zhzzIndex",
            path: "index",
            component: () => import("@/view/report/zhzz/zhzz"),
            meta: {
              title: "综合整治",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addZhzz",
            path: "add",
            component: () => import("@/view/forms/zhzzForm/default"),
            meta: {
              title: "新增综合整治",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editZhzz",
            path: "edit",
            component: () => import("@/view/forms/zhzzForm/default"),
            meta: {
              title: "编辑综合整治",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewZhzz",
            path: "view",
            component: () => import("@/view/forms/zhzzForm/default"),
            meta: {
              title: "查看综合整治",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.dzxpc",
        path: "dzxpc",
        component: ReportLayout,
        meta: {
          title: "地质灾害巡、排查",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/dzxpc/index",
        children: [
          {
            name: "report.dzxpcIndex",
            path: "index",
            component: () => import("@/view/report/dzxpc/dzxpc"),
            meta: {
              title: "地质灾害巡、排查",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addDzxpc",
            path: "add",
            component: () => import("@/view/forms/dzxpcForm/default"),
            meta: {
              title: "新增地质灾害巡、排查",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editDzxpc",
            path: "edit",
            component: () => import("@/view/forms/dzxpcForm/default"),
            meta: {
              title: "编辑地质灾害巡、排查",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewDzxpc",
            path: "view",
            component: () => import("@/view/forms/dzxpcForm/default"),
            meta: {
              title: "查看地质灾害巡、排查",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.dzzsqx",
        path: "dzzsqx",
        component: ReportLayout,
        meta: {
          title: "地质灾害驻守技术支撑抢险调查表",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/dzzsqx/index",
        children: [
          {
            name: "report.dzzsqxIndex",
            path: "index",
            component: () => import("@/view/report/dzzsqx/dzzsqx"),
            meta: {
              title: "地质灾害驻守技术支撑抢险调查表",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addDzzsqx",
            path: "add",
            component: () => import("@/view/report/dzzsqx/addDzzsqx"),
            meta: {
              title: "新增地质灾害驻守技术支撑抢险调查表",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editDzzsqx",
            path: "edit",
            component: () => import("@/view/report/dzzsqx/editDzzsqx"),
            meta: {
              title: "编辑地质灾害驻守技术支撑抢险调查表",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewDzzsqx",
            path: "view",
            component: () => import("@/view/components/formViewId/viewDzzsqx"),
            meta: {
              title: "查看地质灾害驻守技术支撑抢险调查表",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.msgc",
        path: "msgc",
        component: ReportLayout,
        meta: {
          title: "民生工程",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/msgc/index",
        children: [
          {
            name: "report.msgcIndex",
            path: "index",
            component: () => import("@/view/report/msgc/msgc"),
            meta: {
              title: "民生工程",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addMsgc",
            path: "add",
            component: () => import("@/view/report/msgc/addMsgc"),
            meta: {
              title: "新增民生工程",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editMsgc",
            path: "edit",
            component: () => import("@/view/report/msgc/editMsgc"),
            meta: {
              title: "编辑民生工程",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewMsgc",
            path: "view",
            component: () => import("@/view/components/formViewId/viewMsgc"),
            meta: {
              title: "查看民生工程",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.dzzsdw",
        path: "dzzsdw",
        component: ReportLayout,
        meta: {
          title: "地质灾害驻守技术支撑单位一览表",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/dzzsdw/index",
        children: [
          {
            name: "report.dzzsdwIndex",
            path: "index",
            component: () => import("@/view/report/dzzsdw/dzzsdw"),
            meta: {
              title: "地质灾害驻守技术支撑单位一览表",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addDzzsdw",
            path: "add",
            component: () => import("@/view/report/dzzsdw/addDzzsdw"),
            meta: {
              title: "新增地质灾害驻守技术支撑单位一览表",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editDzzsdw",
            path: "edit",
            component: () => import("@/view/report/dzzsdw/editDzzsdw"),
            meta: {
              title: "编辑地质灾害驻守技术支撑单位一览表",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewDzzsdw",
            path: "view",
            component: () => import("@/view/components/formViewId/viewDzzsdw"),
            meta: {
              title: "查看地质灾害驻守技术支撑单位一览表",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.dzzsbb",
        path: "dzzsbb",
        component: ReportLayout,
        meta: {
          title: "地质灾害驻守技术支撑工作报表",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/dzzsbb/index",
        children: [
          {
            name: "report.dzzsbbIndex",
            path: "index",
            component: () => import("@/view/report/dzzsbb/dzzsbb"),
            meta: {
              title: "地质灾害驻守技术支撑工作报表",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addDzzsbb",
            path: "add",
            component: () => import("@/view/report/dzzsbb/addDzzsbb"),
            meta: {
              title: "新增地质灾害驻守技术支撑工作报表",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editDzzsbb",
            path: "edit",
            component: () => import("@/view/report/dzzsbb/editDzzsbb"),
            meta: {
              title: "编辑地质灾害驻守技术支撑工作报表",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewDzzsbb",
            path: "view",
            component: () => import("@/view/components/formViewId/viewDzzsbb"),
            meta: {
              title: "查看地质灾害驻守技术支撑工作报表",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.ssjcyj",
        path: "ssjcyj",
        component: ReportLayout,
        meta: {
          title: "自动化实时监测预警明细表",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/ssjcyj/index",
        children: [
          {
            name: "report.ssjcyjIndex",
            path: "index",
            component: () => import("@/view/report/ssjcyj/ssjcyj"),
            meta: {
              title: "自动化实时监测预警明细表",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addSsjcyj",
            path: "add",
            component: () => import("@/view/report/ssjcyj/addSsjcyj"),
            meta: {
              title: "新增自动化实时监测预警明细表",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editSsjcyj",
            path: "edit",
            component: () => import("@/view/report/ssjcyj/editSsjcyj"),
            meta: {
              title: "编辑自动化实时监测预警明细表",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewSsjcyj",
            path: "view",
            component: () => import("@/view/components/formViewId/viewSsjcyj"),
            meta: {
              title: "查看自动化实时监测预警明细表",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      },
      {
        name: "report.pwcx",
        path: "pwcx",
        component: ReportLayout,
        meta: {
          title: "排危除险",
          permission: "Pages.Data.Report",
          icon: "hiddenTrouble"
        },
        redirect: "/report/pwcx/index",
        children: [
          {
            name: "report.pwcxIndex",
            path: "index",
            component: () => import("@/view/report/pwcx/pwcx"),
            meta: {
              title: "排危除险",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addpwcx",
            path: "add",
            component: () => import("@/view/forms/pwcxForm/default"),
            meta: {
              title: "新增排危除险",
              permission: "Pages.Data.Report",
              formType: "create"
            }
          },
          {
            name: "report.editpwcx",
            path: "edit",
            component: () => import("@/view/forms/pwcxForm/default"),
            meta: {
              title: "编辑排危除险",
              permission: "Pages.Data.Report",
              formType: "edit"
            }
          },
          {
            name: "report.viewpwcx",
            path: "view",
            component: () => import("@/view/forms/pwcxForm/default"),
            meta: {
              title: "查看排危除险",
              permission: "Pages.Data.Report",
              formType: "view"
            }
          }
        ]
      }
    ]
  }
];
