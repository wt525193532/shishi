<template>
  <div class="gl-content-item">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="红色预警" name="first">红色预警</el-tab-pane>
      <el-tab-pane label="橙色预警" name="second">橙色预警</el-tab-pane>
      <el-tab-pane label="黄色预警" name="third">黄色预警</el-tab-pane>
      <el-tab-pane label="蓝色预警" name="fourth">蓝色预警</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "RainFallManage",
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>
