<template>
  <div class="system-header">
    <div class="system-header-left">
      <!-- <img src="../../assets/logo.png" alt="" class="system-header-img"> -->
      <span class="system-header-font">{{ $t("appName") }}</span>
      <span class="system-header-position">
        |
        <span class="system-header-site">
          {{ area ? area.displayName || "成都市" : "成都市" }}
        </span>
      </span>
    </div>
    <div class="system-header-info">
      <span class="system-header-infospan">{{ nowDate }}</span>
      <span class="system-header-infospan">{{ nowTime }}</span>
      <span class="system-header-infospan">
        <x-icon :icon="weatherIcon"></x-icon>22℃
      </span>
      <x-icon icon="icon-geodp-xaioxi"></x-icon>
      <el-dropdown
        class="cancellation"
        placement="bottom"
        @command="handleUserCommand"
      >
        <span class="el-dropdown-link">
          {{ user.name || "[管理员]" }}
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personalInfo">{{
            $t("navbar.profile")
          }}</el-dropdown-item>
          <!-- <el-dropdown-item command="logout">退出</el-dropdown-item> -->
          <el-dropdown-item command="logOut">{{
            $t("navbar.logout")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- class="system-header-set" -->
    <!-- el-icon-bell# -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "XHeader",
  props: {
    userName: String
  },
  data() {
    return {
      command: "",
      nowDate: null,
      timer: null,
      nowTime: null,
      weatherIcon: "icon-geodp-qingtian"
      // userName:''
    };
  },
  computed: {
    ...mapGetters(["sidebar", "user", "area"])
  },
  methods: {
    formatDate(now) {
      if (now) {
        let data = new Date(now);
        let year = data.getFullYear();
        let month = data.getMonth() + 1;
        let date = data.getDate();
        return `${year}/${month}/${date}`;
      }
    },
    formatTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = this.checkTime(m);
      s = this.checkTime(s);
      this.nowTime = `${h}:${m}:${s}`;
    },
    checkTime(i) {
      if (i < 10) i = `0${i}`;
      return i;
    },
    handleUserCommand(cmd) {
      switch (cmd) {
        case "logOut":
          this.logOut(); //退出系统
          break;
        case "personalInfo":
          this.$router.push("personalInfo");
          break;
        default:
          break;
      }
    },
    logOut() {
      this.$store.dispatch("app/logout").then(() => {
        location.reload();
      });
    }
  },
  created() {
    this.nowDate = this.formatDate(new Date());
  },
  mounted() {
    if (this.timer) {
      return clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.formatTime();
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  beforeUpdate() {
    // console.log(1111)
  }
};
</script>
<style lang="less" scoped>
.system-header {
  padding: 10px 50px;
  padding: 0 21px 0 21px;
  height: 64px;
  line-height: 64px;
  display: flex;
  background: #063c78;
  color: #fff;
  // width: 100%;
  // height: 90px;
  // box-sizing: border-box;
  // background-color: #063c78;
  // opacity: .96;
  // color: #fff;
  // position: fixed;
  // z-index: 1002;
  // top: 0;
  // overflow: hidden;
  // padding: 0 21px;
  // box-shadow: -4px -4px 10px #ccc;
  .system-header-left {
    display: flex;
    width: 50%;
  }
  .system-header-img {
    width: 56px;
    vertical-align: middle;
  }
  .system-header-font {
    font-size: 34px;
    margin-right: 58px;
  }
  .system-header-position {
    height: 30px;
    font-size: 20px;
    padding-top: 2px;
    vertical-align: middle;
    // padding-top: 21px;
    .system-header-site {
      padding-left: 26px;
      vertical-align: middle;
    }
  }
  .system-header-info {
    width: 50%;
    font-family: monospace;
    font-size: 26px;
    // line-height: 70px;
    text-align: right;
  }
  .system-header-infospan {
    padding-right: 10px;
    line-height: 25px;
  }
  .system-header-user,
  .system-header-set {
    font-size: 16px;
    font-family: monospace;
  }
}
.icon {
  width: 25px;
  height: 25px;
  color: #fff;
  vertical-align: text-top;
}
.el-button {
  background: rgba(0, 0, 0, 0.01);
  color: #fff;
}
.cancellation {
  color: #fff;
  padding-left: 20px;
  vertical-align: bottom;
  line-height: 64px;
  font-size: 20px;
}
</style>
