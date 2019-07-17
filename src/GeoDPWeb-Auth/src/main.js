import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./theme/index.less";
import "@/assets/icons/iconfont-default";
import "@/assets/icons/iconfont";

import { svgIcon } from "@/components";

import i18n from "./locale";

if (process.env.NODE_ENV === "development") {
  require("./mock"); // simulation data
}

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: "medium",
  zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
});
Vue.component("svg-icon", svgIcon); // 注册svgIcon为全局组件

new Vue({
  render: h => h(App),
  i18n,
  router,
  store,
  created() {},
  mounted() {}
}).$mount("#app");
