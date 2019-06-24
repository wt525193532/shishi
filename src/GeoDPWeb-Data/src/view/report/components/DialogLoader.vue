<template>
  <div>
    <el-dialog
      v-if="flag === $util.appconst.DataStatusEnum.Processing"
      title="选择隐患点"
      :visible.sync="dialogTableVisible"
      :show-close="false"
    >
      <!-- Form -->
      <el-form :model="form" :inline="true">
        <el-form-item label="隐患点编号">
          <el-input
            v-model="form.number"
            autocomplete="off"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="隐患点名称">
          <el-input
            v-model="form.name"
            autocomplete="off"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)" size="small"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        ref="singleTable"
        :data="gridData"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column
          v-for="(item, key) in tabTitle"
          :property="key"
          :label="item"
          :key="item"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear" size="small">关闭</el-button>
        <el-button type="primary" size="small" @click="submit(currentRow)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-form :model="fromNumber">
      <el-dialog
        v-if="flag === 0"
        title="创建隐患点编号"
        :visible.sync="dialogTableVisible"
        center
        :show-close="false"
      >
        <div class="dialog-title">
          <span
            >市（州）：<b>{{ cityName }}</b></span
          >
          <span>区（县）：<b>2</b></span>
        </div>
        <div class="dialog-content">
          <span
            >隐患点编号：<b> {{ citycode }}</b> +</span
          >
          <el-form-item style="margin-left: 5px">
            <el-input
              v-model="fromNumber.number"
              autocomplete="off"
              size="small"
            ></el-input>
          </el-form-item>
          <span> (隐患点后四位可修改)</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-form-item>
            <el-button @click="clear" size="small">关闭</el-button>
            <el-button type="primary" size="small" @click="submit(fromNumber)"
              >确 定</el-button
            >
          </el-form-item>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DialogLoader",
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    clear: Function,
    submit: Function,
    onSubmit: Function,
    tabTitle: Object,
    gridData: Array,
    flag: {
      type: Number,
      default: 1
    },
    number: String
  },
  data() {
    return {
      form: {
        name: "",
        number: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      currentRow: null
    };
  },
  computed: {
    ...mapGetters({
      citycode: "common/getCityCode",
      cityName: "common/getCityName"
    }),
    fromNumber() {
      if (this.number) return { number: this.number };
      return { number: null };
    }
  },
  methods: {
    // handleClose () {
    //   this.clear()
    //   this.setCurrent()
    // },
    handleCurrentChange(v) {
      this.currentRow = v;
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-title {
  display: flex;
  span {
    width: 50%;
    b {
      margin-left: 10px;
    }
  }
}
.dialog-content {
  display: flex;
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  b {
    margin-right: 5px;
  }
}
</style>
