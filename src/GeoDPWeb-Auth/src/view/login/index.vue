<template>
  <div class="login-box">
    <!-- <div class="login-box1"> -->
    <div class="logo-head">
      <!-- <img src="../assets/logo.png" alt="" class="logo-img"> -->
      <span class="logo-title">成都市地质环境信息系统</span>
    </div>
    <div class="login-ct-box">
      <div class="login-content">
        <p class="login-content-title">系统登录</p>
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="user"
          class="demo-ruleForm login-from"
        >
          <el-form-item prop="admin">
            <!-- <x-icon icon="icon-geodp-yonghuming"></x-icon> -->
            <el-input
              class="full-width"
              v-model.number="user.admin"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passWrod">
            <!-- <x-icon icon="icon-geodp-mima"></x-icon> -->
            <el-input
              class="full-width"
              type="password"
              prefix-icon="el-icon-lock"
              ref="pass"
              v-model="user.passWrod"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-row>
              <el-col :span="12">
                <!-- <x-icon icon="icon-geodp-yanzhengma"></x-icon> -->
                <el-input
                  type="text"
                  class="full-width"
                  v-model="user.verificationCode"
                  placeholder="请输入验证码"
                ></el-input>
              </el-col>
              <el-col :span="7">
                <div class="verification-code">{{ checkCode }}</div>
              </el-col>
              <el-col :span="5">
                <el-button type="text" size="small" @click="changeCode"
                  >换一张</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="load.tag"
              @click="login('user')"
              >{{ load.name }}</el-button
            >
          </el-form-item>
        </el-form>
        <!-- <div  class="login-content-footer" @click="registered">	<b>&#187</b>用户注册</div> -->
        <!-- <img src="../assets/bottom.png" alt="" class="login-img-bottom"> -->
      </div>
    </div>

    <div class="login-footer">
      <span>
        {{
          "成都市地质环境监测站 版权所有 Copyright 2018-2020 All Rights Reserved"
        }}
      </span>
      <el-tooltip placement="top" effect="light">
        <div slot="content">
          <p>{{ "API_v" + application.version }}</p>
          <p>{{ "UI_v" + uiVersion }}</p>
          <p>{{ "DATE_" + application.releaseDate }}</p>
        </div>
        <i class="el-icon-info"></i>
      </el-tooltip>
    </div>
    <!-- </div> -->
    <!-- <div class="login-box2">
      <img src="../assets/login-bottom.png" alt="" class="login-img-bottom">
    </div>-->
  </div>
</template>
<script>
import util from "@/lib/util";
var code;
export default {
  name: "XdLogin",
  data() {
    let validateCode = (rule, value, callback) => {
      let newCode = this.checkCode;

      if (value.toUpperCase() !== newCode) {
        // if (newCode.toLocaleLowerCase() == value) {
        //   callback(new Error("请区分大小写"));
        // }
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      user: {
        admin: "",
        passWrod: "",
        checkPass: "",
        verificationCode: ""
      },
      rules: {
        passWrod: [{ required: true, message: "请输入密码", trigger: "blur" }],
        admin: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateCode, trigger: "blur" }
        ]
      },
      load: {
        tag: false,
        name: "登 录"
      },
      checkCode: "1234"
    };
  },
  methods: {
    /* 如果有登录权限 并且记住密码 可以直接跳到首页*/
    loginUser() {
      let token = util._getLocalStorage("token");
      if (token) {
        this.$router.push({ name: "home" });
      }
    },
    /* 登录功能 */
    login(ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.load.tag = true;
          this.load.name = "正在登录...";
          let checkPassCode = this.user.verificationCode;
          if (this.checkCode === checkPassCode.toUpperCase()) {
            let parmas = {
              userNameOrEmailAddress: this.user.admin,
              password: this.user.passWrod,
              rememberClient: false
            };
            console.log(parmas);

            this.$store
              .dispatch("app/login", parmas)
              .then(res => {
                this.load.tag = false;
                let data = res.data;
                if (data.success) {
                  this.load.name = "登 录";
                  let token = data.result.accessToken;
                  util._saveLocalStorage("token", token);
                  location.reload();
                }
              })
              .catch(() => {
                this.load.tag = false;
                // this.$message.error(err);
                this.load.name = "登 录";
                this.load.tag = false;
                // this.$refs[ref].resetFields();
                this.createCode();
                this.$refs.pass.focus();
              });
          }
          // this.createCode();
        } else {
          this.load.name = "登 录";
          return false;
        }
      });
    },
    /* 生产验证码 */
    createCode() {
      code = "";
      let codeLength = 4; //验证码的长度
      let random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ); //随机数
      for (var i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * random.length); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.checkCode = code; //把code值赋给验证码
    },
    /* 换一张 */
    changeCode() {
      this.createCode();
    }
    /* 注册功能 */
    // registered () {
    //   this.$router.push({name: 'registeredPage'})
    // }
  },
  computed: {
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
    // this.loginUser()
    this.createCode();
  }
};
</script>
<style lang="less" scoped>
.login-box {
  min-width: 1280px;
  background-color: #f0f0f0;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -webkit-flex-direction: column;

  .login-ct-box {
    height: 100%;
    width: 100%;
    background: url("../../assets/images/login-top.png") no-repeat center center;
    // background-size: 100% 100%;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: Center;
  }
  .logo-head {
    padding: 0 21px 0 21px;
    height: 64px;
    line-height: 64px;
    background: #063c78;
    color: #fff;
    text-align: center;
  }
  // .logo-img {
  //   position: absolute;
  //   height: 50px;
  //   width: 50px;
  //   top: 29px;
  //   left: 45px;
  // }
  .logo-title {
    font-size: 34px;
    letter-spacing: 2px;
    font-weight: 400;
    // display: inline-block;
    // margin-left: 100px;
    // height: 50px;
    // color: azure;
  }

  margin: auto;
  .login-title {
    color: #276ca3;
  }
  .login-content-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: Center;
  }
  .login-content {
    // position: absolute;
    // right: 15%;
    // bottom: 30%;
    width: 450px;
    padding: 20px 10px;
    // margin: 30px auto;
    margin: auto 0px auto 45%;
    background: rgb(255, 255, 255);
    box-shadow: 1px 2px 6px rgba(95, 125, 139, 0.5);
    .verification-code {
      margin: 0px 5px;
      color: #003789;
      background: #f1fafd;
      text-align: center;
      font-size: 16px;
      letter-spacing: 5px;
    }
    .login-content-footer {
      text-align: right;
      margin-right: 80px;
      font-size: 14px;
      &:hover {
        color: #409eff;
      }
      b {
        font-size: 20px;
      }
    }
    .login-content-title {
      font-size: 20px;
      height: 50px;
      line-height: 50px;
      color: #113c9c;
      font-weight: 400;
      /*font-family: "SimHei";*/
      text-align: center;
      margin: 0 30px;
      border-bottom: 1px solid #ccc;
    }
    .icon {
      width: 25px;
      height: 25px;
      margin-left: 15px;
      vertical-align: middle;
      fill: currentColor;
      overflow: hidden;
      color: #707070;
    }
    .login-from {
      width: 300px !important;
      margin: 20px auto 0px auto;
      max-width: 100%;
      .el-form-item {
        margin: 10px 10px;
        padding-bottom: 12px;
        &:last-child {
          text-align: center;
          .el-button {
            width: 100%;
          }
        }
        .el-form-item__content {
          margin: 5px 0;
          height: 40px;
          // text-align: center;
          /*line-height: 55px;*/
          padding: 5px 0 0 20px;
          .el-input {
            width: 70%;
            /*border-bottom: 1px solid #66b1ff;*/
            .el-input__inner {
              border: 1px solid rgba(255, 255, 255, 0);
              background-color: rgba(255, 255, 255, 0);
            }
          }
        }
      }
    }
  }
  .login-footer {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: #063c78;
    // position: absolute;
    color: #fff;
    bottom: 0;
    font-size: 14px;
    text-align: center;
  }
  // .login-box2 {
  //   height: 40%;
  //   width: 100%;
  //   position: relative;
  //   .login-img-bottom {
  //     height: 400px;
  //     width: 600px;
  //     position: absolute;
  //     top: -150px;
  //     left: 100px;
  //   }
  // }
}
</style>
