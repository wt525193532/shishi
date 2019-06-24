import Cookie from "js-cookie";
import i18n from "@/locale";
import moment from "moment";
import appconst from "./appconst";

const util = {
  abp: window.abp,
  loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
  },
  title(title) {
    let appname = i18n.t("appName");
    let page = title;
    window.document.title = appname + "--" + page;
  },
  inOf(arr, targetArr) {
    let res = true;
    arr.forEach(item => {
      if (targetArr.indexOf(item) < 0) {
        res = false;
      }
    });
    return res;
  },
  oneOf(ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
      return true;
    } else {
      return false;
    }
  },
  showThisRoute(itAccess, currentAccess) {
    if (typeof itAccess === "object" && Array.isArray(itAccess)) {
      return this.oneOf(currentAccess, itAccess);
    } else {
      return itAccess === currentAccess;
    }
  },
  getRouterObjByName(routers, name) {
    if (!name || !routers || !routers.length) {
      return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
      if (item.name === name) {
        return item;
      }
      routerObj = this.getRouterObjByName(item.children, name);
      if (routerObj) {
        return routerObj;
      }
    }
    return null;
  },
  toDefaultPage(routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
      if (
        routers[i].name === name &&
        routers[i].children &&
        routers[i].redirect === undefined
      ) {
        route.replace({
          name: routers[i].children[0].name
        });
        notHandle = false;
        next();
        break;
      }
      i++;
    }
    if (notHandle) {
      next();
    }
  },
  getToken() {
    return Cookie.get(appconst.cookieName.token);
  },
  setToken(token, expires) {
    if (expires) {
      Cookie.set(appconst.cookieName.token, token, { expires });
    } else {
      Cookie.set(appconst.cookieName.token, token);
    }
  },
  extend(...args) {
    let options,
      name,
      src,
      srcType,
      copy,
      copyIsArray,
      clone,
      target = args[0] || {},
      i = 1,
      length = args.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = args[i] || {};
      i++;
    }
    if (typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = args[i]) !== null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          srcType = Array.isArray(src) ? "array" : typeof src;
          if (
            deep &&
            copy &&
            ((copyIsArray = Array.isArray(copy)) || typeof copy === "object")
          ) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && srcType === "array" ? src : [];
            } else {
              clone = src && srcType === "object" ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  },
  transaNumToChinese(num) {
    let transObj = {
      1: "一",
      2: "二",
      3: "三",
      4: "四",
      5: "五",
      6: "六",
      7: "七",
      8: "八",
      9: "九"
    };
    return transObj[num];
  },
  // 度转小数
  getLatitude(h, m, s) {
    let d = Number(h);
    let f = Number((m / 60).toFixed(6));
    let miao = Number((s / 3600).toFixed(6));
    let latitude = d + f + miao;
    return Number(latitude.toFixed(6));
  },
  // 小数 转 度分秒
  getDuFenMiao(num) {
    let arr = String(num).split(".");
    let d = arr[0];
    let f = arr[1] ? `0.${arr[1]}` : 0;
    f = (f * 60).toString();
    let mArr = f.split(".");
    let m = mArr[1] ? `0.${mArr[1]}` * 60 : 0;
    m = m.toFixed(2);
    return { d, f, m };
  },
  transDate(time) {
    return time ? moment(time).format("YYYY年 MM月 DD日") : "--";
  },
  transTime(time) {
    return time ? moment(time).format("YYYY年MM月DD日HH:mm:ss") : "--";
  }
};

export default util;
