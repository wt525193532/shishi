<template>
  <div class="statistic">
    <div class="statistical-page-search query-form">
      <el-form :inline="true" class="demo-form-inline" ref="form" :model="form">
        <el-form-item label="统计区域">
          <el-select
            :disabled="!administrative ? false : administrative.level === 3"
            v-model="form.areaCode"
            placeholder="请选择"
          >
            <el-option
              v-for="item in areaList"
              :key="item.adminCode"
              :label="item.displayName"
              :value="item.adminCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="fetch" style="margin-left:10px"
          >搜索</el-button
        >
      </el-form>
    </div>
    <div class="approval-stat">
      <el-tabs
        class="approval-tabs"
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
        style="padding:20px"
      >
        <el-tab-pane label="矿类分类统计" name="type">
          <div
            id="formBarCharta"
            style="height:600px"
            v-loading="bodyLoading"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="矿种分类统计" name="scale">
          <div
            id="formBarChartb"
            style="height:600px"
            v-loading="bodyLoading"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "MineStatistic",
  data() {
    return {
      disasterArea: "",
      itemStyle: {
        normal: {
          label: {
            show: true, // 开启显示
            position: "top", // 在上方显示
            textStyle: {
              // 数值样式
              color: "black",
              fontSize: 16
            }
          }
        }
      },
      areaList: [],
      // registrationOption: [
      //   {
      //     value: true,
      //     label: "是"
      //   },
      //   {
      //     value: false,
      //     label: "否"
      //   },
      //   {
      //     value: null,
      //     label: "全部"
      //   }
      // ],
      form: {
        areaCode: ""
      },
      activeName: "type",
      dimensionsType: [],
      sourceType: [],
      dimensionsScale: [],
      sourceScale: [],
      myChart1: "",
      myChart2: "",
      legendData: [],
      seriesData: []
    };
  },
  methods: {
    // 获取灾害类型
    // returnObjArr(value) {
    //   console.log(value, this.codeList[value]);
    //   if (this.codeList[value]) {
    //     return Object.keys(this.codeList[value]).map(item => ({
    //       name: this.codeList[value][item],
    //       id: item
    //     }));
    //   } else {
    //     return [];
    //   }
    // },
    //获取
    fetch() {
      if (this.activeName === "type") {
        this.$store
          .dispatch("statistic/staByClass", { ...this.form })
          .then(res => {
            this.dimensionsType = Object.keys(res.data.result[0]);
            this.sourceType = res.data.result;

            this.formBarCharta();
          });
      } else {
        this.$store
          .dispatch("statistic/staByType", { ...this.form })
          .then(res => {
            this.dimensionsScale = Object.keys(res.data.result[0]);
            this.sourceScale = res.data.result;
            this.formBarChartb();
          });
      }
    },
    handleClick() {
      this.$nextTick().then(() => {
        this.fetch();
      });
    },
    formBarCharta() {
      this.myChart1 = echarts.init(document.getElementById("formBarCharta"));
      // let series = this.dimensionsType.map((item, index) => {
      //   if (index > 0) return { type: 'bar' }
      // })
      var option = {
        title: {
          text: "矿山分类统计",
          x: "center",
          align: "center"
        },
        legend: {
          left: "center",
          orient: "horizontal",
          top: "30px",
          data: ["面积", "数量"],
          selected: { 面积: true, 数量: false }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: 80,
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          name: "数量 ",
          nameTextStyle: {
            color: "#545768",
            fontSize: 16
          },
          type: "value",
          axisTick: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: "#545768",
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: "#545768"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataset: {
          // dimensions: this.dimensionsScale,
          source: this.sourceType
        },
        xAxis: { type: "category" },
        series: [
          {
            type: "bar",
            itemStyle: this.itemStyle,
            name: "面积",
            barWidth: "20%"
          },
          {
            type: "bar",
            itemStyle: this.itemStyle,
            name: "数量",
            barWidth: "20%"
          }
        ]
      };
      this.myChart1.setOption(option);
    },
    formBarChartb() {
      this.myChart2 = echarts.init(document.getElementById("formBarChartb"));
      // let series = this.dimensionsScale.map((item, index) => {
      //   if (index > 0) return { type: 'bar' }
      // })
      var option = {
        title: {
          text: "矿种分类统计",
          x: "center",
          align: "center"
        },
        legend: {
          left: "center",
          orient: "horizontal",
          top: "30px",
          data: ["面积", "数量"],
          selected: { 面积: true, 数量: false }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          top: 80,
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          name: "数量 ",
          nameTextStyle: {
            color: "#545768",
            fontSize: 16
          },
          type: "value",
          axisTick: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: "#545768",
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: "#545768"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataset: {
          // dimensions: this.dimensionsScale,
          source: this.sourceScale
        },
        xAxis: { type: "category" },
        series: [
          {
            type: "bar",
            itemStyle: this.itemStyle,
            name: "面积",
            barWidth: "20%"
          },
          {
            type: "bar",
            itemStyle: this.itemStyle,
            name: "数量",
            barWidth: "20%"
          }
        ]
      };
      this.myChart2.setOption(option);
    },
    async getAdministrative() {
      await this.$store
        .dispatch(
          "statistic/getAreaList",
          !this.administrative ? "510100000000" : this.administrative.adminCode
        )
        .then(res => {
          if (!this.administrative || this.administrative.level !== 3) {
            this.areaList = res.data.result.children;
            this.areaList.unshift({
              displayName: res.data.result.displayName,
              adminCode: res.data.result.adminCode
            });
            this.form.areaCode = res.data.result.adminCode;
          } else {
            this.areaList = [
              {
                adminCode: this.administrative.adminCode,
                displayName: this.administrative.displayName
              }
            ];
            this.form.areaCode = this.administrative.adminCode;
          }
        });
      await this.fetch();
    },
    //获取矿类分类
    Mineral(v) {
      let arr = [];

      let mine = this.$t("codes." + v);

      Object.keys(mine).forEach(function(key) {
        arr.push(mine[key]);
      });
      return arr;
    },
    //获取sle矿类对象
    sleMineral(v) {
      let arr = this.Mineral(v);
      let Object = {};
      arr.forEach(v => {
        this.legendData.forEach(m => {
          if (m == v) {
            Object[v] = true;
          } else {
            Object[v] = false;
          }
        });
      });

      return Object;
    }
  },
  computed: {
    // ...mapGetters({
    //   administrative.adminCode: "common/getCityCode",
    //   codeList: "common/getCodeList",
    //    administrative.level: "common/getuserlevel",
    //   roleName: "common/getRoleName"
    // }),

    administrative() {
      return this.$store.state.session.administrative;
    },
    bodyLoading() {
      return this.$store.state.app.loading;
    }

    // disasterType() {
    //   return this.returnObjArr("DisasterType");
    // }
  },
  mounted() {
    this.getAdministrative().then(() => {
      const that = this;
      window.addEventListener("resize", function() {
        if (that.activeName === "type") {
          that.myChart1.resize();
        } else {
          that.myChart2.resize();
        }
      });
    });
  }
};
</script>
<style lang="less" scoped>
.statistical-page-search {
  // position: absolute;
  // left: 0;
  height: 60px;
  width: 100%;
  min-width: 1280px;
  overflow: hidden;
  line-height: 60px;
  background-color: #fff;
  padding: 0 15px;
  box-shadow: 0px 15px 10px -15px #ccc;
}
.approval-stat {
  .approval-tabs {
    background: #fff;
  }
  .bar-echart {
    width: 100%;
    height: 100%;
  }
  // padding: 15px;
  padding-top: 15px;
}
</style>
<style lang="less">
.el-form--inline .el-form-item__content {
  vertical-align: middle;
}
</style>
