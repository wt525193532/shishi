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
          :default-active="$route.path"
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
    }
  },
  methods: {
    selected(index) {
      if (this.$route.path !== index) {
        this.$router.push(index);
      }
    }
  }
};
</script>
<style lang="less">
@import "~@/theme/index.less";

.sidebar {
  .sidebar-menu-wrap {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .scroll-wrap {
      overflow-x: hidden;
    }

    .el-menu-item {
      .el-tooltip {
        outline: 0;
      }
    }
    .el-menu,
    .el-submenu {
      background-color: @menu-bg !important;
      border: 0;
    }

    .el-submenu .el-submenu__icon-arrow {
      color: inherit;
      right: 10px;
      transition: 0.3s opacity;
    }

    .el-menu-item,
    .el-submenu__title {
      height: @sidebar-collapsed-width;
      line-height: @sidebar-collapsed-width;
      transition: all 0.3s;
      color: @menu-title;
      &:before {
        content: "";
        position: absolute;
        left: @sidebar-width - 3px;
        top: 0;
        bottom: 0;
        border-right: 3px solid darken(@menu-active-bg, 30%);
        transform: scaleY(0.0001);
        transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
          opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
      &:hover {
        color: @link-color-hover;
        background-color: @menu-hover-bg !important;
      }
      &.is-active {
        color: @link-color-active;
        background-color: @menu-active-bg !important;
        &:before {
          transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
            opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform: scaleY(1);
        }
      }
    }
    .el-submenu.is-active {
      .el-submenu__title {
        color: @link-color-active;
        background-color: @menu-active-bg !important;
      }
    }

    .menu-item-title {
      font-size: 16px;
      .svg-icon {
        margin-right: 1em;
      }
    }
  }
}
</style>
