<template>
  <div class="subHeader">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item
        v-for="item in breadData"
        :key="item.name"
        :to="item.path"
        >{{ item.meta.displayName }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- <div class="btn"
         v-if="btnShow">
      <slot name="btn"></slot>
    </div>   -->
  </div>
</template>
<script>
export default {
  name: "SubHeader",
  data() {
    return {
      // breadData: []
      // btnName: '',
    };
  },
  computed: {
    btnData() {
      return this.$store.state.headerBtn.btnData;
    },
    btnShow() {
      return (
        this.$route.matched[this.$route.matched.length].path.indexOf("index") >
        0
      );
    },
    breadData() {
      let [...routeInfo] = this.$route.matched;
      routeInfo.splice(0, 1);
      let routes = routeInfo.filter(item => {
        return item.path.indexOf("index") < 0;
      });
      if (this.$route.query.routeName) {
        // routes.pop()
        routes.push({ path: "", meta: { role: this.$route.query.routeName } });
      }
      return routes;
    }
  }
};
</script>
<style lang="less" scoped>
.subHeader {
  height: 50px;
  width: 100%;
  padding: 0 20px;
  // position: fixed;
  // top: 100px;
  // border-bottom: 1px solid #e7e8ec;
  .bread {
    line-height: 50px;
    float: left;
  }
  .btn {
    float: right;
    margin-top: 10px;
  }
}
</style>
