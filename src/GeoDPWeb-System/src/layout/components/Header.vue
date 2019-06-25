<template>
  <div class="header">
    <div class="item-wrap left">
      <div class="sysname">
        {{ $t("appName") }}
        <div class="location">{{ area.displayName || "[成都市]" }}</div>
      </div>
      <el-menu
        background-color="#063c78"
        :router="true"
        :default-active="activeIndex"
        text-color="#fff"
        active-text-color="#1682e6"
        mode="horizontal"
      >
        <el-menu-item
          v-for="(item, index) in sidebarMenus"
          :index="item.url"
          :key="index"
          >{{ item.displayName }}</el-menu-item
        >
      </el-menu>
      <!-- <div class="item location">{{ area.displayName || "[成都市]" }}</div> -->
    </div>
    <div class="item-wrap middle">
      <div class="item"></div>
    </div>
    <div class="item-wrap right">
      <div class="item" style="width: 50px;"></div>
      <el-tooltip
        :content="$t('navbar.message')"
        effect="dark"
        placement="bottom"
      >
        <div class="item btn-message">
          <svg-icon name="xiaoxi" />
        </div>
      </el-tooltip>
      <div class="item user-avatar">
        <svg-icon name="yonghu" />
      </div>
      <div class="item menu-account">
        <el-dropdown trigger="click" @command="clickMenuItem">
          <span class="el-dropdown-link">
            {{ user.name || "[管理员]" }}
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">{{
              $t("navbar.profile")
            }}</el-dropdown-item>
            <el-dropdown-item command="switch" divided>{{
              $t("navbar.switch")
            }}</el-dropdown-item>
            <el-dropdown-item command="logout">{{
              $t("navbar.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  props: {
    sidebarMenus: Array
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar", "user", "area"]),
    activeIndex() {
      let nowRoter =
        { ...this.$route }.matched[0].path ||
        { ...this.$route }.matched[1].path;
      let activeItem = this.sidebarMenus.find(item =>
        item.url.includes(nowRoter)
      );
      return activeItem.url;
    }
  },
  methods: {
    clickMenuItem(cmd) {
      switch (cmd) {
        case "profile":
          this.userInfo(); //进入个人资料
          break;
        case "switch":
          this.switchSystem(); //切换系统
          break;
        case "logout":
          this.logout(); //退出系统
          break;
        default:
          break;
      }
    },
    userInfo() {
      //TODO...
    },
    switchSystem() {
      window.location.href = process.env.VUE_APP_AUTH_URL;
    },
    logout() {
      this.$store.dispatch("app/logout").then(() => {
        location.reload();
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.header {
  .btn-collapse,
  .btn-screenfull,
  .btn-message,
  .user-avatar {
    font-size: 0.75em; //24px
  }
  .el-menu-item.is-active {
    background-color: #cee4fc !important;
  }
  .sysname {
    //font-family: Kaiti, serif;
    font-size: 18px;
    font-weight: 500;
    width: 183px;
    text-align: center;
    // background: #cee4fc;
    .location {
      font-size: 14px;
      text-align: center;
    }
  }

  .location {
    font-size: 0.625em; //20px
    //padding-top: 0.6em;
    margin-top: 0.6em; //12px
    // padding-left: 1em;
    // border-left: #fff 2px solid;
  }
  .user-avatar {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-right: 0.25em !important;
  }

  .menu-account {
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
    .el-dropdown {
      display: block;
    }
  }
}
</style>
