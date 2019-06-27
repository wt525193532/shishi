<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size: 14px;">{{ title }}</span>
      <!-- <el-button
          style="float: right; padding: 3px 0"
          type="text"
          size="mini"
          @click="deleteCard(indexVal)"
          >删除</el-button
      >-->
      <el-button
        :disabled="isDisabled"
        size="mini"
        type="danger"
        style="float: right;"
        icon="el-icon-delete"
        @click="deleteCard(formData.id)"
        circle
      ></el-button>
    </div>
    <el-form :disabled="isDisabled" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-select v-model="formData.startTime" placeholder>
          <el-option
            v-for="(item, index) in 37"
            :key="index"
            :label="item < 25 ? index + ':00' : '次日 ' + (index - 24) + ':00'"
            :value="index * 60"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-select v-model="formData.endTime" placeholder>
          <el-option
            v-for="(item, index) in 36"
            :key="index"
            :label="item < 25 ? item + ':00' : '次日 ' + (item - 24) + ':00'"
            :value="item * 60"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: "FormCard",
  props: {
    formData: {
      type: Object,
      default: () => {
        return { name: "", startTime: "", endTime: "" };
      }
    },
    deleteCard: {
      type: Function,
      default: () => {}
    },
    isDisabled: Boolean,
    title: {
      type: String,
      default: "班次信息"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
