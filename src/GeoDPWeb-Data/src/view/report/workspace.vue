<template>
  <div class="workspace page-container">
    <!-- <div class="page-title">数据填报工作台</div> -->
    <el-collapse v-model="activeItems">
      <el-collapse-item
        v-for="item in reports"
        :key="item.name"
        class="report-title"
        :title="`${item.title}`"
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
            <el-card shadow="always" class="report-card">
              <router-link
                :to="{ name: child.to || `report.${child.name}`, params: {} }"
                class="report-item"
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
      reports: [
        {
          name: "basic",
          icon: "",
          title: "基本信息",
          items: [
            {
              name: "basicInfo",
              icon: "hiddenTrouble",
              title: "隐患点基本信息"
            },
            {
              name: "preventPlan",
              icon: "geodisasterPrevention",
              title: "防灾预案表"
            },
            {
              name: "workCard",
              icon: "fangzaika",
              title: "防灾工作明白卡"
            },
            {
              name: "riskCard",
              icon: "theSafetyCard",
              title: "避险明白卡"
            },
            {
              name: "professionalMnt",
              icon: "professionalMonitoring",
              title: "专业监测点数据采集"
            },
            {
              name: "simpleMnt",
              icon: "simpleMonitoring",
              title: "简易监测点数据采集"
            },
            {
              name: "engineer",
              icon: "governanceEngineering",
              title: "治理工程数据采集"
            },
            {
              name: "eliminateDanger",
              icon: "eliminateDanger",
              title: "应急排危数据采集"
            },
            {
              name: "relocation",
              icon: "relocation",
              title: "搬迁避让数据采集"
            },
            {
              name: "training",
              icon: "trainingPromotion",
              title: "培训演练"
            }
          ]
        },

        {
          name: "DataCollect",
          icon: "",
          title: "矿山数据采集信息",
          items: [
            {
              name: "mineInformation",
              icon: "hiddenTrouble",
              title: "矿山基本信息"
            },
            {
              name: "heritageProtection",
              icon: "geodisasterPrevention",
              title: "地质遗迹数据采集"
            },
            {
              name: "governDataCollect",
              icon: "fangzaika",
              title: "矿山治理工程进展数据采集"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    let items = [];
    this.reports.forEach(item => items.push(item.name));
    this.activeItems = items;
    this.$store.commit("app/loading", true);
  }
};
</script>
<style lang="less">
@import "~@/theme/index.less";

.workspace {
  min-height: 780px;
  .report-title {
    .el-collapse-item__header {
      font-size: 1.5em;
      padding-left: 1em;
      font-weight: 600;
    }
  }
  .report-item {
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
  .report-card {
    margin: 1em 0.5em;
  }
  .el-card:hover {
    border: 1px solid @primary-color;
  }
  .el-card__body {
    padding: 0px;
  }
}
</style>
