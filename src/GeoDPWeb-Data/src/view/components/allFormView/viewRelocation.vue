<template>
  <div>
    <relocation-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="view"
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
import relocationForm from "@/view/components/relocationForm";
export default {
  name: "QueryViewRelocation",
  components: { relocationForm },
  data() {
    return {
      disabled: true,
      formData: {},
      relocationData: []
    };
  },
  computed: {
    showPage() {
      return this.relocationData.length;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/relocation/getByCode", this.$route.query.code)
      .then(data => {
        this.relocationData = data;
        this.formData = data[0];
      });
  },
  methods: {
    view() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less"></style>
