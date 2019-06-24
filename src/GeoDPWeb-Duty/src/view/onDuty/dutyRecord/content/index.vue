<template>
  <div class="gl-content-item">
    <el-tabs v-model="activeTabpage" type="border-card">
      <el-tab-pane label="值班记录" name="dutyMessage">
        <div class="gl-content-item" style="margin-bottom: 100px">
          <div class="gl-btn-row">
            <!-- <span class="gl-second-title">当次值班记录</span> -->
            <div class="gl-btnList">
              <el-button size="medium" @click="addRecord">
                <i class="el-icon-plus el-icon--left"></i>
                新增记录
              </el-button>
              <el-button size="medium" @click="exportFile">
                <i class="el-icon-download el-icon--left"></i>
                导出记录
              </el-button>
            </div>
          </div>
          <Com-Table
            :columns="columns"
            :dataSource="tableData"
            :options="options"
            :fetch="fetch"
            :handleSelectionChange="handleSelectionChange"
          >
            <template slot="func" slot-scope="scope">
              <el-button size="mini" @click="check(scope.row)">
                <i class="el-icon-view el-icon--left"></i>
                浏览
              </el-button>
              <el-button type="primary" size="mini" @click="editTab(scope.row)">
                <i class="el-icon-edit el-icon--left"></i>
                编辑
              </el-button>
            </template>
          </Com-Table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="当班信息" name="dutyInfo"
        ><onDutyInfo />
      </el-tab-pane>
    </el-tabs>
    <dutyRecordDialog
      ref="dutyRecordDialog"
      :getAllCurrent="fetch"
    ></dutyRecordDialog>
  </div>
</template>
<script>
import dutyRecordDialog from "./dutyRecordDialog";
import onDutyInfo from "./onDutyInfo";
export default {
  components: {
    dutyRecordDialog,
    onDutyInfo
  },
  data() {
    return {
      selectList: [],
      columns: [
        {
          prop: "recorderName",
          label: "记录人员",
          width: 200
        },
        {
          prop: "content",
          label: "记录内容"
        },
        {
          prop: "time",
          label: "记录时间",
          render: row => {
            return <span>{this.$util.transTime(row.time)}</span>;
          }
        },
        {
          prop: "keyWords",
          label: "类型",
          render: row => {
            let str = "";
            row.keyWords.forEach(v => {
              str = str + v + "、";
            });
            str = str.substr(0, str.length - 1);
            return <span>{str}</span>;
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
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true, // 是否一挂载就加载数据
        border: true
      },
      activeTabpage: "dutyMessage"
    };
  },
  mounted() {},
  methods: {
    fetch() {
      this.options.loading = true;
      let parms = {
        key: "",
        skipCount: 0,
        maxResultCount: 10000
      };
      this.$store
        .dispatch("onDuty/dutyRecord/getAllCurrent", parms)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.options.loading = false;
          this.tableData = res.items;
        });
    },
    exportFile() {
      if (this.selectList.length) {
        console.log(this.selectList);
      } else {
        this.$message.warning("请先选择要导出的数据");
      }
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 查看记录
    check(row) {
      this.$refs.dutyRecordDialog.openViewDutyRecord(row);
    },
    // 编辑记录
    editTab(row) {
      this.$refs.dutyRecordDialog.openEditDutyRecord(row);
    },
    // 新增记录
    addRecord() {
      this.$refs.dutyRecordDialog.openNewDutyRecord();
    }
  }
};
</script>
<style lang="less"></style>
