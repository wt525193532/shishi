<template>
  <div>
    <div class="gl-content-item">
      <el-form
        label-width="110px"
        label-suffix="："
        :inline="true"
        size="medium"
      >
        <el-form-item class="gl-form-item" label="关键字">
          <el-input
            v-model="queryData.key"
            placeholder="请输入关键词、内容"
          ></el-input>
        </el-form-item>
        <!-- <div class="gl-text-center"> -->
        <el-button type="primary" @click="fetch" size="medium">查询</el-button>
        <el-button @click="rest" size="medium">重置</el-button>
        <!-- </div> -->
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">值班记录信息</span>
      </div>
      <div>
        <Com-Table
          :columns="columns"
          :dataSource="tableData"
          :options="options"
          :fetch="fetch"
          :pagination="pagination"
        >
          <!-- <template slot="func" slot-scope="scope">
            <el-button size="mini" @click="check(scope.row)">
              <i class="el-icon-view el-icon--left"></i>
              浏览附件
            </el-button>
          </template>-->
        </Com-Table>
      </div>
    </div>
    <!-- <dialogCom ref="dialogForm"></dialogCom> -->
  </div>
</template>
<script>
// import dialogCom from "./dialogCom";
export default {
  components: {
    // dialogCom
  },
  data() {
    return {
      queryData: {
        key: ""
      },
      columns: [
        {
          prop: "time",
          label: "记录时间",
          render: row => {
            return <span>{this.$util.transTime(row.time)}</span>;
          }
        },
        {
          prop: "recorderName",
          label: "记录人"
        },
        {
          label: "关键词",
          render: row => {
            let keyStr = "";
            if (!row.keyWords) {
              return <span>--</span>;
            }
            row.keyWords.forEach((key, index) => {
              if (index == row.keyWords.length - 1) {
                keyStr += key;
                return;
              }
              keyStr += key + "、";
            });
            return <span>{keyStr}</span>;
          }
        },
        {
          prop: "content",
          label: "内容"
        },
        {
          prop: "attachments",
          label: "附件",
          render: row => {
            return <span>{row.attachments.length}</span>;
          }
        }
        // {
        //   prop: "func",
        //   label: "操作",
        //   width: 250
        // }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
        // border: true,
      }
    };
  },
  methods: {
    fetch() {
      this.options.loading = true;
      let params = {
        key: this.queryData.key,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("onDuty/dutyRecord/getAll", params)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.options.loading = false;
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
          // this.onDotyInfo = res;
        });
    },
    rest() {
      this.queryData = {
        key: ""
      };
      this.pagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    check(row) {
      this.$refs.dialogForm.openDialog(row.attachments);
    }
  }
};
</script>
<style lang="less"></style>
