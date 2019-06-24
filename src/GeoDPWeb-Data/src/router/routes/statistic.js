/* 统计功能路由配置 */
import Layout from "@/layout";

export default [
  {
    name: "statistic",
    path: "/statistic",
    component: Layout,
    redirect: "/statistic/dangerPoint",
    meta: {
      title: "统计",
      icon: "tongji",
      permission: "Pages.Data.Statistic"
    },
    children: [
      {
        name: "statistic.dangerPoint",
        path: "dangerPoint",
        component: () => import("@/view/statistic/dangerPoint"),
        meta: {
          title: "隐患点基本信息统计",
          icon: "tongji",
          permission: "Pages.Data.Statistic"
        }
      },
      {
        name: "statistic.mine",
        path: "mine",
        component: () => import("@/view/statistic/mine"),
        meta: {
          title: "矿山基本信息统计",
          icon: "tongji",
          permission: "Pages.Data.Statistic"
        }
      }
    ]
  }
];
