/* 静态页面路由配置 */
const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login"),
    hidden: true,
    meta: {
      title: "登录页",
      icon: "component",
      permission: "Pages"
    }
  },
  {
    path: "/404",
    name: "errorPage-404",
    component: () => import("@/view/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    name: "errorPage-401",
    component: () => import("@/view/errorPage/401"),
    hidden: true
  },
  {
    path: "/403",
    name: "errorPage-403",
    component: () => import("@/view/errorPage/403"),
    hidden: true
  }
  // {
  //   path: "/home",
  //   component: () => import("@/view/home"),
  //   meta: { title: "home", icon: "home" }
  // }
];
export default constantRoutes;
