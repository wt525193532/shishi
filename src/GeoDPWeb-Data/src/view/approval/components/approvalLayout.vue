<template>
  <div class="approvalLayout">
    <div class="funcArea">
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
        size="medium"
      >
        <el-form-item>
          <el-input v-model="queryForm.key" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-button type="primary" @click="query" icon="el-icon-search"
          >查询</el-button
        >
      </el-form>
    </div>
    <div class="tabArea">
      <el-tabs type="border-card" v-model="tab.activeName">
        <el-tab-pane
          v-for="item in tab.tabList"
          :key="item.name"
          :name="item.name"
          :label="item.label"
        ></el-tab-pane>
        <slot></slot>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "ApprovalLayout",
  props: {
    tab: Object,
    queryForm: Object,
    query: Function
  }
};
</script>
<style lang="less" scoped>
.approvalLayout {
  width: 100%;
  padding: 15px;
  background: #fff;
  .funcArea {
    // margin-top: 15px;
  }
}
</style>
