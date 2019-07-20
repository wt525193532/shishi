<template>
  <div>
    <div v-if="!routeName">
      <div class="gl-content-item">
        <div class="gl-btn-row">
          <el-radio-group v-model="fetchForm.defaultActive" size="medium">
            <el-radio-button label="成都市灾情"></el-radio-button>
            <el-radio-button label="已上报灾情"></el-radio-button>
          </el-radio-group>
          <div class="gl-btnList">
            <!-- <el-button size="medium"
                       @click="$router.push({query: {routeName: '新增灾情报送'}})">
              <i class="el-icon-plus el-icon--left"></i>
              新增灾情报送
            </el-button>-->
            <slot></slot>
            <el-button
              size="medium"
              @click="upReport"
              v-if="fetchForm.defaultActive === '成都市灾情'"
            >
              <i class="el-icon-upload2 el-icon--left"></i>
              上报
            </el-button>
            <!-- <el-button size="medium" @click="exportRecord">
              <i class="el-icon-download el-icon--left"></i>
              导出记录
            </el-button>-->
          </div>
        </div>
        <Com-Table
          :columns="columns[fetchForm.defaultActive]"
          :dataSource="tableData"
          :options="options"
          :fetch="fetch"
          :handleSelectionChange="handleSelectionChange"
          :pagination="pagination"
        >
          <template slot></template>
          <template slot="func" slot-scope="scope">
            <el-button size="mini" @click="check(scope.row)">
              <i class="el-icon-view el-icon--left"></i>
              浏览
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="edit(scope.row)"
              v-if="fetchForm.defaultActive === '成都市灾情'"
            >
              <i class="el-icon-edit el-icon--left"></i>
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="edit(scope.row)"
              v-if="fetchForm.defaultActive === '成都市灾情'"
            >
              <i class="el-icon-delete el-icon--left"></i>
              删除
            </el-button>
          </template>
        </Com-Table>
      </div>
    </div>
    <detail v-else :detailSure="detailSure"></detail>
  </div>
</template>
<script>
export default {
  props: {
    columns: Object,
    tableData: Array
  },
  data() {
    return {
      dialogShow: false,
      dialogForm: {
        time: "2019-4-15"
      },
      fetchForm: {
        defaultActive: "成都市灾情",
        schDate: [],
        schWorkers: [
          { name: "值班1", phone: 13550337264 },
          { name: "值班2", phone: 13550337464 }
        ],
        schMainLeader: "",
        schLeader: "",
        schDriver: "",
        emergedGroup: "",
        phone: ""
      },
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: true,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      selectList: []
    };
  },
  computed: {
    routeName() {
      return this.$route.query.routeName;
    }
  },
  methods: {
    // 添加值班人员
    addSchWork() {},
    // 删除值班人员
    deleteSchWork() {},
    // 上报
    upReport() {
      if (this.selectList.length) {
        //
      } else {
        this.$message.warning("请先选择要上报的数据");
      }
    },
    // 导出记录
    exportRecord() {
      if (this.selectList.length) {
        //
      } else {
        this.$message.warning("请先选择要导出的数据");
      }
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    save() {
      this.$refs.fetchForm.validate(valid => {
        if (valid) {
          //
        }
      });
      // this.options.loading = true
    },
    fetch() {},
    reset() {
      this.pagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
      this.fetch();
    },
    deleteFun(row) {
      console.log(row);
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    edit(row) {
      console.log(row);
      this.$router.push({ query: { routeName: "编辑灾情报送" } });
    },
    check(row) {
      console.log(row);
      this.$router.push({ query: { routeName: "查看灾情报送" } });
    },
    sure() {},
    detailSure() {
      this.$router.go(-1);
    }
  }
};
</script>
