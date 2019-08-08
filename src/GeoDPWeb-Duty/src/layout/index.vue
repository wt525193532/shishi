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
    },
    async init() {
      await this.$store.dispatch("common/getAllDutys");
      await this.$store.dispatch("common/getAllTeams");
      await this.$store.dispatch("common/getAllDutyOrders");
      await this.$store.dispatch("common/getCurrent");
      await this.$store.dispatch("organization/getAllByCode");
      this.$store.dispatch("dutyManage/schedueManage/canTakeOver").then(res => {
        if (res) {
          this.$confirm("是否接班?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.$store
                .dispatch("dutyManage/schedueManage/takeOver")
                // eslint-disable-next-line no-unused-vars
                .then(async res => {
                  this.$message.success("接班成功！");
                  await this.$store.dispatch("session/init");
                  this.$store.dispatch("common/getCurrent");
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消接班"
              });
            });
        }
      });
    }
  },
  created() {
    this.init();
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
      width: calc(100% - 200px);
      .content {
        padding: 0 20px;
        height: calc(100% - 50px);
        overflow: auto;
      }
    }
  }
}
</style>
