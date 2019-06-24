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
            component: () => import("@/view/report/basicInfo/addBasicInfo"),
            meta: {
              title: "新增隐患点基本信息",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editBasicInfo",
            path: "edit",
            component: () => import("@/view/report/basicInfo/editBasicInfo"),
            meta: {
              title: "编辑隐患点基本信息",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewBasicInfo",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewBasicInfo"),
            meta: {
              title: "查看隐患点基本信息",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/preventPlan/addPreventPlan"),
            meta: {
              title: "新增防灾预案表",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editPreventPlan",
            path: "edit",
            component: () =>
              import("@/view/report/preventPlan/editPreventPlan"),
            meta: {
              title: "编辑防灾预案表",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewPreventPlan",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewPreventPlan"),
            meta: {
              title: "查看防灾预案表",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/workCard/addWorkCard"),
            meta: {
              title: "新增防灾工作明白卡",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editWorkCard",
            path: "edit",
            component: () => import("@/view/report/workCard/editWorkCard"),
            meta: {
              title: "编辑防灾工作明白卡",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewWorkCard",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewWorkCard"),
            meta: {
              title: "查看防灾工作明白卡",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/riskCard/addRiskCard"),
            meta: {
              title: "新增避险明白卡",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editRiskCard",
            path: "edit",
            component: () => import("@/view/report/riskCard/editRiskCard"),
            meta: {
              title: "编辑避险明白卡",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewRiskCard",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewRiskCard"),
            meta: {
              title: "查看避险明白卡",
              permission: "Pages.Data.Report"
            }
          }
        ]
      },
      {
        name: "report.emergencyInvestigation",
        path: "emergencyInvestigation",
        component: ReportLayout,
        meta: {
          title: "应急调查数据采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/emergencyInvestigation/index",
        children: [
          {
            name: "report.emergencyInvestigationIndex",
            path: "index",
            component: () =>
              import("@/view/report/emergencyInvestigation/emergencyInvestigation"),
            meta: {
              title: "应急调查数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addEmergencyInvestigation",
            path: "add",
            component: () =>
              import("@/view/report/emergencyInvestigation/addEmergencyInvestigation"),
            meta: {
              title: "新增应急调查数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editEmergencyInvestigation",
            path: "edit",
            component: () =>
              import("@/view/report/emergencyInvestigation/editEmergencyInvestigation"),
            meta: {
              title: "编辑应急调查数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewEmergencyInvestigation",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewEmergencyInvestigation"),
            meta: {
              title: "查看应急调查数据采集",
              permission: "Pages.Data.Report"
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
            component: () =>
              import("@/view/report/professionalMnt/addProfessionalMnt"),
            meta: {
              title: "新增专业监测点数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editProfessionalMnt",
            path: "edit",
            component: () =>
              import("@/view/report/professionalMnt/editProfessionalMnt"),
            meta: {
              title: "编辑专业监测点数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewProfessionalMnt",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewProfessionalMnt"),
            meta: {
              title: "查看专业监测点数据采集",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/simpleMnt/addSimpleMnt"),
            meta: {
              title: "新增简易监测点数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editSimpleMnt",
            path: "edit",
            component: () => import("@/view/report/simpleMnt/editSimpleMnt"),
            meta: {
              title: "编辑简易监测点数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewSimpleMnt",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewSimpleMnt"),
            meta: {
              title: "查看简易监测点数据采集",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/engineer/addEngineer"),
            meta: {
              title: "新增治理工程数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editEngineer",
            path: "edit",
            component: () => import("@/view/report/engineer/editEngineer"),
            meta: {
              title: "编辑治理工程数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewEngineer",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewEngineer"),
            meta: {
              title: "查看治理工程数据采集",
              permission: "Pages.Data.Report"
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
            component: () =>
              import("@/view/report/eliminateDanger/addEliminateDanger"),
            meta: {
              title: "新增应急排危数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editEliminateDanger",
            path: "edit",
            component: () =>
              import("@/view/report/eliminateDanger/editEliminateDanger"),
            meta: {
              title: "编辑应急排危数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewEliminateDanger",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewEliminateDanger"),
            meta: {
              title: "查看应急排危数据采集",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/relocation/addRelocation"),
            meta: {
              title: "新增搬迁避让数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editRelocation",
            path: "edit",
            component: () => import("@/view/report/relocation/editRelocation"),
            meta: {
              title: "编辑搬迁避让数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewRelocation",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewRelocation"),
            meta: {
              title: "查看搬迁避让数据采集",
              permission: "Pages.Data.Report"
            }
          }
        ]
      },
      {
        name: "report.emergencyShelter",
        path: "emergencyShelter",
        component: ReportLayout,
        meta: {
          title: "应急避让场所采集",
          permission: "Pages.Data.Report",
          icon: ""
        },
        redirect: "/report/emergencyShelter/index",
        children: [
          {
            name: "report.emergencyShelterIndex",
            path: "index",
            component: () =>
              import("@/view/report/emergencyShelter/emergencyShelter"),
            meta: {
              title: "应急避让场所采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.addEmergencyShelter",
            path: "add",
            component: () =>
              import("@/view/report/emergencyShelter/addEmergencyShelter"),
            meta: {
              title: "新增应急避让场所采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editEmergencyShelter",
            path: "edit",
            component: () =>
              import("@/view/report/emergencyShelter/editEmergencyShelter"),
            meta: {
              title: "编辑应急避让场所采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewEmergencyShelter",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewEmergencyShelter"),
            meta: {
              title: "查看应急避让场所采集",
              permission: "Pages.Data.Report"
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
            component: () => import("@/view/report/training/addTraining"),
            meta: {
              title: "新增培训演练",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editTraining",
            path: "edit",
            component: () => import("@/view/report/training/editTraining"),
            meta: {
              title: "编辑培训演练",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewTraining",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewTraining"),
            meta: {
              title: "查看培训演练",
              permission: "Pages.Data.Report"
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
            component: () =>
              import("@/view/report/mineInformation/addMineInformation"),
            meta: {
              title: "新增矿山基本信息",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editMineInformation",
            path: "edit",
            component: () =>
              import("@/view/report/mineInformation/editMineInformation"),
            meta: {
              title: "编辑矿山基本信息",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewMineInformation",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewMineInformation"),
            meta: {
              title: "查看矿山基本信息",
              permission: "Pages.Data.Report"
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
              import("@/view/report/heritageProtection/addHeritageProtection"),
            meta: {
              title: "新增地质遗迹数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editHeritageProtection",
            path: "edit",
            component: () =>
              import("@/view/report/heritageProtection/editHeritageProtection"),
            meta: {
              title: "编辑地质遗迹数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewHeritageProtection",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewHeritageProtection"),
            meta: {
              title: "查看地质遗迹数据采集",
              permission: "Pages.Data.Report"
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
              import("@/view/report/governDataCollect/addGovernDataCollect"),
            meta: {
              title: "新增矿山治理数据采集",
              permission: "Pages.Data.Report",
              icon: ""
            }
          },
          {
            name: "report.editGovernDataCollect",
            path: "edit",
            component: () =>
              import("@/view/report/governDataCollect/editGovernDataCollect"),
            meta: {
              title: "编辑矿山治理数据采集",
              permission: "Pages.Data.Report"
            }
          },
          {
            name: "report.viewGovernDataCollect",
            path: "view",
            component: () =>
              import("@/view/components/formViewId/viewGovernDataCollect"),
            meta: {
              title: "查看矿山治理数据采集",
              permission: "Pages.Data.Report"
            }
          }
        ]
      }
    ]
  }
];
