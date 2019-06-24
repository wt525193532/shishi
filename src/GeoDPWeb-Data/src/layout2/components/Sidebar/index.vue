<template>
  <div class="sidebar">
    <div class="item-wrap top">
      <el-scrollbar
        class="item sidebar-menu-wrap"
        wrap-class="scroll-wrap"
        :native="true"
        :noresize="false"
      >
        <el-menu
          :default-active="defaultActive"
          :router="true"
          :collapse="collapse"
          @select="selected"
        >
          <sidebar-item
            v-for="menu in sidebarMenus"
            :key="menu.name"
            :item="menu"
            :base-path="menu.url"
          />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="item-wrap bottom">
      <!-- <el-tooltip :content="$t('navbar.message')" effect="dark" placement="right">
        <div class="item btn-exit">
          <svg-icon name="link"/>
        </div>
      </el-tooltip>-->
    </div>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {},
  computed: {
    sidebar() {
      return !this.$store.state.app.sidebar;
    },
    sidebarMenus() {
      return this.$store.getters["app/sidebarMenus"];
    },
    collapse() {
      return !this.$store.state.app.sidebar.opened;
    },
    defaultActive() {
      let nowRoter = { ...this.$route }.matched[0].path;
      let activeItem = this.sidebarMenus.find(item =>
        item.url.includes(nowRoter)
      );
      return activeItem.url;
    }
  },
  methods: {
    findNowPath(arr, newArr) {
      arr.forEach(el => {
        if (window.abp.utils._isArray(el.items)) {
          this.findNowPath(el.items, newArr);
        } else {
          newArr.push(el.url);
        }
      });
    },
    selected(index) {
      if (this.$route.path !== index) {
        this.$router.push(index);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/theme/index.less";

.sidebar {
  .sidebar-menu-wrap {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .scroll-wrap {
      overflow-x: hidden;
    }
  }
}
</style>
