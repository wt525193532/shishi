<template>
  <section class="pageview">
    <transition name="fade-transverse">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "PageView",
  computed: {
    cachedViews() {
      return [];
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>
