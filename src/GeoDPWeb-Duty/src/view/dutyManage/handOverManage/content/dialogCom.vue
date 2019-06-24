<template>
  <el-dialog
    title="附件浏览"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    width="1100px"
    :before-close="handleClose"
  >
    <div>
      <comAttachment
        v-model="attachments"
        :fileOption="fileOption"
        ref="comAttachment"
      />
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCom",
  props: {},
  data() {
    return {
      dialogShow: false,
      attachments: []
    };
  },
  computed: {
    fileOption() {
      return {
        tag: ["附件"],
        upload: false,
        accept: ""
      };
    }
  },
  methods: {
    handleClose() {
      this.attachments = [];
      this.dialogShow = false;
    },
    openDialog(row) {
      this.attachments = row;
      this.dialogShow = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
