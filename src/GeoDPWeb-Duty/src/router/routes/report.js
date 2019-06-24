/* 填报功能路由配置 */
import Layout from "@/layout";
import ReportLayout from "@/view/report";

export default [
  {
    path: "/report",
    component: Layout,
    redirect: "/report/workspace",
    children: [
      {
        name: "report.workspace",
        path: "workspace",
        component: () => import("@/view/report/workspace"),
        meta: {
          title: "填报工作台",
          icon: "tianbao",
          permission: ""
        }
      },
      {
        name: "report.basicInfo",
        path: "basicinfo",
        component: ReportLayout,
        meta: {
          title: "隐患点基本信息",
          permission: "",
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
              permission: "",
              icon: ""
            }
          },
          {
            name: "report.addBasicInfo",
            path: "add",
            component: () => import("@/view/report/basicInfo/addBasicInfo"),
            meta: {
              title: "新增隐患点基本信息",
              permission: "",
              icon: ""
            }
          },
          {
            name: "report.editBasicInfo",
            path: "edit",
            component: () => import("@/view/report/basicInfo/editBasicInfo"),
            meta: {
              title: "编辑隐患点基本信息",
              permission: ""
            }
          }
        ]
      }
    ]
  }
];
