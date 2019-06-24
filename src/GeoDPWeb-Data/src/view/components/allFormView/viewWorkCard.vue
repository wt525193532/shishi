<template>
  <div>
    <work-card-form
      :disabled="disabled"
      :formData="formData"
      :btnExcuteFunc="view"
      v-if="showPage"
    ></work-card-form>

    <img
      v-else
      src="@/assets/images/noData.img.jpg"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import workCardForm from "@/view/components/workCardForm";
export default {
  name: "QueryViewWorkCard",
  data() {
    return {
      disabled: true,
      formData: {},
      workCardData: []
    };
  },
  computed: {
    showPage() {
      return this.workCardData.length;
    }
  },

  mounted() {
    this.$store
      .dispatch("querypage/workCard/getByCode", this.$route.query.code)
      .then(data => {
        this.workCardData = data;
        this.formData = data[0];
      });
  },
  methods: {
    view() {
      this.$router.go(-1);
    }
  },
  components: { workCardForm }
};
</script>

<style lang="less"></style>
