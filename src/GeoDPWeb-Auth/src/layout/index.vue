<template>
  <div :class="classObj" class="app-wrapper">
    <div class="head-container">
      <navbar />
    </div>
    <!-- <div class="sidebar-container">
      <sidebar />
    </div> -->
    <div class="main-container">
      <page-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Header";
// import Sidebar from "./components/Sidebar";
import PageView from "./components/PageView";

export default {
  name: "Layout",
  components: {
    Navbar,
    // Sidebar,
    PageView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        "hide-sidebar": !this.sidebar.opened,
        "open-sidebar": this.sidebar.opened,
        "without-animation": this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    },
    async init() {}
  },
  mounted() {
    this.init();
  }
};
</script>
