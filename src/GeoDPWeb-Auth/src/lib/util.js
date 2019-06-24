import Cookie from "js-cookie";
import i18n from "@/locale";
import appconst from "./appconst";

const _isType = t => {
  return Object.prototype.toString
    .call(t)
    .slice(8, -1)
    .toLowerCase();
};
class Util {
  abp = window.abp;
  appconst = appconst;
  _saveLocalStorage(key, value) {
    if (_isType(value) === "string") {
      localStorage.setItem(key, value);
    } else {
      let Info = JSON.stringify(value);
      localStorage.setItem(key, Info);
    }
  }
  _getLocalStorage(item) {
    return localStorage.getItem(item);
  }

  _clearStorage() {
    localStorage.clear();
  }
  loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
  }
  title(title) {
    let appname = i18n.t("appName");
    let page = title;
    window.document.title = appname + "--" + page;
  }
  inOf(arr, targetArr) {
    let res = true;
    arr.forEach(item => {
      if (targetArr.indexOf(item) < 0) {
        res = false;
      }
    });
    return res;
  }
  oneOf(ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
      return true;
    } else {
      return false;
    }
  }
  showThisRoute(itAccess, currentAccess) {
    if (typeof itAccess === "object" && Array.isArray(itAccess)) {
      return this.oneOf(currentAccess, itAccess);
    } else {
      return itAccess === currentAccess;
    }
  }
  getRouterObjByName(routers, name) {
    if (!name || !routers || !routers.length) {
      return null;
    }
    //
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
  }
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
  }
  getToken() {
    return Cookie.get(appconst.cookieName.token);
  }

  setToken(token, expires) {
    if (expires) {
      Cookie.set(appconst.cookieName.token, token, { expires });
    } else {
      Cookie.set(appconst.cookieName.token, token);
    }
  }
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
  }
}
const util = new Util();
export default util;
