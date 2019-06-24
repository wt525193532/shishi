<template>
  <div class="gl-content-item">
    <!-- <p class="gl-second-title gl-bottom-border">值班基本信息</p> -->
    <el-form
      label-width="110px"
      label-suffix="："
      :model="fetchForm"
      ref="fetchForm"
      :inline="true"
      size="medium"
    >
      <el-form-item class="gl-form-item" label="发生时间">
        <el-date-picker
          v-model="fetchForm.schDate"
          type="date"
          format="yyyy年MM月dd日"
          placeholder="请选择发生时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="gl-form-item" label="区县/乡镇" prop="">
        <el-cascader
          :options="areaList"
          placeholder="请输入区县/乡镇"
          change-on-select
        ></el-cascader>
      </el-form-item>
      <el-form-item class="gl-form-item" label="地点">
        <el-input v-model="fetchForm.phone" placeholder="请输入地点">
        </el-input>
      </el-form-item>
      <el-form-item class="gl-form-item" label="灾害类型" prop="">
        <el-select v-model="fetchForm.schWorker" placeholder="请选择灾害类型">
          <el-option
            v-for="item in schWorkerList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="gl-form-item" label="灾害级别" prop="">
        <el-select v-model="fetchForm.schWorker" placeholder="请选择灾害级别">
          <el-option
            v-for="item in schWorkerList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="gl-form-item" label="上报状态" prop="">
        <el-select v-model="fetchForm.schWorker" placeholder="请选择上报状态">
          <el-option
            v-for="item in schWorkerList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <slot></slot>
    </el-form>
    <div class="gl-text-center">
      <el-button type="primary" @click="fetch" size="medium">
        查询
      </el-button>
      <el-button @click="reset" size="medium">
        重置
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fetch: Function,
    reset: Function,
    fetchForm: Object
  },
  data() {
    return {
      schWorkerList: ["张三", "李四", "王二"],
      schMainLeaderList: ["张三", "李四", "王二"],
      schLeaderList: ["张三", "李四", "王二"],
      schDriverList: ["张三", "李四", "王二"],
      emergedGroupList: ["张三", "李四", "王二"],
      areaList: [
        {
          value: "zhinan",
          label: "双流区",
          children: [
            {
              value: "shejiyuanze",
              label: "华阳镇"
            }
          ]
        }
      ]
    };
  }
};
</script>
