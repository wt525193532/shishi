<template>
  <div>
    <div :gutter="15" style="display: flex;">
      <div style="margin-right: 240px;">
        <el-menu
          :unique-opened="true"
          class="detail-menu"
          :default-active="activeName"
          @select="handleSelect"
        >
          <el-submenu
            :index="item.name"
            :key="item.name"
            v-for="item in menuList"
          >
            <template slot="title">
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="item.name"
              :key="item.name"
              v-for="item in item.items"
              >{{ item.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
      <allFormView
        :activeName="activeName"
        style="display: flex;"
      ></allFormView>
      <!-- <div class="comContent">
        <component :is="activeName"></component>
      </div>-->
    </div>
  </div>
</template>
<script>
import allFormView from "@/view/components/allFormView";
export default {
  name: "BasicInfoDetail",
  components: {
    allFormView
  },
  data() {
    return {
      menuList: [
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
        },
        {
          name: "groupSurveyDefense",
          icon: "",
          title: "群测群防",
          items: [
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
            }
          ]
        },
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
        {
          name: "monitoring",
          icon: "",
          title: "监测信息",
          items: [
            {
              name: "professionalMnt",
              icon: "professionalMonitoring",
              title: "专业监测点数据采集"
            },
            {
              name: "simpleMnt",
              icon: "simpleMonitoring",
              title: "简易监测点数据采集(X)"
            }
          ]
        },
        {
          name: "engineer",
          icon: "",
          title: "治理工程",
          items: [
            {
              name: "engineer",
              icon: "governanceEngineering",
              title: "治理工程数据采集"
            }
          ]
        },
        {
          name: "eliminateDanger",
          icon: "",
          title: "应急排危",
          items: [
            {
              name: "eliminateDanger",
              icon: "eliminateDanger",
              title: "应急排危数据采集"
            }
          ]
        },
        {
          name: "relocation",
          icon: "",
          title: "搬迁避让",
          items: [
            {
              name: "relocation",
              icon: "relocation",
              title: "搬迁避让数据采集"
            }
            // {
            //   name: "emergencyShelter",
            //   icon: "emergencyShelter",
            //   title: "应急避让场所采集"
            // }
          ]
        }
        // {
        //   name: "training",
        //   icon: "",
        //   title: "培训演练",
        //   items: [
        //     {
        //       name: "training",
        //       icon: "training",
        //       title: "培训演练"
        //     }
        //     // {
        //     //   name: "trainingPromotion",
        //     //   icon: "trainingPromotion",
        //     //   title: "宣传培训"
        //     // },
        //     // {
        //     //   name: "riskAversion",
        //     //   icon: "riskAversion",
        //     //   title: "避险演练"
        //     // }
        //   ]
        // }
      ],
      openList: [
        "basic",
        "groupSurveyDefense",
        "emergencyInvestigation",
        "monitoring",
        "engineer",
        "eliminateDanger",
        "relocation",
        "training",
        "basicInfo",
        "preventPlan",
        "workCard",
        "riskCard",
        "emergencyInvestigation",
        "professionalMnt",
        "simpleMnt",
        "engineer",
        "eliminateDanger",
        "relocation",
        "emergencyShelter",
        "trainingPromotion",
        "riskAversion"
      ],
      activeName: "basicInfo"
    };
  },
  methods: {
    handleSelect(val) {
      this.activeName = val;
    }
  }
};
</script>
<style lang="less" scoped>
.detail-menu {
  background: #ffffff;
  position: fixed;
  width: 220px;
  height: 100%;
}
.comContent {
  background: #ffffff;
  padding: 15px;
}
</style>
