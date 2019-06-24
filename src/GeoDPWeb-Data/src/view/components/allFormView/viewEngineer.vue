<template>
  <div>
    <engineer-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="view"
      v-if="showPage"
    />
    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import engineerForm from "@/view/components/engineerForm";

export default {
  name: "QueryViewEngineer",
  data() {
    return {
      disabled: true,
      formData: {},
      engineerData: []
    };
  },
  components: { engineerForm },
  computed: {
    showPage() {
      return this.engineerData.length;
    }
  },
  mounted() {
    this.$store
      .dispatch("querypage/engineer/getByCode", this.$route.query.code)
      .then(data => {
        this.engineerData = data;
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
