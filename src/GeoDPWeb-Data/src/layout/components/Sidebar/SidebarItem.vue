<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in sidebarList">
      <el-tooltip
        class="item"
        :key="index"
        effect="dark"
        :content="item.displayName"
        placement="right"
      >
        <div
          :class="[
            { 'menu-item-active': munuActive === item.displayName },
            'menu-item'
          ]"
          @click="$router.push(item.url)"
          :key="index"
        >
          <svg-icon name="xiaoxi" />
          <!-- <span style="font-size: 12px;">{{item.title}}</span> -->
        </div>
      </el-tooltip>
      <!-- <p class="sidebarItem-groupTitle"
         v-if="item.hasOwnProperty('groupTitle')"
         :key="item.groupTitle">{{item.groupTitle}}</p>
      <yj-submenu :popper-append-to-body="false"
                  v-else-if="item.hasOwnProperty('group') && item.children.length"
                  :index="item.group"
                  :key="item.group">
        <template slot="title">
          <yj-icon v-if="item.icon"
                   :icon="item.icon" />
          <span v-if="item.title"
                slot="title">{{item.title}}</span>
        </template>
        <template v-for="child in item.children">
          <yj-menu-item :index="child.path"
                        :key="child.path">
            <yj-icon v-if="child.icon"
                     :icon="child.icon" />
            <span v-if="child.title"
                  slot="title">{{child.title}}</span>
          </yj-menu-item>
        </template>
      </yj-submenu>
      <yj-menu-item v-else
                    :index="item.path"
                    :class="{'submenu-title-noDropdown':!isNest}"
                    :key="item.path">
        <yj-icon v-if="item.icon"
                 :icon="item.icon" />
        <span v-if="item.title"
              slot="title">{{item.title}}</span>
      </yj-menu-item> -->
    </template>
  </div>
</template>

<script>
// import { MenuItem, Submenu } from "element-ui";
// import Icon from "@/components/Icon";

export default {
  name: "SidebarItem",
  components: {
    // "yj-menu-item": MenuItem,
    // "yj-submenu": Submenu,
    // "yj-icon": Icon
  },
  props: {
    sidebarList: Array,
    munuActive: String,
    isNest: {
      type: Boolean,
      default: false
    }
  },

  computed: {}
};
</script>
