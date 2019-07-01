<template>
  <el-menu
    class="gl-margin-top-15 sidebar"
    :default-active="defaultActive"
    :router="true"
    :unique-opened="true"
  >
    <div v-for="item in subMenuList" :key="item.url">
      <el-submenu
        :index="item.url"
        v-if="item.items && item.items.length > 0"
        :title="item.displayName"
      >
        <template slot="title">
          <svg-icon :name="item.icon" />
          <span>{{ item.displayName }}</span>
        </template>
        <el-menu-item
          :title="ele.displayName"
          v-for="ele in item.items"
          :key="ele.url"
          :index="ele.url"
        >
          <template slot="title">
            <svg-icon :name="item.icon" />
            <span>{{ ele.displayName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.url" :title="item.displayName">
        <template slot="title">
          <svg-icon :name="item.icon" />
          <span>{{ item.displayName }}</span>
        </template>
      </el-menu-item>
    </div>
  </el-menu>
</template>
<script>
export default {
  name: "YjNavbar",
  props: {
    sidebarMenus: Array
    // backgroundColor: String,
    // textColor: String,
    // activeTextColor: String,
    // theme: String
  },

  data() {
    return {
      activeItem: null
      //   subMenuList: []
    };
  },
  computed: {
    // 子菜单项
    subMenuList() {
      let munuActive = this.$route.matched[1].meta.displayName;
      let activeItem = this.sidebarMenus.find(item => {
        return item.displayName === munuActive;
      });
      return activeItem.items;
    },
    // 子菜单激活项
    defaultActive() {
      let nowRoter = { ...this.$route };
      let lastePath = nowRoter.matched[nowRoter.matched.length - 1].path;
      this.getLastRoute(this.subMenuList, lastePath);
      // this.subMenuList.forEach(item => {
      //   if (!item.items) {
      //     if (item.url.includes(lastePath)) {
      //       activeItem = item;
      //     }
      //   } else {
      //     return item.url.includes(lastePath);
      //   }
      // });
      return this.activeItem.url;
    }
  },
  methods: {
    // 递归寻找最后一级子菜单
    getLastRoute(routes, pathName) {
      this.activeItem = null;
      for (let i = 0; i < routes.length; i++) {
        if (this.activeItem) return;
        if (!routes[i].items.length && routes[i].url == pathName) {
          this.activeItem = routes[i];
          break;
          // return routes[i];
        }
        if (routes[i].items) {
          this.getLastRoute(routes[i].items, pathName);
        }
      }
      // return this.activeItem;
    },
    spreadChange(item, index) {
      let isEnabled = !item.isEnabled;
      this.subMenuList[index].isEnabled = isEnabled;
      if (!item.hasOwnProperty("items")) {
        this.$router.push(item.url);
      }
    },
    handleMenuSelect(route) {
      if (route.indexOf("http://") > -1 || route.indexOf("https://") > -1) {
        window.open(route);
      } else {
        this.$router.push(route);
      }
    }
  }
};
</script>
<style lang="less">
.el-menu {
  border-right: none !important;
}
.sidebar {
  .el-menu-item,
  .el-submenu__title {
    span {
      margin-left: 10px;
    }
  }
  .el-menu-item.is-active {
    border-right: 3px solid #1582e6;
    background-color: #cee4fc !important;
  }
}
</style>
