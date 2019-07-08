<template>
  <div class="system-page">
    <!-- <div class="system-updwon">
      <x-header
        :userName="userName"
        :handleUserCommand="handleUserCommand"
      ></x-header>
    </div>-->
    <div class="system-body" v-loading="loading">
      <div class="system-body-height" v-if="!loading">
        <div
          class="system-body-box system-border"
          v-for="(item, index) in systemData"
          :key="index"
          @click="enterApp(item.url)"
        >
          <div>
            <div class="system-body-svg">
              <x-icon :icon="item.icon"></x-icon>
            </div>
            <div class="system-body-box-title">{{ item.displayName }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="system-footer">
      <div class="footer-top">
        <span class="footer-bottom">
          {{
            "成都市地质环境监测站 版权所有 Copyright 2018-2020 All Rights Reserved"
          }}
        </span>
        <!-- <span icon="el-icon-info"></span> -->
        <el-tooltip placement="top" effect="light">
          <div slot="content">
            <p>{{ "API_v" + application.version }}</p>
            <p>{{ "UI_v" + uiVersion }}</p>
            <p>{{ "DATE_" + application.releaseDate }}</p>
          </div>
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/lib/util";
// import { debug } from "util";
export default {
  data() {
    return {
      token: null,
      systemData: [],
      loading: true
    };
  },
  methods: {
    loginNew() {
      let token = util._getLocalStorage("token");
      if (token) {
        // this.$store.dispatch("session/init");
        this.systemData = this.userConfig.nav.menus.MainMenu.items;
        this.loading = false;

        // this.loading = false;
        // this.$store.dispatch("app/getUserConfig").then(res => {
        //   let data = res.data;
        //   if (data.success) {
        //     let auth = data.result.auth.grantedPermissions;
        //     let permissions = Object.keys(auth);
        //     if (permissions.length > 0) {
        //       let appList = data.result.nav.menus.MainMenu.items;
        //       this.systemData = appList;
        //       this.loading = false;
        //     } else {
        //       util._clearStorage();
        //       this.$message({
        //         message: "token失效请重新登录",
        //         type: "warning"
        //       });
        //       this.$router.push({ path: "/" });
        //     }
        //   }
        // });
      } else {
        this.$router.push({ path: "/" });
      }
    },
    enterApp(url) {
      window.open(url);
    },
    handleUserCommand(command) {
      if (command === "cancel") {
        util._clearStorage();
        this.$router.push({ path: "/" });
      }
    }
  },
  computed: {
    userConfig() {
      return this.$store.state.session;
    },
    userName() {
      return this.$store.state.session.user.userName;
    },
    application() {
      let date = new Date(this.$store.state.session.application.releaseDate);
      let dateStr = date.toLocaleDateString();
      return {
        releaseDate: dateStr,
        version: this.$store.state.session.application.version
      };
    },
    uiVersion() {
      return util.appconst.version;
    }
  },
  created() {
    this.token = util._getLocalStorage("token");
    this.loginNew();
  }
};
</script>
<style lang="less" scoped>
.system-page {
  min-width: 1280px;
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -webkit-flex-direction: column;
  background: url("../../assets/images/bg.png") no-repeat center;
  .system-body-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: Center;
  }
  .system-body-box:hover {
    color: #063c78;
    font-weight: 600;
  }
  .system-body {
    width: 80%;
    font-size: 24px;
    font-family: monospace;
    color: #ffffff;
    margin: auto;
    .system-body-height {
      width: 100%;
      background: rgba(0, 84, 174, 0.6);
      display: flex;
      justify-content: center;
      padding: 25px 0;
    }
    .system-body-box {
      box-sizing: border-box;
      padding: 10px 10px;
      margin-bottom: 5px;
      text-align: center;
      transition: border 1s;
      cursor: pointer;
      .system-body-svg {
        width: 100%;
        height: 80px;
        padding-bottom: 5px;
        margin: 0 auto;
      }
      .icon {
        width: 65px;
        height: 65px;
      }
    }
    .system-border {
      border-width: 0 1.5px 0 0;
      border-color: #fff;
      border-style: solid;
    }
    .system-border:last-child {
      border: none;
    }
    .system-body-icon {
      padding-bottom: 10px;
    }
    .system-body-span {
      padding-bottom: 5px;
    }
  }
  .system-footer {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: #063c78;
    text-align: center;
    font-size: 14px;
    .footer-top {
      height: 100%;
    }
  }
}

.picture {
  width: 20px;
  height: 30px;
  background: red;
  display: inline-block;
}
</style>
