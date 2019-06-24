<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <el-form :disabled="isShow" label-width="80px">
        <el-form-item label="流程Id">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="节点名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="上一节点Id">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="下一节点Id">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <div v-for="(p, index) in formData.userHandlers" :key="index">
          <el-form-item label="用户名">
            <el-input
              v-model="formData.userHandlers[index].userName"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formData.userHandlers[index].name"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <div class="gl-text-center">
        <el-button size="mini" type="primary" @click="edit">编辑</el-button>
        <el-button size="mini" type="primary" @click="save">保存</el-button>
      </div> -->
    </el-card>
  </div>
</template>
<script>
export default {
  name: "NodeCard",
  props: {
    formData: {
      type: Object,
      default: () => {
        return { name: "", beginData: "", endData: "" };
      }
    },
    deleteCard: {
      type: Function,
      default: () => {}
    },
    indexVal: Number
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    edit() {
      this.isShow = false;
    },
    save() {
      this.isShow = true;
    }
  }
};
</script>
