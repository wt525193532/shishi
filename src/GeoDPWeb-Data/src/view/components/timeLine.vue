<template>
  <div>
    <el-timeline>
      <el-timeline-item
        :timestamp="getDay(item.handleTime)"
        placement="top"
        v-for="(item, index) in processes"
        :key="index"
      >
        <el-card class="timeline-card">
          <h4>{{ $t("enums.ProcessType." + item.type) }}</h4>
          <p v-if="item.node">审核节点：{{ item.node.name }}</p>
          <p>提交人：{{ item.handler.name }}</p>
          <p v-if="item.comment">审核意见：{{ item.comment }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "TimeLine",
  props: {
    processes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    getDay(time) {
      let date = new Date(time);
      // eslint-disable-next-line no-unused-vars
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    }
  }
};
</script>
