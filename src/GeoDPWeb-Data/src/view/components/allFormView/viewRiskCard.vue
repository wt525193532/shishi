<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="showPage">
      <el-tab-pane
        v-for="(item, index) in personalInfoData"
        :label="item.houseHoldName"
        :key="index"
        :name="item.name"
      >
        <risk-card-form :disabled="disabled" :formData="item" :noBtn="false" />
      </el-tab-pane>
    </el-tabs>
    <!-- <el-table :data="personalInfoData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in display"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="170"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="95%" :visible.sync="dialogFormVisible">
      <risk-card-form
        :disabled="disabled"
        :formData="formData"
        :btnExcuteFunc="view"
        :noBtn="false"
      />
    </el-dialog>-->
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import riskCardForm from "@/view/components/riskCardForm";
export default {
  name: "QueryViewRiskCard",
  data() {
    return {
      disabled: true,
      personalInfoData: [],
      formData: {},
      // dialogFormVisible: false,
      activeName: "0",
      display: [
        { prop: "houseHoldName", label: "户主姓名" },
        { prop: "familyMemberCount", label: "家庭人数" },
        { prop: "houseHoldPhone", label: "家庭人数" },
        { prop: "houseType", label: "联系电话" },
        { prop: "rescueCoName", label: "救护单位名称" },
        { prop: "houseAddress", label: "家庭住址" },
        { prop: "resettleCoName", label: "安置单位名称" },
        { prop: "sentCoName", label: "本卡发放单位名称" }
      ]
    };
  },
  computed: {
    showPage() {
      return this.personalInfoData.length;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/riskCard/getByCode", this.$route.query.code)
      .then(data => {
        this.personalInfoData = data;
      });
  },
  methods: {
    handleClick() {}
  },

  components: { riskCardForm }
};
</script>

<style lang="less"></style>
