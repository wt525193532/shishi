<template>
  <div>
    <div class="clearfix">
      <el-button
        icon="el-icon-printer"
        class="print-btn"
        type="primary"
        size="mini"
        v-print="'#mineInformationPrint'"
        >打印表单</el-button
      >
    </div>
    <mine-information-form
      id="mineInformationPrint"
      :formData="formData"
      :canEdit="false"
      disabled
    />
  </div>
</template>

<script>
import mineInformationForm from "@/view/components/mineInformationForm.vue";
export default {
  name: "ViewMineInformation",
  components: { mineInformationForm },
  data() {
    return {
      formData: {
        code: "",
        name: "",
        kaicaikzdm: "",
        xkz: "",
        fzjg: "",
        yxqx: "",
        ssqx: "",
        weizhi: "",
        fanwei: "",
        area: 0,
        kczt: "",
        scgm: "",
        kqgm: "",
        dzhjgk: "",
        dzzhfyqk: "",
        bzj: "",
        fhzlqk: "",
        remark: "",
        lon: undefined,
        lat: undefined,
        isLVSE: true,
        isGUOJIA: true,
        isZHUANYE: null,
        attachments: [
          {
            key: "",
            name: "",
            displayName: "",
            tag: "",
            extension: "",
            url: "",
            id: 0
          }
        ],
        id: 0
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("querypage/mineInformation/getById", this.$route.query.id)
      .then(res => {
        this.formData = res.result;
      });
  }
};
</script>
