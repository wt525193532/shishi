<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <el-form-item label="姓名">
      <el-select
        clearable
        style="width: 100%"
        v-model="leader"
        placeholder="请选择"
      >
        <el-option
          v-for="item in dotyPerson"
          :key="item.id"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="leader.phoneNumber" placeholder="" disabled></el-input>
    </el-form-item>
    <el-form-item label="部门">
      <el-input v-model="leader.department" placeholder="" disabled></el-input>
    </el-form-item>
  </el-card>
</template>
<script>
export default {
  name: "LeaderCard",
  props: {
    leader: {
      type: Object,
      default: null
    },
    dotyPerson: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: "领导"
    }
  }
};
</script>
