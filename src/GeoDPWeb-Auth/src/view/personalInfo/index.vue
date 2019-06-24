<template>
  <div class="personalInfo-page">
    <el-row style="margin-top: 20px;">
      <el-col class="personalInfo" :span="12" :offset="6">
        <h2 class="header">个人资料</h2>
        <el-form
          :model="personalInfo"
          :rules="rules"
          ref="personalInfo"
          label-width="110px"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="personalInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="personalInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="工作部门" prop="departmentName">
            <el-input v-model="personalInfo.departmentName" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="emailAddress">
            <el-input v-model="personalInfo.emailAddress"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input v-model="personalInfo.phoneNumber"></el-input>
          </el-form-item>
          <el-row v-if="showAddCategory">
            <div class="add_category">
              <el-form-item label="当前密码" prop="currentPassword">
                <el-input v-model="personalInfo.currentPassword"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="newPassword">
                <el-input v-model="personalInfo.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="personalInfo.checkPass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePass"
                  >确认修改密码</el-button
                >
              </el-form-item>
            </div>
          </el-row>
          <div class="add_category_button" @click="addCategoryFun">
            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
            <span>修改密码</span>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('personalInfo')"
              >提交</el-button
            >
            <el-button @click="resetForm('personalInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import util from "@/lib/util";

export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.personalInfo.checkPass !== "") {
    //       this.$refs.personalInfo.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.personalInfo.newPassword) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      showAddCategory: false,
      personalInfo: {
        userName: "",
        name: "",
        departmentName: "",
        emailAddress: "",
        phoneNumber: "",
        currentPassword: "",
        newPassword: "",
        checkPass: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        emailAddress: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        phoneNumber: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            pattern: /((^0\d{2}-\d{8})|(^1[34578]\d{9}))$/,
            message:
              "请输入有效的电话号码，如：13996633888 或者 027-87588000！",
            trigger: "blur"
          }
        ]
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("app/UpdateProfile", {
              name: this.personalInfo.name,
              emailAddress: this.personalInfo.emailAddress,
              phoneNumber: this.personalInfo.phoneNumber
            })
            .then(res => {
              if (res) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                this.$message.error("保存失败");
              }
            });
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory;
    },
    changePass() {
      if (
        this.personalInfo.newPassword === this.personalInfo.checkPass &&
        this.personalInfo.newPassword !== "" &&
        this.personalInfo.checkPass !== ""
      ) {
        this.$store
          .dispatch("app/ChangePassword", {
            currentPassword: this.personalInfo.currentPassword,
            newPassword: this.personalInfo.newPassword
          })
          .then(res => {
            if (res) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
            } else {
              this.$message.error("保存失败");
            }
          });
      }
      if (this.personalInfo.newPassword !== this.personalInfo.checkPass) {
        this.$message.error("请确认输入密码是否一致");
      }
    }
  },
  computed: {},
  created() {
    this.token = util._getLocalStorage("token");
    this.$store.dispatch("app/getUserConfig").then(res => {
      let user = res.data.result.user;
      this.personalInfo = { ...user };
    });
  }
};
</script>
<style lang="less">
.personalInfo {
  background-color: #f7f7f7;
  padding-right: 20px;
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;

  padding-bottom: 50px;
  h2 {
    padding: 20px;
    width: 100%;
    text-align: center;
  }
  .showEdit {
    height: 185px;
  }
  .add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    transition: all 400ms;
    &:hover {
      // background: #f9fafc;
      span,
      .edit_icon {
        color: #20a0ff;
      }
    }
    span {
      font-size: 14px;
      color: #999;
      transition: all 400ms;
    }
    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }
  }
}
</style>
