<template>
  <basicinfo-form :isFromQuery="true" />
</template>

<script>
import basicinfoForm from "./default";

export default {
  name: "QueryViewBasicInfo",
  components: { basicinfoForm }
};
</script>
