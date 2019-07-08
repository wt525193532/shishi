<template>
  <div class="disasterRS">
    <div class="gl-content-item">
      <el-form
        :model="fenthForm"
        label-suffix="："
        size="medium"
        inline
        label-width="110px"
      >
        <el-form-item class="gl-form-item" label="文档类型">
          <el-select
            v-model="fenthForm.types"
            multiple
            placeholder="请选择文档类型"
          >
            <el-option
              v-for="(value, code) in $t('codes.FileMailType')"
              :key="code"
              :label="value"
              :value="code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="gl-form-item" label="发件人">
          <el-input
            v-model="fenthForm.sender"
            placeholder="请输入发件人"
          ></el-input>
        </el-form-item>
        <el-form-item class="gl-form-item" label="主题">
          <el-input
            v-model="fenthForm.theme"
            placeholder="请输入主题"
          ></el-input>
        </el-form-item>

        <div class="gl-text-center">
          <el-form-item class="gl-form-item">
            <el-button type="primary" @click="fenth">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="gl-content-item">
      <div class="gl-btn-row">
        <span class="gl-second-title">收文箱</span>
        <div class="gl-btnList">
          <el-button
            icon="el-icon-refresh"
            :loading="options.loading"
            @click="fenth"
            size="medium"
            >刷新</el-button
          >
          <!-- <el-button size="medium" icon="el-icon-upload"
            >导出选中文件</el-button
          >-->
        </div>
      </div>
      <com-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :fetch="fenth"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
      >
        <template slot="func" slot-scope="scoped">
          <el-button icon="el-icon-view" size="mini" @click="check(scoped.row)"
            >浏览</el-button
          >
          <el-button
            icon="el-icon-share"
            size="mini"
            type="primary"
            @click="forward(scoped.row)"
            >转发</el-button
          >
        </template>
      </com-table>
    </div>
    <receiveDialog ref="receiveDialog" />
    <forwardDialog ref="forwardDialog" />
  </div>
</template>
<script>
import receiveDialog from "@/view/components/receiveDialog";
import forwardDialog from "../../components/forwardDialog";
export default {
  name: "ReceiveBox",
  components: {
    receiveDialog,
    forwardDialog
  },
  data() {
    return {
      fenthForm: {
        types: [],
        sender: "",
        theme: ""
      },
      columns: [
        {
          prop: "sendTime",
          label: "发文时间",
          render: row => {
            return <span>{this.$util.transTime(row.sendTime)}</span>;
          }
        },
        {
          prop: "sendWorkspalce",
          label: "发文单位"
        },
        {
          prop: "sendUser",
          label: "发文用户"
        },
        {
          prop: "theme",
          label: "主题"
        },
        {
          prop: "typeCode",
          label: "文档类型",
          render: row => {
            return <span>{this.$t("codes.FileMailType." + row.typeCode)}</span>;
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
          width: 200
        }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: {
        // maxHeight: 500,
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      }
    };
  },
  methods: {
    reset() {
      this.fenthForm = {
        types: [],
        sender: "",
        key: ""
      };
      this.pagination = {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      };
    },
    handleRowClick(row, event, column) {
      // 点击行的事件，同理可以绑定其他事件
      console.log("click row:", row, event, column);
    },
    handleSelectionChange(selection) {
      console.log(this.pagination, selection);
    },
    fenth() {
      this.options.loading = true;
      let parms = {
        types: this.fenthForm.types,
        sender: this.fenthForm.sender,
        theme: this.fenthForm.theme,
        skipCount: (this.pagination.pageIndex - 1) * this.pagination.pageSize,
        maxResultCount: this.pagination.pageSize
      };
      this.$store.dispatch("fileMail/queryReceive", parms).then(res => {
        this.pagination.total = res.totalCount;
        this.tableData = res.items;
        this.options.loading = false;
      });
    },
    check(row) {
      this.$refs.receiveDialog.viewReceive(row);
    },
    forward(row) {
      this.$refs.forwardDialog.open(row);
    }
  }
};
</script>
