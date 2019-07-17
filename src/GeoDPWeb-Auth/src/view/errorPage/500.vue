<template>
  <h1 class="prompt_text">
    加载失败，
    <span id="num">{{ count }}</span
    >秒后重试
  </h1>
</template>
<script>
export default {
  data() {
    return {
      count: ""
    };
  },
  created() {
    this.goGrdoupRecor();
  },
  methods: {
    //  3秒后进入首页
    goGrdoupRecor() {
      const TIME_COUNT = 3;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
            this.$router.push("/");
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="less" scoped>
h1 {
  margin-top: 200px;
  text-align: center;
}
</style>
