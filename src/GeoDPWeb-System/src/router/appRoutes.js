/* 系统路由配置 */
import Layout from "@/layout";
import routes from "./routes";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    permission:"Pages.xx",       访问此页面所需的权限
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

export const appRoutes = [
  ...routes,
  {
    path: "/",
    component: Layout,
    redirect: { name: "organization" },
    children: [
      {
        path: "home",
        component: () => import("@/view/home"),
        name: "home",
        meta: {
          displayName: "首页",
          icon: "component",
          permission: ""
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

export default appRoutes;
