<template>
  <div>
    <div class="gl-content-item">
      <chartBar
        title="防灾概述报送统计"
        :seriesData="seriesData"
        :xAxisData="xAxisData"
      ></chartBar>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">防灾概述报送信息</span>
        <div class="gl-btnList">
          <el-button type="" icon="el-icon-upload2" size="medium"
            >批量报送</el-button
          >
          <el-button type="" size="medium" icon="el-icon-upload"
            >批量导出</el-button
          >
        </div>
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :fetch="fetch"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
      >
        <template slot="func" slot-scope="scoped">
          <el-button icon="el-icon-view" size="mini" @click="check(scoped.row)"
            >浏览</el-button
          >
          <el-button
            icon="el-icon-upload2"
            size="mini"
            @click="report(scoped.row)"
            >报送</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteFun(scoped.row)"
            >删除</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scoped.row)"
            >编辑</el-button
          >
        </template>
      </com-table>
    </div>
  </div>
</template>
<script>
import chartBar from "@/view/statisticalAnalysis/components/chartBar";

export default {
  name: "DisasterSummaryRS",
  components: {
    chartBar
  },
  data() {
    return {
      fenthForm: {
        name: "",
        num: 0
      },
      // Echart x轴名称
      xAxisData: [
        "滑坡",
        "崩塌",
        "泥石流",
        "地面塌陷",
        "地面沉降",
        "地裂缝",
        "其他"
      ],
      // Echart y轴数据
      seriesData: [213, 432, 168, 125, 232, 321, 249],
      // table
      columns: [
        {
          prop: "quhua",
          label: "灾情(处)"
        },
        {
          prop: "quhua",
          label: "险情(处)"
        },
        {
          prop: "quhua",
          label: "成功避险(处)"
        },
        {
          prop: "quhua",
          label: "避险转移人数(人次)"
        },
        {
          prop: "quhua",
          label: "隐患点排查处(处)"
        },
        {
          prop: "quhua",
          label: "降雨情况"
        },
        {
          prop: "quhua",
          label: "报送状态"
        },
        {
          prop: "func",
          label: "操作",
          width: 400
        }
      ],
      tableData: [
        {
          quhua: "534"
        }
      ],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        // maxHeight: 500,
        mutiSelect: true,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      }
    };
  },
  methods: {
    fetch() {},
    handleRowClick(row, event, column) {
      // 点击行的事件，同理可以绑定其他事件
      console.log("click row:", row, event, column);
    },
    handleSelectionChange(selection) {
      console.log(this.pagination, selection);
    },
    check(row) {
      console.log(row);
    },
    edit(row) {
      console.log(row);
    },
    deleteFun(row) {
      console.log(row);
    },
    report(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less" scoped>
// .el-input-number--small {
//   width: 162px;
// }
.el-date-editor--daterange.el-input__inner {
  width: 280px;
}
.el-form-item--small.el-form-item {
  min-width: 400px;
}
</style>
