<template>
  <allFormView :activeName="activeName" />
</template>
<script>
import allFormView from "@/view/components/allFormView";
export default {
  name: "ApprovalView",
  components: {
    allFormView
  },
  computed: {
    activeName() {
      return this.$route.query.dataType;
    }
  }
};
</script>
