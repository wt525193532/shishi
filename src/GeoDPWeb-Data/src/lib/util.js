import Cookie from "js-cookie";
import i18n from "@/locale";
import appconst from "./appconst";
import moment from "moment";
import { Message, MessageBox } from "element-ui";
import Router from "@/router";

class Util {
  abp = window.abp;
  appconst = appconst;
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
    return Cookie.get(window.geodp.appconst.cookieName.token);
  }

  setToken(token, expires) {
    if (expires) {
      Cookie.set(window.geodp.appconst.cookieName.token, token, { expires });
    } else {
      Cookie.set(window.geodp.appconst.cookieName.token, token);
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
    /* 如果第一参数为 布尔类型 target 往后顺移*/
    if (typeof target === "boolean") {
      deep = target;
      target = args[i] || {};
      i++;
    }
    /* 如果第一个参数 不是对象或者函数 强制给他空对象*/
    if (typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    /* 如果循环到形参长度，或者只传一个参数*/
    if (i === length) {
      target = this;
      i--; /* 如果只传一个参数 会成负数 */
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
  transDate(time) {
    return time ? moment(time).format("YYYY-MM-DD") : "--";
  }
  transTime(time) {
    return time ? moment(time).format(time, "YYYY-MM-DD HH:mm:ss") : "--";
  }
  weekToDate(time) {
    return time
      ? moment(time, "YYYY/w")
          .add(1, "d")
          .toDate()
      : "";
  }
  dateToWeek(time) {
    return time ? moment(time).format("YYYY/w") : "";
  }
  async addSaveConfirm(flag) {
    let res;
    if (flag) {
      res = await MessageBox.confirm("保存成功, 是否继续填写?", "提示", {
        confirmButtonText: "退出",
        cancelButtonText: "继续",
        type: "success",
        closeOnClickModal: false
      })
        .then(() => {
          Message({
            type: "success",
            message: "保存成功!"
          });
          return true;
        })
        .catch(() => {
          Message({
            type: "success",
            message: "保存成功!"
          });
          return false;
        });

      if (res) {
        Router.go(-1);
      }
    } else {
      Message({
        type: "info",
        message: "保存不成功，验证未通过"
      });
    }
    return res;
  }

  editSaveMessage(flag) {
    if (flag) {
      Router.go(-1);
      Message({
        type: "success",
        message: "保存成功!"
      });
    } else {
      Message({
        type: "warning",
        message: "保存不成功，验证未通过"
      });
    }
  }
}
const util = new Util();
export default util;
