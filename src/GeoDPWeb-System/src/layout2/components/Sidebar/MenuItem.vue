<template>
  <!-- eslint-disable vue/require-component-is-->
  <component v-if="title" v-bind="bind()" class="menu-item-title">
    <slot>
      <component v-if="!!icon" is="svg-icon" :name="icon"></component>
      <span>{{ title }}</span>
    </slot>
  </component>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "span"
    },
    url: {
      type: String,
      default: ""
    }
  },
  methods: {
    bind() {
      if (this.url) {
        return {
          is: "router-link",
          to: this.url,
          tag: this.tag
        };
      }
      return {
        is: this.tag
      };
    }
  }
};
</script>
