import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import zhLocale from "./lang/zh";

Vue.use(VueI18n);

const messages = {
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};

const i18n = new VueI18n({
  locale: Cookies.get("language") || "zh",
  messages
});

export default i18n;
