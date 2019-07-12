<template>
  <div class="report">
    <!-- <div class="report-header">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/report/workspace' }"
          >填报工作台</el-breadcrumb-item
        >
        <template v-for="route in routes">
          <el-breadcrumb-item
            v-if="showRoute(route)"
            :key="route.path"
            :to="{ path: route.path }"
            >{{ route.meta.title || route.name }}</el-breadcrumb-item
          >
        </template>
        <el-breadcrumb-item>{{ pageName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="page-container">
      <transition name="fade-transverse">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Report",
  computed: {
    pageName() {
      const meta = this.$route.meta;
      const name = meta && meta.title;
      return name || this.$route.name;
    },
    routes() {
      return this.$route.matched;
    }
  },
  methods: {
    showRoute(route) {
      let redirect = false;
      if (route.redirect) {
        let rs = this.routes.filter(r => r.path == route.redirect);
        redirect = rs && rs.length > 0;
      }
      return (
        !redirect &&
        route.path.toLowerCase() != this.$route.path.toLowerCase() &&
        !!route.meta.title
      );
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/theme/index.less";

.report {
  position: relative;
  background: #ffffff;
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
