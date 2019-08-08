<template>
  <div>
    <el-tabs type="border-card" v-if="showPage">
      <el-tab-pane
        v-for="(item, index) in personalInfoData"
        :label="item.houseHoldName"
        :key="index"
        :name="item.name"
      >
        <risk-card-form :codeData="item" :isFromQuery="true" />
      </el-tab-pane>
    </el-tabs>
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import riskCardForm from "./default";
export default {
  name: "QueryViewRiskCard",
  components: { riskCardForm },
  data() {
    return {
      disabled: true,
      personalInfoData: [],
      formData: {},
      activeName: "0"
    };
  },
  computed: {
    showPage() {
      return this.personalInfoData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/riskCard/getByCode", this.$route.query.code)
      .then(data => {
        this.personalInfoData = data;
      });
  },
  methods: {}
};
</script>

<style lang="less"></style>
