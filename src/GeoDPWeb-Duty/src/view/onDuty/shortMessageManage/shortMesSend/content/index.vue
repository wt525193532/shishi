<template>
  <div class="gl-content-item">
    <div class="send-btn-group">
      <el-button size="medium" @click="reset">重置</el-button>
      <el-button size="medium" type="primary" :loading="sendLoad" @click="send"
        >发送</el-button
      >
    </div>
    <div>
      <el-form
        :model="sendForm"
        label-suffix="："
        :rules="rules"
        ref="sendForm"
        inline
        label-width="92px"
      >
        <div>
          <el-form-item label="接收人员" prop="receivers">
            <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              closable
              @close="delTag(tag)"
              class="tags-margin"
              size="lg"
            >
              {{ tag.name }}
            </el-tag>
            <el-button size="medium" icon="el-icon-plus" @click="openDialog"
              >添加接收人员</el-button
            >
          </el-form-item>
        </div>
        <el-form-item class="file-send" label="审核领导" prop="leader">
          <el-select v-model="sendForm.leader" placeholder="请选择审核领导">
            <el-option
              v-for="(item, index) in dutyLeaders"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item class="file-send" label="短信分类" prop="type">
            <el-select v-model="sendForm.type" placeholder="请选择短信分类">
              <el-option label="灾情上报" value="灾情上报"></el-option>
              <el-option label="意外事件报送" value="意外事件报送"></el-option>
              <el-option
                label="重要天气预警预报"
                value="重要天气预警预报"
              ></el-option>
              <el-option label="其它" value="其它"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="SMS-template">
          <el-popover placement="right" trigger="click">
            <com-table
              :columns="columns"
              :dataSource="tableData"
              :options="options"
              :fetch="fenth"
              :handleCurrentChange="currentChange"
            >
            </com-table>
            <el-button slot="reference">短信模版</el-button>
          </el-popover>
        </div>
        <div class="line">
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              :rows="12"
              placeholder="请输入内容"
              v-model="sendForm.content"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="gl-text-center">
      <el-button size="medium" @click="reset">重置</el-button>
      <el-button size="medium" type="primary" :loading="sendLoad" @click="send"
        >发送</el-button
      >
    </div>
    <addPeopleDialog
      :add="addPeople"
      ref="addPeople"
      :getCheckNodes="getCheckNodes"
    />
  </div>
</template>
<script>
import addPeopleDialog from "./addPeopleDialog";
export default {
  name: "ShortMesSend",
  components: {
    addPeopleDialog
  },
  data() {
    return {
      sendForm: {
        leader: "",
        type: "",
        content: "",
        receivers: []
      },
      tags: [],
      tempTags: [],
      tempUsers: [],
      columns: [
        {
          prop: "name",
          label: "名称",
          width: 150
        },
        {
          prop: "content",
          label: "模板内容",
          width: 500
        }
      ],
      tableData: [],
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true, // 是否一挂载就加载数据
        border: true,
        highlightCurrentRow: true
      },
      rules: {
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 0,
            max: 256,
            message: "长度在 256 个字符以内",
            trigger: "blur"
          }
        ],
        receivers: [{ required: true, message: "请选择接收人员" }]
      },
      sendLoad: false
    };
  },
  computed: {
    dutyLeaders() {
      return this.$store.state.common.allDutyLeaders;
    }
  },
  mounted() {},
  methods: {
    openDialog() {
      this.$refs.addPeople.openDialog(this.sendForm.receivers);
    },
    // eslint-disable-next-line no-unused-vars
    getCheckNodes(value, data) {
      let checkedNodes = [];
      let userIds = [];
      if (data.checkedNodes) {
        data.checkedNodes.forEach(item => {
          if (!item.children) {
            checkedNodes.push(item);
            userIds.push(item.id);
          }
        });
        this.tempTags = checkedNodes;
        this.tempUsers = userIds;
      }
    },
    fenth() {
      this.options.loading = true;
      let params = {
        key: "",
        skipCount: 0,
        maxResultCount: 9999
      };
      this.$store.dispatch("SMS/queryTemplate", params).then(res => {
        this.tableData = res.items;
        this.options.loading = false;
      });
    },
    currentChange({ content }) {
      this.sendForm.content = content;
      this.$refs["sendForm"].clearValidate(["content"]);
    },
    addPeople() {
      this.tags = this.tempTags;
      this.sendForm.receivers = this.tempUsers;
      this.$refs["sendForm"].clearValidate(["receivers"]);
      this.$refs.addPeople.handleClose();
    },
    // tag删除按钮
    delTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.sendForm.receivers.splice(
        this.sendForm.receivers.indexOf(tag.id),
        1
      );
    },
    send() {
      this.sendLoad = true;
      this.$refs["sendForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否确认发送短信?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              // eslint-disable-next-line no-unused-vars
              this.$store.dispatch("SMS/send", this.sendForm).then(res => {
                this.sendLoad = false;
                this.tags = [];
                this.$refs["sendForm"].resetFields();
                this.$message.success("发送成功！");
              });
            })
            .catch(() => {
              this.sendLoad = false;
              this.$message({
                type: "info",
                message: "取消发送！"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "验证不通过！"
          });
          this.sendLoad = false;
          return false;
        }
      });
    },
    reset() {
      this.tags = [];
      this.$refs["sendForm"].resetFields();
    }
  }
};
</script>
<style lang="less">
.send-btn-group {
  margin-bottom: 15px;
}
.SMS-template {
  margin-bottom: 15px;
  margin-left: 90px;
}
.tags-margin {
  margin-right: 10px;
}
.file-send {
  .el-form-item__content {
    width: 445px !important;
    .el-select {
      width: 100%;
    }
    .el-textarea {
      width: 100%;
    }
  }
}
.tag-wapper {
  min-width: 445px;
  min-height: 36px;
}
</style>
