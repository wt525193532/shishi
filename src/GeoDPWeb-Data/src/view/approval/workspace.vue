<template>
  <div class="workspace page-container">
    <div class="page-title">数据审核工作台</div>
    <el-collapse v-model="activeItems">
      <el-collapse-item
        v-for="item in approvals"
        :key="item.name"
        class="approval-title"
        :title="`${item.title}(${item.items.length})`"
        :name="item.name"
      >
        <el-row :gutter="48">
          <el-col
            v-for="child in item.items"
            :key="child.name"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="5"
          >
            <el-card shadow="always" class="approval-card">
              <router-link
                :to="{ name: child.to || `approval.${child.name}`, params: {} }"
                class="approval-item"
              >
                <svg-icon :name="child.icon" class="item-icon"></svg-icon>
                <span class="item-title">{{ child.title }}</span>
              </router-link>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "Workspace",
  data() {
    return {
      activeItems: [],
      approvals: [
        {
          name: "basic",
          icon: "",
          title: "基本信息",
          items: [
            {
              name: "basicInfo",
              icon: "hiddenTrouble",
              title: "隐患点基本信息"
            }
          ]
        }
        // {
        //   name: "groupSurveyDefense",
        //   icon: "",
        //   title: "群测群防",
        //   items: [
        //     {
        //       name: "preventPlan",
        //       icon: "geodisasterPrevention",
        //       title: "防灾预案表"
        //     },
        //     {
        //       name: "workCard",
        //       icon: "fangzaika",
        //       title: "防灾工作明白卡"
        //     },
        //     {
        //       name: "riskCard",
        //       icon: "theSafetyCard",
        //       title: "避险明白卡"
        //     }
        //   ]
        // },
        // {
        //   name: "emergencyInvestigation",
        //   icon: "",
        //   title: "应急调查",
        //   items: [
        //     {
        //       name: "emergencyInvestigation",
        //       icon: "emergencyInvestigation",
        //       title: "应急调查数据采集"
        //     }
        //   ]
        // },
        // {
        //   name: "monitoring",
        //   icon: "",
        //   title: "监测信息",
        //   items: [
        //     {
        //       name: "professionalMnt",
        //       icon: "professionalMonitoring",
        //       title: "专业监测点数据采集"
        //     },
        //     {
        //       name: "simpleMnt",
        //       icon: "simpleMonitoring",
        //       title: "简易监测点数据采集(X)"
        //     }
        //   ]
        // },
        // {
        //   name: "engineer",
        //   icon: "",
        //   title: "治理工程",
        //   items: [
        //     {
        //       name: "engineer",
        //       icon: "governanceEngineering",
        //       title: "治理工程数据采集"
        //     }
        //   ]
        // },
        // {
        //   name: "eliminateDanger",
        //   icon: "",
        //   title: "应急排危",
        //   items: [
        //     {
        //       name: "eliminateDanger",
        //       icon: "eliminateDanger",
        //       title: "应急排危数据采集"
        //     }
        //   ]
        // },
        // {
        //   name: "relocation",
        //   icon: "",
        //   title: "搬迁避让",
        //   items: [
        //     {
        //       name: "relocation",
        //       icon: "relocation",
        //       title: "搬迁避让数据采集"
        //     },
        //     {
        //       name: "emergencyShelter",
        //       icon: "emergencyShelter",
        //       title: "应急避让场所采集"
        //     }
        //   ]
        // },
        // {
        //   name: "training",
        //   icon: "",
        //   title: "培训演练",
        //   items: [
        //     {
        //       name: "trainingPromotion",
        //       icon: "trainingPromotion",
        //       title: "宣传培训"
        //     },
        //     {
        //       name: "riskAversion",
        //       icon: "riskAversion",
        //       title: "避险演练"
        //     }
        //   ]
        // }
      ]
    };
  },
  mounted() {
    let items = [];
    this.approvals.forEach(item => items.push(item.name));
    this.activeItems = items;
  }
};
</script>
<style lang="less" scoped>
@import "~@/theme/index.less";

.workspace {
  .approval-title {
    .el-collapse-item__header {
      font-size: 1.5em;
      padding-left: 1em;
      font-weight: 600;
    }
  }
  .approval-item {
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    .item-icon {
      font-size: 40px;
      color: @light-primary-color;
      vertical-align: middle;
    }
    .item-title {
      font-size: @font-size-large;
      margin-left: 1em;
      color: @text-color;
    }
  }
  .approval-card {
    margin: 1em 0.5em;
  }
  .el-card:hover {
    border: 1px solid @primary-color;
  }
}
</style>

<style lang="less">
.el-card__body {
  padding: 0px !important;
}
</style>
