<template>
  <div>
    <div class="gl-content-item">
      <el-form label-width="83px" :inline="true" size="medium">
        <el-form-item class="gl-form-item" label="检索：">
          <el-input
            placeholder="请输入"
            v-model="fetchData"
            class="input-with-select"
          ></el-input>
        </el-form-item>
        <el-button
          v-if="activeName == 'people'"
          type="primary"
          @click="fetchPeopleBtn()"
          size="medium"
          >查询</el-button
        >
        <el-button v-else type="primary" @click="fetchTeam()" size="medium"
          >查询</el-button
        >
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">值班人员列表</span>
        <div class="gl-btnList">
          <el-button
            size="medium"
            @click="
              activeName == 'people' ? openAddPeople() : openAddTeamDialog()
            "
          >
            <i class="el-icon-plus el-icon--left"></i>
            {{ activeName == "people" ? "新增人员" : "新增应急处理组" }}
          </el-button>
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        @tab-click="tabChange"
        style="margin-top:15px;"
        type="border-card"
      >
        <el-tab-pane
          v-for="item in tabMapOptions"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        >
          <Com-Table
            v-if="activeName == 'people'"
            :columns="peopleColumns"
            :dataSource="peopleDataList"
            :handleSelectionChange="handleSelectionChange"
            :options="peopleOptions"
            :fetch="fetchPeople"
            :pageSizes="pageSizes"
            :pagination="peoplePagination"
          >
            <template slot="func" slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="deletePeople(scope.row)"
              >
                <i class="el-icon-delete el-icon--left"></i>移除
              </el-button>
            </template>
          </Com-Table>
          <Com-Table
            v-else
            :columns="teamColumns"
            :dataSource="teamDataList"
            :handleSelectionChange="handleSelectionChange"
            :options="teamOptions"
            :fetch="fetchTeam"
            :pagination="teamPagination"
          >
            <template slot="func" slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="deleteTeam(scope.row)"
              >
                <i class="el-icon-delete el-icon--left"></i>删除
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="editTeam(scope.row)"
              >
                <i class="el-icon-edit el-icon--left"></i>
                编辑
              </el-button>
            </template>
          </Com-Table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <addPeopleDialog ref="addPeopleDialog" :fetchPeople="fetchPeople" />
    <addTeamDialog ref="addTeamDialog" :fetchTeam="fetchTeam"></addTeamDialog>
  </div>
</template>
<script>
import addPeopleDialog from "./addPeopleDialog";
import addTeamDialog from "./addTeamDialog";
export default {
  components: {
    addPeopleDialog,
    addTeamDialog
  },
  data() {
    return {
      addSelectList: [],
      selectList: [],
      activeName: "people",
      tabMapOptions: [
        { label: "值班人员", key: "people" },
        { label: "处理小组", key: "group" }
      ],
      fetchData: "",
      peopleColumns: [
        {
          prop: "type",
          label: "值班角色",
          render: row => (
            <span>{this.$t(`enums.DutyObjectType[${row.type}]`)}</span>
          )
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "department",
          label: "部门"
        },
        {
          prop: "phoneNumber",
          label: "手机"
        },
        // {
        //   prop: "emailAddress",
        //   label: "邮箱"
        // },
        {
          prop: "func",
          label: "操作"
        }
      ],
      teamColumns: [
        {
          prop: "name",
          label: "组名称"
        },
        {
          prop: "phoneNumber",
          label: "联系电话"
        },
        {
          prop: "",
          label: "成员数量",
          render: row => {
            return <span> {row.members.length}</span>;
          }
        },
        {
          prop: "func",
          label: "操作"
        }
      ],
      addPersonColumns: [
        {
          prop: "id",
          label: "编号",
          width: 60
        },
        {
          prop: "title",
          label: "姓名"
        },
        {
          prop: "author",
          label: "性别"
        },
        {
          prop: "author",
          label: "值班角色"
        },
        {
          prop: "author",
          label: "所属部门名称"
        },
        {
          prop: "author",
          label: "座机电话"
        },
        {
          prop: "author",
          label: "手机"
        },
        {
          prop: "author",
          label: "邮箱"
        }
      ],
      peopleDataList: [],
      teamDataList: [],
      peoplePagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 5
      },
      pageSizes: [5, 10],
      peopleOptions: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true, // 是否一挂载就加载数据
        border: true
      },
      teamPagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      teamOptions: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true, // 是否一挂载就加载数据
        border: true
      }
    };
  },
  mounted() {},
  computed: {
    allPeople() {
      return this.$store.state.common.allPeople;
    }
  },
  methods: {
    fetchPeopleBtn() {
      this.peoplePagination.pageIndex = 1;
      this.fetchPeople();
    },
    // 查询全部人员信息
    fetchPeople() {
      this.peopleOptions.loading = true;
      let parms = {
        key: this.fetchData,
        SkipCount:
          (this.peoplePagination.pageIndex - 1) *
          this.peoplePagination.pageSize,
        MaxResultCount: this.peoplePagination.pageSize
      };
      this.$store
        .dispatch("dutyManage/dutyPersonManage/getAllPeople", parms)
        .then(res => {
          this.peoplePagination.total = res.totalCount;
          this.peopleDataList = res.items;
          this.peopleOptions.loading = false;
        });
    },
    fetchTeamBtn() {
      this.teamPagination.pageIndex = 1;
      this.fetchTeam();
    },
    // 查询全部应急处理组信息
    fetchTeam() {
      this.teamOptions.loading = true;
      let parms = {
        key: this.fetchData,
        SkipCount:
          (this.teamPagination.pageIndex - 1) * this.teamPagination.pageSize,
        MaxResultCount: this.teamPagination.pageSize
      };
      this.$store
        .dispatch("dutyManage/dutyPersonManage/getAllTeam", parms)
        .then(res => {
          this.teamPagination.total = res.totalCount;
          this.teamDataList = res.items;
          this.teamOptions.loading = false;
        });
    },
    // 打开新增人员弹窗
    openAddPeople() {
      this.$refs["addPeopleDialog"].openAddPeople();
    },
    // 标签页改变事件
    tabChange() {
      if (this.activeName == "people") {
        this.fetchPeople();
      } else {
        this.fetchTeam();
      }
    },
    // 表单选择事件
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 删除人员
    deletePeople(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("dutyManage/dutyPersonManage/removePerson", row.id)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.$message.success("删除成功!");
              this.fetchPeople();
              this.$store.dispatch("common/getAllDutys");
            });
        })
        .catch(() => {});
    },
    // 删除应急处理组
    deleteTeam(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("dutyManage/dutyPersonManage/deleteTeam", row.id)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.$message.success("删除成功!");
              this.fetchTeam();
              this.$store.dispatch("common/getAllTeams");
            });
        })
        .catch(() => {});
    },
    // 编辑应急处理组
    editTeam(row) {
      this.$refs["addTeamDialog"].editTeam(row);
    },
    // 打开添加应急组弹框
    openAddTeamDialog() {
      this.$refs["addTeamDialog"].openAddTeamDialog();
    }
  }
};
</script>
