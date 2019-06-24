<template>
  <div>
    <!-- 链接 -->
    <el-menu-item v-if="showAsLink(item)" :index="item.url">
      <menu-item :icon="item.icon" :title="item.displayName" />
    </el-menu-item>
    <!-- 子菜单 -->
    <el-submenu
      v-else-if="item.isEnabled && item.isVisible"
      ref="submenu"
      :index="item.url"
      :show-timeout="1500"
    >
      <!-- 子菜单标题 -->
      <template slot="title">
        <menu-item :icon="item.icon" :title="item.displayName" />
      </template>

      <!-- 子菜单的下一级菜单 -->
      <template v-for="child in item.items">
        <sidebar-item
          v-if="
            child.isEnabled &&
              child.isVisible &&
              child.items &&
              child.items.length > 0
          "
          :is-nest="true"
          :item="child"
          :key="child.url"
          :base-path="child.url"
          class="nest"
        />
        <!-- 子菜单项 -->
        <el-menu-item
          v-else-if="child.isEnabled && child.isVisible"
          :index="child.url"
          :key="child.name"
        >
          <menu-item :icon="child.icon" :title="child.displayName" />
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import MenuItem from "./MenuItem";

export default {
  name: "SidebarItem",
  components: { MenuItem },
  props: {
    // menu object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  computed: {},
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
    showAsLink(item) {
      let s =
        item.isEnabled &&
        item.isVisible &&
        ((item.items && item.items.length == 0) || !item.items);
      return s;
    }
  }
};
</script>
