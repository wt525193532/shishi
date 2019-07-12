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
          <el-form-item class="gl-form-item" label="地点" prop="location">
            <el-input
              v-model="fetchForm.location"
              placeholder="请输入地点"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="gl-form-item"
            label="灾害类型"
            prop="disasterType"
          >
            <el-select
              v-model="fetchForm.disasterType"
              placeholder="请选择灾害类型"
            >
              <el-option
                v-for="item in $t('disasterType')"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
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
          <span class="gl-second-title">成功避险报送</span>
          <div class="gl-btnList">
            <el-button
              size="medium"
              icon="el-icon-upload2"
              @click="upReport"
              v-if="activeName === 'awaitRoported'"
              >上报至总站</el-button
            >
            <el-button
              v-if="userUnit.level >= 3"
              size="medium"
              icon="el-icon-plus"
              @click="addForm"
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
                  v-if="activeName === 'awaitRoported' && userUnit.level >= 3"
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="edit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="activeName === 'awaitRoported' && userUnit.level >= 3"
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
// import reportDialog from "../../components/reportDialog";
export default {
  components: {
    detail
    // reportDialog
  },
  data() {
    return {
      activeName: "awaitRoported",
      tabMapOptions: [
        { label: "待上报", key: "awaitRoported" },
        { label: "已上报总站", key: "reported" }
      ],
      fetchForm: {
        location: "",
        disasterType: "",
        adminCode: ""
      },
      columns: [
        {
          prop: "isReported",
          label: "上报状态",
          render: row => {
            return <span>{row.isReported ? "已上报" : "未上报"}</span>;
          }
        },
        {
          prop: "disasterType",
          label: "灾害类型"
        },
        {
          prop: "scale",
          label: "灾害规模"
        },
        {
          prop: "location",
          label: "地点"
        },
        {
          prop: "forecastTime",
          label: "发出预报时间",
          width: 155,
          render: row => {
            return <span>{this.$util.transTime(row.forecastTime)}</span>;
          }
        },
        {
          prop: "evacuationTime",
          label: "人员撤离时间",
          width: 155,
          render: row => {
            return <span>{this.$util.transTime(row.evacuationTime)}</span>;
          }
        },
        {
          prop: "happenTime",
          label: "灾害发生时间",
          width: 155,
          render: row => {
            return <span>{this.$util.transTime(row.happenTime)}</span>;
          }
        },
        {
          prop: "evacuatioNumber",
          label: "撤离避让人数(人)",
          width: 130
        },
        {
          prop: "avoidCasualty",
          label: "避免伤亡人数(人)",
          width: 130
        },
        {
          prop: "avoidEcoLoss",
          label: "避免经济损失(万元)",
          width: 145
        },
        {
          prop: "methodAndMeasure",
          label: "预报方法和避灾措施",
          width: 150
        },
        {
          prop: "achievement",
          label: "成绩突出人员(或单位)",
          width: 158
        },
        {
          prop: "remark",
          label: "备注"
        },
        {
          prop: "func",
          label: "操作",
          width: 270,
          fixed: "right"
        }
      ],
      tableData: [],
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
      formCanEdit: false,
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
      if (this.activeName == "reported") {
        this.columns[this.columns.length - 1].width = 100;
      } else {
        this.columns[this.columns.length - 1].width = 270;
      }

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
      let { location, disasterType, adminCode } = this.fetchForm;
      let params = {
        location,
        disasterType,
        adminCode,
        isReported: false,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      if (this.activeName != "awaitRoported") {
        params.isReported = true;
      }
      this.$store
        .dispatch("dutyReport/successHedgeReport/queryItems", params)
        .then(res => {
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
          this.options.loading = false;
        });
    },
    addForm() {
      this.formCanEdit = true;
      this.$router.push({ query: { routeName: "新增成功避险报送" } });
    },
    edit(row) {
      this.formCanEdit = true;
      this.$router.push({
        query: { id: row.id, routeName: "编辑成功避险报送" }
      });
    },
    check(row) {
      this.formCanEdit = false;
      this.$router.push({
        query: { id: row.id, routeName: "查看成功避险报送" }
      });
    },
    deleteFun(row) {
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.$store
            .dispatch("dutyReport/successHedgeReport/deleteItem", row.id)
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
              .dispatch("dutyReport/successHedgeReport/report", reportForm)
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
