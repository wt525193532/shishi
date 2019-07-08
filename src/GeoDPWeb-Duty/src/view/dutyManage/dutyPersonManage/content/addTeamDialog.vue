<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="800px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        :model="teamData"
        ref="teamForm"
        size="medium"
        :rules="rules"
        label-width="110px"
        label-suffix="："
      >
        <el-form-item label="小组名称" class="gl-form-item" prop="name">
          <el-input v-model="teamData.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="gl-form-item" prop="phoneNumber">
          <el-input v-model="teamData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="组成员" class="gl-form-item">
          <div class="tag-wapper">
            <el-tag
              v-for="tag in peoples"
              :key="tag.label"
              class="tags-margin"
              size="lg"
              closable
              @close="deletePeople(tag)"
              >{{ tag.label }}</el-tag
            >
          </div>
        </el-form-item>
        <div class="usersTab">
          <Com-Table
            :columns="columns"
            :dataSource="users"
            :options="options"
            :pageSizes="pageSizes"
            :fetch="queryUser"
            :pagination="pagination"
          >
            <template slot="func" slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="scope.row.isDisabled"
                @click="addPeople(scope.row)"
                >添加</el-button
              >
            </template>
          </Com-Table>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="gl-text-center">
        <el-button @click="handleClose" size="medium">取 消</el-button>
        <el-button
          type="primary"
          @click="saveTeam()"
          :disabled="btnAddDisable"
          :loading="saveBtnLoad"
          size="medium"
          >确 定</el-button
        >
      </div>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCom",
  props: {
    fetchTeam: Function
  },
  data() {
    return {
      title: "新增处理小组",
      dialogShow: false,
      peoples: [],
      teamData: {
        id: 0,
        name: "",
        phoneNumber: "",
        members: []
      },
      users: [],
      columns: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "departmentName",
          label: "部门名称",
          render: row => {
            if (row.jobPost) {
              return (
                <span>{row.departmentName + "[" + row.jobPost + "]"}</span>
              );
            }
            return <span>{row.departmentName}</span>;
          }
        },
        {
          prop: "func",
          label: "操作"
        }
      ],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 5
      },
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: true, // 表格动画
        initTable: true, // 是否一挂载就加载数据
        border: true
      },
      pageSizes: [5, 10],
      rules: {
        name: [
          { required: true, message: "请输入组名称", trigger: "blur" },
          { max: 32, message: "长度在 32 个字符以内", trigger: "blur" }
        ],
        phoneNumber: [
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ]
      },
      loadCount: 0,
      saveBtnLoad: false
    };
  },
  computed: {
    btnAddDisable() {
      return !(this.teamData.name && this.teamData.members.length > 0);
    },
    workspaceId() {
      return this.$store.getters.user.workspaceId;
    }
  },
  methods: {
    // 获取用户
    queryUser() {
      this.loadCount += 1;
      this.options.loading = true;
      let parms = {
        workspaceId: this.workspaceId,
        key: "",
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("user/getAllByUnit", parms).then(res => {
        let data = res.items;
        for (let y = 0; y < this.peoples.length; y++) {
          for (let x = 0; x < data.length; x++) {
            if (this.peoples[y].id == data[x].id) {
              data[x].isDisabled = true;
            } else if (data[x].isDisabled == true) {
              data[x].isDisabled = true;
            } else {
              data[x].isDisabled = false;
            }
          }
        }
        this.users = data;
        this.pagination.total = res.totalCount;
        this.options.loading = false;
      });
    },
    // 添加处理组人员
    addPeople(row) {
      this.peoples.push({ label: row.name, id: row.id });
      this.users = this.users.map(item => {
        if (item.id == row.id) {
          item.isDisabled = true;
        }
        return item;
      });
      this.teamData.members.push(row.id);
    },
    // 删除处理组人员
    deletePeople(tag) {
      this.peoples.splice(this.peoples.indexOf(tag), 1);
      this.users = this.users.map(item => {
        if (item.id == tag.id) {
          item.isDisabled = false;
        }
        return item;
      });
      this.teamData.members.splice(this.teamData.members.indexOf(tag.id), 1);
    },
    // 保存应急处理组
    saveTeam() {
      this.$refs["teamForm"].validate(valid => {
        if (valid) {
          this.saveBtnLoad = true;
          this.$store
            .dispatch("dutyManage/dutyPersonManage/saveTeam", this.teamData)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.saveBtnLoad = false;
              this.handleClose();
              this.fetchTeam();
              this.$store.dispatch("common/getAllTeams");
              this.$message.success("保存成功！！！");
            });
        } else {
          this.$message.warning("验证不通过，请输入正确信息！");
          return false;
        }
      });
    },
    // 打开添加应急组弹框
    openAddTeamDialog() {
      this.title = "新增处理小组";
      this.dialogShow = true;
      if (this.loadCount != 0) {
        this.queryUser();
      }
    },
    // 编辑应急处理组
    editTeam(row) {
      this.dialogShow = true;
      this.title = "编辑处理小组";
      row.members.forEach(item => {
        this.peoples.push({
          label: item.name,
          id: item.userId
        });
        this.teamData.members.push(item.userId);
      });
      this.teamData.id = row.id;
      this.teamData.name = row.name;
      this.teamData.phoneNumber = row.phoneNumber;
      if (this.loadCount != 0) {
        this.queryUser();
      }
    },
    // 关闭新增应急处理组弹窗
    handleClose() {
      this.peoples = [];
      this.teamData = {
        name: "",
        phoneNumber: "",
        members: []
      };
      this.$refs["teamForm"].resetFields();
      this.dialogShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.tags-margin {
  margin-right: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.usersTab {
  // margin-left: 110px;
}
</style>
