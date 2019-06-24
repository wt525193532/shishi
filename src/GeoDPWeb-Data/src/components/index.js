import svgIcon from "./svgIcon.vue";
import comTable from "./comTable.vue";
import ComAttachment from "./comAttachment";
import Vue from "vue";
const commonComponents = {
  ComAttachment,
  svgIcon,
  comTable
};
const components = { ...commonComponents };
Object.keys(components).forEach(key =>
  Vue.component(components[key].name, components[key])
);
// export { default as svgIcon } from "./svgIcon";
