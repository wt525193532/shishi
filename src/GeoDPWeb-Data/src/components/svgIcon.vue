<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      if (this.name.match(/(icon-)+/g)) return `#${this.name}`;
      return `#icon-geodp-${this.name}`;
    }
  }
};
</script>

<style scoped></style>
