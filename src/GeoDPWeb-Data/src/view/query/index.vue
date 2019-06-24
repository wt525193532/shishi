<template>
  <transition name="fade-transverse">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "Query"
};
</script>
<style lang="less" scoped>
@import "~@/theme/index.less";

.query {
  position: relative;
  // background: #ffffff;
  // padding: 15px;
  &-header {
    position: fixed;
    // z-index: @zindex-spin;
    background-color: @background-color-base;
    top: @head-height;
    left: @sidebar-width;
    right: 0;
    padding: 1em;
  }
  .breadcrumb {
    font-size: 1.5em;
  }
  .page-container {
    // margin-top: 3.5em;
    // height: calc(100vh - @head-height - 3.5em);
    // overflow: auto;
  }
}
</style>
