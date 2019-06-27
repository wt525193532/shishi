<template>
  <div>
    <div class="gl-content-item">
      <el-form
        label-width="110px"
        label-suffix="："
        :inline="true"
        size="medium"
      >
        <el-form-item class="gl-form-item" label="交接人姓名">
          <el-input
            v-model="queryData.name"
            placeholder="请输入交班人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="交接内容">
          <el-input
            v-model="queryData.content"
            placeholder="请输入交接内容"
          ></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="交接时间" prop="sendTime">
          <el-date-picker
            v-model="queryData.handOverTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item class="gl-form-item" label="交接开始时间">
          <el-date-picker
            v-model="queryData.handOverStartTime"
            type="date"
            format="yyyy年MM月dd日"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="gl-form-item" label="交接结束时间">
          <el-date-picker
            v-model="queryData.handOverEndTime"
            type="date"
            format="yyyy年MM月dd日"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>-->
        <div class="gl-text-center">
          <el-button type="primary" @click="fetch" size="medium"
            >查询</el-button
          >
          <el-button @click="rest" size="medium">重置</el-button>
        </div>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">交接班信息</span>
      </div>
      <div>
        <Com-Table
          :columns="columns"
          :dataSource="tableData"
          :options="options"
          :fetch="fetch"
          :pagination="pagination"
        >
          <template slot="func" slot-scope="scope">
            <el-button size="mini" @click="check(scope.row)">
              <i class="el-icon-view el-icon--left"></i>
              浏览附件
            </el-button>
          </template>
        </Com-Table>
      </div>
    </div>
    <dialogCom ref="dialogForm"></dialogCom>
  </div>
</template>
<script>
import dialogCom from "./dialogCom";
export default {
  components: {
    dialogCom
  },
  data() {
    return {
      queryData: {
        handOverTime: [],
        content: "",
        name: ""
      },
      columns: [
        {
          prop: "handOverPerson",
          label: "交班人"
        },
        {
          prop: "takeOverPerson",
          label: "接班人"
        },
        {
          prop: "content",
          label: "交班内容"
        },
        {
          prop: "isTaken",
          label: "是否已接班",
          render: row => {
            return <span>{row.isTaken ? "是" : "否"}</span>;
          }
        },
        {
          prop: "handTime",
          label: "交班时间",
          render: row => {
            return <span>{this.$util.transTime(row.handTime)}</span>;
          }
        },
        {
          prop: "takeTime",
          label: "接班时间",
          render: row => {
            return <span>{this.$util.transTime(row.takeTime)}</span>;
          }
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
          width: 250
        }
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
      const { handOverTime, name, content } = this.queryData;
      let params = {
        handOverStartTime: handOverTime[0],
        handOverEndTime: handOverTime[1],
        content: content,
        name: name,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store
        .dispatch("dutyManage/schedueManage/getAllHandOverInfo", params)
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
        handOverTime: [],
        content: "",
        name: ""
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
