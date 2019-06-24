import Icon from "./Icon";
import comTable from "./comTable.vue";
import comAttachment from "./comAttachment.vue";
import Vue from "vue";
const commonComponents = {
  Icon,
  comTable,
  comAttachment
};
const components = { ...commonComponents };
Object.keys(components).forEach(key =>
  Vue.component(components[key].name, components[key])
);
export { default as svgIcon } from "./svgIcon";
