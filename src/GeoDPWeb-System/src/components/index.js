import comTable from "./comTable.vue";
import Vue from "vue";
const commonComponents = {
  comTable
};
const components = { ...commonComponents };
Object.keys(components).forEach(key =>
  Vue.component(components[key].name, components[key])
);
export { default as svgIcon } from "./svgIcon";
