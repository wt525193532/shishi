/* 审核功能路由配置 */
import Layout from "@/layout";
// import ApprovalLayout from "@/view/approval";
export default [
  {
    name: "approval",
    path: "/approval",
    component: Layout,
    redirect: "/approval/index",
    meta: {
      title: "审核",
      permission: "Pages.Data.Approval",
      icon: ""
    },
    children: [
      {
        name: "approval.index",
        path: "index",
        component: () => import("@/view/approval"),
        meta: {
          title: "审核",
          permission: "Pages.Data.Approval",
          icon: ""
        }
      },
      {
        name: "approval.view",
        path: "view",
        component: () => import("@/view/approval/view"),
        meta: {
          title: "查看",
          permission: "Pages.Data.Approval"
        }
      }
      // {
      //   name: "approval.workspace",
      //   path: "workspace",
      //   component: () => import("@/view/approval/workspace"),
      //   meta: {
      //     title: "审核工作台",
      //     icon: "tianbao",
      //     permission: "Pages.Data.Approval"
      //   }
      // },
      // {
      //   name: "approval.basicInfo",
      //   path: "basicinfo",
      //   component: ApprovalLayout,
      //   meta: {
      //     title: "隐患点基本信息",
      //     permission: "Pages.Data.Approval",
      //     icon: "hiddenTrouble"
      //   },
      //   redirect: "/approval/basicinfo/index",
      //   children: [

      //   ]
      // }
    ]
  }
];
