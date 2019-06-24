<template>
  <div>
    <heritageProtectionForm
      :formData="formData"
      :disabled="disabled"
      :btnExcuteFunc="edit"
      :canEdit="true"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import heritageProtectionForm from "@/view/components/heritageProtectionForm";

export default {
  name: "EditHeritageProtection",
  components: { heritageProtectionForm },
  data() {
    return {
      disabled: false,
      formData: {}
    };
  },
  mounted() {
    this.$store
      .dispatch("report/heritageProtection/edit", this.$route.query.id)
      .then(res => {
        if (res.data.success) {
          this.formData = res.data.result;
        }
      });
  },
  methods: {
    edit() {
      this.$store
        .dispatch("report/heritageProtection/update", this.formData)
        .then(res => {
          this.$util.editSaveMessage(res.data.success);
        });
    }
  }
};
</script>

<style lang="less"></style>
