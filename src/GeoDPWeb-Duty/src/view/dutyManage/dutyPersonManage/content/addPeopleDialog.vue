<template>
  <div>
    <el-dialog
      title="新增人员"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
      width="800px"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="peoploFormData"
          ref="peoploForm"
          size="medium"
          :rules="rules"
          label-width="120px"
          label-suffix="："
        >
          <div class="gl-form-item">
            <el-form-item label="值班人员类型" prop="type">
              <el-select
                v-model="peoploFormData.type"
                placeholder="请选择值班人员类型"
              >
                <div
                  v-for="(item, index) in $t('enums.DutyObjectType')"
                  :key="index"
                >
                  <el-option
                    v-if="index != '4'"
                    :key="index"
                    :label="item"
                    :value="index"
                  ></el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="人员" class="gl-form-item">
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
                :fetch="queryUser"
                :pageSizes="pageSizes"
                :pagination="pagination"
              >
                <template slot="func" slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    :disabled="scope.row.isDisabled"
                    @click="addUser(scope.row)"
                    >添加</el-button
                  >
                </template>
              </Com-Table>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="gl-text-center">
          <el-button @click="handleClose" size="medium">取 消</el-button>
          <el-button
            type="primary"
            @click="addPeople"
            :loading="addBtnLode"
            size="medium"
            :disabled="btnAddDisable"
            >确定</el-button
          >
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DialogCom",
  props: {
    fetchPeople: Function
  },
  data() {
    return {
      dialogShow: false,
      peoples: [],
      peoploFormData: {
        type: null,
        userIds: []
      },
      users: [],
      columns: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "department",
          label: "部门名称"
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
        type: [{ required: true, message: "请选择人员类型", trigger: "change" }]
      },
      loadCount: 0,
      addBtnLode: false
    };
  },
  computed: {
    btnAddDisable() {
      return !(
        this.peoploFormData.type && this.peoploFormData.userIds.length > 0
      );
    },
    workspaceId() {
      return this.$store.getters.user.workspaceId;
    }
  },
  methods: {
    // 新增人员
    addPeople() {
      this.$refs["peoploForm"].validate(valid => {
        if (valid) {
          this.addBtnLode = true;
          this.$store
            .dispatch(
              "dutyManage/dutyPersonManage/addPerson",
              this.peoploFormData
            )
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.addBtnLode = false;
              this.handleClose();
              this.fetchPeople();
              this.$store.dispatch("common/getAllDutys");
              this.$message.success("添加人员成功！");
            });
        } else {
          this.$message.warning("验证不通过，请输入正确信息！");
          return false;
        }
      });
    },
    openAddPeople() {
      this.dialogShow = true;
      if (this.loadCount != 0) {
        this.queryUser();
      }
    },
    // 关闭新增人员弹窗
    handleClose() {
      this.peoploFormData = {
        type: null,
        userIds: []
      };
      this.$refs["peoploForm"].resetFields();
      this.peoples = [];
      this.dialogShow = false;
    },
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
      this.$store
        .dispatch("dutyManage/dutyPersonManage/getAllUserNotInDuty", parms)
        .then(res => {
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
    // 添加用户
    addUser(row) {
      this.peoples.push({ label: row.name, id: row.id });
      this.users = this.users.map(item => {
        if (item.id == row.id) {
          item.isDisabled = true;
        }
        return item;
      });
      this.peoploFormData.userIds.push(row.id);
    },
    // 删除用户
    deletePeople(tag) {
      this.peoples.splice(this.peoples.indexOf(tag), 1);
      this.users = this.users.map(item => {
        if (item.id == tag.id) {
          item.isDisabled = false;
        }
        return item;
      });
      this.peoploFormData.userIds.splice(
        this.peoploFormData.userIds.indexOf(tag.id),
        1
      );
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
  // margin-left: 50px;
  // margin-right: 50px;
}
</style>
