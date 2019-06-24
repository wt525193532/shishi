<template>
  <div class="header">
    <div class="item-wrap left">
      <div class="item sysname">{{ $t("appName") }}</div>
      <div class="item location">{{ area.displayName || "[成都市]" }}</div>
    </div>
    <div class="item-wrap middle">
      <div class="item"></div>
    </div>
    <div class="item-wrap right">
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
            <el-dropdown-item command="profile">
              {{ $t("navbar.profile") }}</el-dropdown-item
            >
            <el-dropdown-item command="switch" divided>
              {{ $t("navbar.switch") }}</el-dropdown-item
            >
            <el-dropdown-item command="logout">
              {{ $t("navbar.logout") }}
            </el-dropdown-item>
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar", "user", "area"])
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
      //TODO...
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

  .sysname {
    //font-family: Kaiti, serif;
    font-weight: 200;
  }

  .location {
    font-size: 0.625em; //20px
    //padding-top: 0.6em;
    margin-top: 0.6em; //12px
    padding-left: 1em;
    border-left: #fff 2px solid;
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
