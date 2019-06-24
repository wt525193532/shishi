<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: "YjIcon",
  props: {
    icon: String
  }
};
</script>
