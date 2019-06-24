<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
      <el-button
        v-if="isDelBtn"
        style="float: right; padding: 3px 0;color:#fff"
        type="text"
        >删除</el-button
      >
      <el-button
        v-else
        style="float: right; padding: 3px 0;"
        type="text"
        @click="del"
        >删除</el-button
      >
    </div>
    <el-form size="mini" ref="form" :disabled="!isEdit" label-width="40px">
      <el-form-item label="姓名">
        <el-input v-model="card.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="card.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
    </el-form>
    <!-- <div class="gl-text-center">
      <el-button type="primary" @click="edit">编辑</el-button>
      <el-button v-show="isDelBtn" @click="del">删除</el-button>
    </div>-->
  </el-card>
</template>
<script>
export default {
  name: "DutySetCard",
  model: {
    prop: "card",
    event: "input"
  },
  props: {
    title: {
      type: String,
      default: "值班人员"
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isDelBtn: {
      type: Boolean,
      default: true
    },
    card: {
      type: Object
    }
  },
  methods: {
    del(event) {
      this.$emit("on-del", event);
    }
  }
};
</script>
