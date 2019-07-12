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
            placeholder="请输入类型、内容"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="queryBtn" size="medium"
          >查询</el-button
        >
        <el-form-item
          class="gl-form-item"
          label="值班记录类型"
          label-width="180px"
        >
          <el-select
            v-model="dutyType"
            @change="dutyTypeChange"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in dutyTypes"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="rest" size="medium">重置</el-button>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">值班记录信息</span>
        <div class="gl-btnList" v-if="isShowDel">
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="delRecord"
            >删除记录</el-button
          >
        </div>
      </div>
      <div>
        <Com-Table
          :columns="columns"
          :dataSource="tableData"
          :options="options"
          :fetch="fetch"
          :pagination="pagination"
          :handleSelectionChange="handleSelectionChange"
        >
          <template slot="func" slot-scope="scope">
            <el-button size="mini" icon="el-icon-view" @click="check(scope.row)"
              >浏览</el-button
            >
          </template>
        </Com-Table>
      </div>
    </div>
    <RecordInfoDialog ref="RecordInfoDialog"></RecordInfoDialog>
  </div>
</template>
<script>
import RecordInfoDialog from "../../dutyRecord/content/dutyRecordDialog";
export default {
  components: {
    RecordInfoDialog
  },
  data() {
    return {
      dutyType: "",
      dutyTypes: [
        { label: "类型一" },
        { label: "类型二" },
        { label: "类型三" },
        { label: "类型四" },
        { label: "类型五" }
      ],
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
          label: "类型",
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
        },
        {
          prop: "func",
          label: "操作",
          width: 150
        }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        mutiSelect: this.isShowDel ? true : false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
        // border: true,
      },
      recordList: []
    };
  },
  computed: {
    isShowDel() {
      return this.$store.state.session.auth.grantedPermissions[
        "Pages.Duty.Manage"
      ];
    }
  },
  methods: {
    // 查看记录
    check(row) {
      this.$refs.RecordInfoDialog.openViewDutyRecord(row);
    },
    queryBtn() {
      this.pagination.pageIndex = 1;
      this.fetch();
    },
    fetch() {
      this.options.loading = true;
      this.dutyType = "";
      let params = {
        key: this.queryData.key,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("onDuty/dutyRecord/getAll", params).then(res => {
        this.options.loading = false;
        this.tableData = res.items;
        this.pagination.total = res.totalCount;
      });
    },
    dutyTypeChange(val) {
      this.options.loading = true;
      let params = {
        key: val,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("onDuty/dutyRecord/getAllByKey", params)
        .then(res => {
          this.options.loading = false;
          this.tableData = res.items;
          this.pagination.total = res.totalCount;
        });
    },
    handleSelectionChange(vals) {
      this.recordList = vals;
    },
    delRecord() {
      if (this.recordList.length > 0) {
        this.options.loading = true;
        this.$store
          .dispatch("onDuty/dutyRecord/delRecord", this.recordList)
          .then(() => {
            this.options.loading = false;
            this.fetch();
          });
      } else {
        this.$message.warning("请选择一条记录！");
      }
    },
    rest() {
      this.queryData = {
        key: ""
      };
      this.dutyType = "";
    }
  }
};
</script>
<style lang="less"></style>
