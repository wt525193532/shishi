<template>
  <div>
    <relocation-form
      :isFromQuery="true"
      :codeData="codeData"
      v-if="showPage"
    ></relocation-form>
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import relocationForm from "./default";
export default {
  name: "QueryViewRelocation",
  components: { relocationForm },
  data() {
    return {
      codeData: {},
      relocationData: []
    };
  },
  computed: {
    showPage() {
      return this.relocationData.length > 0;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/relocation/getByCode", this.$route.query.code)
      .then(data => {
        this.relocationData = data;
        this.codeData = data[0];
      });
  }
};
</script>

<style lang="less"></style>
