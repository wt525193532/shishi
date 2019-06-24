import Layout from "@/layout";

export default [
  {
    path: "/otherSetting",
    name: "otherSetting",
    component: Layout,
    redirect: { name: "logging" },
    meta: {
      displayName: "其他设置",
      icon: "tianbao",
      permission: ""
    },
    children: [
      {
        name: "logging",
        path: "logging",
        component: () => import("@/view/otherSetting/logging"),
        meta: {
          displayName: "日志管理",
          icon: "xzqh",
          permission: ""
        }
      }
    ]
  }
];
