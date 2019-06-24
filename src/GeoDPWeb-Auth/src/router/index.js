import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import util from "@/lib/util";
import constantRouteMap from "./constantRoutes";
import appRouteMap from "./appRoutes";

Vue.use(Router);
NProgress.configure({ showSpinner: false }); // NProgress Configuration

//const whiteList = ["/login"]; // no redirect whitelist
const allRoutes = [...constantRouteMap, ...appRouteMap];
const router = new Router({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.NODE_ENV === "production" ? "/auth/" : "/",
  scrollBehavior: () => ({ y: 0 }),
  routes: allRoutes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  util.title(to.meta.title);
  if (!util.abp.user && to.name !== "login") {
    next({
      name: "login"
    });
  } else if (!!util.abp.user && to.name === "login") {
    util.title(to.meta.title);
    next({
      name: "home"
    });
  } else {
    const curRouterObj = util.getRouterObjByName(allRoutes, to.name);
    if (curRouterObj && curRouterObj.permission) {
      if (util.abp.auth.isGranted(curRouterObj.permission)) {
        util.toDefaultPage(allRoutes, to.name, router, next);
      } else {
        next({
          replace: true,
          name: "errorPage-403"
        });
      }
    } else if (curRouterObj) {
      util.toDefaultPage(allRoutes, to.name, router, next);
    } else {
      next({
        replace: true,
        name: "errorPage-404"
      });
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export const appRoutes = appRouteMap;
export const constantRoutes = constantRouteMap;
export default router;
