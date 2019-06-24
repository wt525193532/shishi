<template>
  <div class="reportLayout">
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
        <el-button @click="add" icon="el-icon-circle-plus-outline"
          >新增
        </el-button>
        <el-button
          v-show="tab.activeName == $util.appconst.DataStatusEnum.UnCommit"
          icon="el-icon-upload2"
          type="primary"
          @click="submit"
          class="submit-button"
          style="float: right;"
          >提交
        </el-button>
      </el-form>
    </div>
    <div class="tabArea">
      <el-tabs type="border-card" v-model="tab.activeName">
        <el-tab-pane
          v-for="item in tab.tabList"
          :key="item.name"
          :name="String(item.name)"
          :label="item.label"
        ></el-tab-pane>
        <slot></slot>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReportLayout",
  props: {
    tab: Object,
    queryForm: Object,
    query: Function,
    submit: Function,
    add: Function
  }
};
</script>
<style lang="less" scoped>
.reportLayout {
  width: 100%;
  background: #fff;
  padding: 15px;
  .funcArea {
    // margin-top: 15px;
  }
}
</style>
