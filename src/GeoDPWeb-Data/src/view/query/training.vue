<template>
  <div class="query">
    <div class="query-form">
      <el-form
        ref="queryForm"
        :model="queryForm"
        label-width="100px"
        :inline="true"
        size="small"
      >
        <el-form-item label="行政区划" prop="adminCode">
          <el-cascader
            v-model="queryForm.adminCode"
            :props="adminCodeProps"
            placeholder="-- 请选择行政区划 --"
            collapse-tags
          ></el-cascader>
        </el-form-item>
        <el-form-item label="关键字" prop="key">
          <el-input
            class="input-min-width"
            v-model="queryForm.key"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="isApproval">
          <el-select
            v-model="queryForm.isApproval"
            clearable
            placeholder="审核状态"
          >
            <el-option label="已入库" :value="true"></el-option>
            <el-option label="未入库" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryBtn">查询</el-button>
          <el-button @click="reset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gl-table">
      <div class="gl-table-func">
        <el-button
          type="primary"
          class="gl-table-func-btn"
          @click="downLoad(selectList)"
          >下载</el-button
        >
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :query="query"
        :pagination="pagination"
        :handleSelectionChange="handleSelectionChange"
      >
        <template slot="status" slot-scope="scoped">
          <el-tag
            :type="
              scoped.row.status == $util.appconst.DataStatusEnum.Approval
                ? 'success'
                : scoped.row.status == $util.appconst.DataStatusEnum.Disapproval
                ? 'danger'
                : 'primary'
            "
            >{{ $t(`enums.DataStatus[${scoped.row.status}]`) }}</el-tag
          >
        </template>
        <template slot="func" slot-scope="scoped">
          <el-button size="mini" @click="view(scoped.row)">查看</el-button>
          <!-- <el-button size="mini" type="primary" @click="downLoad(scoped.row)"
            >下载</el-button
          >-->
        </template>
      </com-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainingQuery",
  props: {
    advancedSearch: {
      type: Boolean,
      default: false
    },

    onQuery: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      queryForm: {
        disasterTypes: [],
        adminCode: "",
        key: "",
        isApproval: null,
        route: ""
      },
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: true,
        expand: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      tableData: [],
      selectList: [],
      columns: [
        {
          prop: "countryName",
          label: "区县"
        },
        {
          prop: "trainTime",
          label: "培训课时"
        },
        {
          prop: "trainPeoCount",
          label: "总参训人数"
        },
        {
          prop: "prevenName",
          label: "防治负责人"
        },
        {
          prop: "disasterName",
          label: "防灾负责人"
        },
        {
          prop: "propagandaCount",
          label: "宣传场次"
        },
        {
          prop: "propagandaPeople",
          label: "宣传人数"
        },
        {
          type: "func",
          label: "操作",
          width: 180,
          fixed: "right"
        }
      ],
      isDisplay: false,
      onShow: false,
      adminCodeProps: {
        label: "displayName",
        value: "adminCode",
        multiple: false,
        emitPath: false,
        checkStrictly: true,
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            if (!this.user) {
              resolve([{ adminCode: "510100000000", displayName: "成都市" }]);
            } else {
              resolve([this.user]);
            }
          } else if (node.level >= 1) {
            this.$store
              .dispatch("organization/getAdministrative", node.value)
              .then(res => {
                resolve(res.children);
              });
          }
        }
      }
    };
  },
  computed: {
    // tableData() {
    //   return this.$store.state.query.tableData;
    // },
    user() {
      return this.$store.getters.area;
    }
  },
  created() {
    this.query();
  },
  methods: {
    reset(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    view(row) {
      this.$router.push({
        path: "/query/training/otherFormDetail",
        query: { id: row.id, code: row.code }
      });
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.query();
    },
    query() {
      this.$store
        .dispatch("query/trainingQuery", {
          ...this.queryForm,
          maxResultCount: this.pagination.pageSize,
          skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize
        })
        .then(res => {
          this.tableData = res.items;
          this.pagination.total = res.totalCount || 0;
        });
    },
    downLoad(dataList) {
      if (dataList.length) {
        import("@/lib/Export2Excel").then(excel => {
          const tHeader = [
            "区县",
            "培训时长",
            "总参训人数",
            "防治负责人",
            "防灾负责人",
            "宣传场次",
            "宣传人数"
          ];
          const filterVal = [
            "countryName",
            "trainTime",
            "trainPeoCount",
            "prevenName",
            "disasterName",
            "propagandaCount",
            "propagandaPeople"
          ];
          const data = this.formatJson(filterVal, dataList);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "培训演练信息",
            bookType: "xlsx"
          });
        });
      } else {
        this.$message.info("请先选择要下载的数据");
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>
