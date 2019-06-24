<template>
  <div class="gl-full-height app-wrapper">
    <header class="header-content">
      <yj-header :sidebarMenus="sidebarMenus"></yj-header>
    </header>
    <div class="main-content">
      <aside class="main-content-left">
        <yj-sidebar :sidebarMenus="sidebarMenus"></yj-sidebar>
      </aside>
      <div class="main-content-right">
        <SubHeader />
        <main class="content">
          <transition name="fade-transverse">
            <router-view></router-view>
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import SubHeader from "@/components/subHeader";
import Sidebar from "./components/Sidebar";

export default {
  name: "Layout",
  components: {
    "yj-header": Header,
    "yj-sidebar": Sidebar,
    SubHeader
  },
  computed: {
    // bodyLoading() {
    //   return this.$store.state.app.loading;
    // },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    sidebarMenus() {
      return this.$store.getters["app/sidebarMenus"];
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
    }
  },
  created() {
    console.log(this.sidebarMenus);
  }
};
</script>
<style lang="less">
.app-wrapper {
  .header-content {
    background: #001529;
    height: 60px;
  }
  .main-content {
    display: flex;
    height: calc(100% - 60px);
    &-left {
      background: #fff;
      width: 200px;
      flex-shrink: 0;
    }
    &-right {
      height: 100%;
      width: 100%;
      .content {
        padding: 0 20px;
        height: calc(100% - 50px);
        overflow: auto;
      }
    }
  }
}
</style>
