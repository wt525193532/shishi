<template>
  <div v-loading.lock="loading">
    <detail v-if="routeName" :canEdit="formCanEdit"></detail>
    <div v-else>
      <div class="gl-content-item">
        <el-form
          label-width="110px"
          label-suffix="："
          :model="fetchForm"
          ref="fetchForm"
          :inline="true"
          size="medium"
        >
          <el-form-item class="gl-form-item" label="行政区划" prop>
            <el-cascader
              v-model="fetchForm.adminCode"
              :props="props"
            ></el-cascader>
          </el-form-item>
          <div class="gl-text-center">
            <el-button
              type="primary"
              :loading="options.loading"
              @click="queryBtn"
              size="medium"
              >查询</el-button
            >
            <el-button @click="reset" size="medium">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <span class="gl-second-title">防灾概述报送</span>
          <div class="gl-btnList">
            <el-button
              size="medium"
              icon="el-icon-upload2"
              @click="upReport"
              v-if="activeName === 'awaitRoported'"
              >上报至总站</el-button
            >
            <el-button size="medium" icon="el-icon-plus" @click="addForm"
              >新增待上报数据</el-button
            >
            <!-- <el-button size="medium" icon="el-icon-download">
              导出记录
            </el-button>-->
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
              :columns="columns"
              :dataSource="tableData"
              :handleSelectionChange="handleSelectionChange"
              :options="options"
              :fetch="query"
              :pagination="pagination"
            >
              <template slot="func" slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-view"
                  @click="check(scope.row)"
                  >浏览</el-button
                >
                <el-button
                  v-if="activeName === 'awaitRoported'"
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="edit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="activeName === 'awaitRoported'"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteFun(scope.row)"
                  >删除</el-button
                >
              </template>
            </Com-Table>
          </el-tab-pane>
        </el-tabs>
        <!-- <reportDialog ref="reportDialog" :reportFunc="reportFunc" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import detail from "./detail";
export default {
  components: {
    detail
  },
  data() {
    return {
      activeName: "awaitRoported",
      tabMapOptions: [
        { label: "待上报", key: "awaitRoported" },
        { label: "已上报总站", key: "reported" }
      ],
      fetchForm: {
        adminCode: ""
      },
      formCanEdit: true,
      columns: [
        {
          prop: "disaster",
          label: "灾情(处)"
        },
        {
          prop: "danger",
          label: "险情(处)"
        },
        {
          prop: "avoid",
          label: "成功避险(处)",
          width: 105
        },
        {
          prop: "transfer",
          label: "避险转移人数(人)",
          width: 130
        },
        {
          prop: "patrol",
          label: "隐患点排查(处)",
          width: 115
        },
        {
          prop: "checkDuty",
          label: "电话抽查值班室(次)",
          width: 145
        },
        {
          prop: "checkSite",
          label: "电话抽查隐患点(处)",
          width: 145
        },
        {
          prop: "checkPreventOwer",
          label: "电话抽查防灾责任人(人)",
          width: 175
        },
        {
          prop: "checkMonitorOwer",
          label: "电话抽查监测责任人(人)",
          width: 175
        },
        {
          prop: "checkMonitor",
          label: "电话抽查专职监测人(人)",
          width: 175
        },
        {
          prop: "other",
          label: "其他防灾工作",
          width: 105
        },
        {
          prop: "rain",
          label: "降雨情况"
        },
        {
          prop: "remark",
          label: "备注"
        },
        {
          prop: "func",
          label: "操作",
          width: 300,
          fixed: "right"
        }
      ],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: true,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true, // 是否一挂载就加载数据
        border: true,
        selected: row => {
          if (row.isReported) {
            return false;
          } else {
            return true;
          }
        }
      },
      tableData: [],
      selectColumns: [],
      props: {
        label: "displayName",
        value: "adminCode",
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            resolve([this.userUnit]);
          } else if (node.level >= 1) {
            this.$store
              .dispatch("organization/getAdministrative", node.value)
              .then(res => {
                resolve(res.children);
              });
          }
        }
      },
      loading: false
    };
  },
  computed: {
    routeName() {
      return this.$route.query.routeName;
    },
    userUnit() {
      return this.$store.getters.area;
    }
  },
  methods: {
    tabChange() {
      this.query();
    },
    reset() {
      this.fetchForm = {
        location: "",
        disasterType: "",
        adminCode: ""
      };
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.query();
    },
    query() {
      this.options.loading = true;
      let { adminCode } = this.fetchForm;
      let params = {
        adminCode,
        isReported: false,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      if (this.activeName != "awaitRoported") {
        params.isReported = true;
      }
      this.$store
        .dispatch("dutyReport/preDisasterReport/queryItems", params)
        .then(res => {
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
          this.options.loading = false;
        });
    },
    addForm() {
      this.formCanEdit = true;
      this.$router.push({ query: { routeName: "新增防灾概述报送" } });
    },
    edit(row) {
      this.formCanEdit = true;
      this.$router.push({
        query: { id: row.id, routeName: "编辑防灾概述报送" }
      });
    },
    check(row) {
      this.formCanEdit = false;
      this.$router.push({
        query: { id: row.id, routeName: "查看防灾概述报送" }
      });
    },
    deleteFun(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$store
            .dispatch("dutyReport/preDisasterReport/deleteItem", row.id)
            .then(res => {
              if (res) {
                this.$message.success("删除成功！");
                this.loading = false;
                this.query();
              }
            });
        })
        .catch(() => {
          return false;
        });
    },
    upReport() {
      if (this.selectColumns.length == 0) {
        this.$message.warning("请选择上报数据！");
      } else {
        this.$confirm("是否确认上报？", "提示", {
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            let reportForm = {
              listerName: null,
              reviewerName: null,
              title: null,
              items: []
            };
            this.selectColumns.forEach(({ id }) => {
              reportForm.items.push(id);
            });
            this.$store
              .dispatch("dutyReport/preDisasterReport/report", reportForm)
              // eslint-disable-next-line no-unused-vars
              .then(res => {
                this.$message.success("上报成功！");
                this.loading = false;
                this.query();
              });
          })
          .catch(() => {
            return false;
          });
      }
    },
    handleSelectionChange(columns) {
      this.selectColumns = columns;
    }
  }
};
</script>
