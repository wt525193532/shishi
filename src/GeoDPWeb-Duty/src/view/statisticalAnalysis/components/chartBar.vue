<template>
  <div class="main-page-charts">
    <div
      id="formBarChart"
      :style="{ height: height, width: width }"
      :class="className"
    ></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "MainpageCharts",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    title: String,
    xAxisData: Array,
    seriesData: Array
  },
  data() {
    return {
      myChart: ""
    };
  },
  mounted() {
    this.formBarChart();
    let chart = this.myChart;
    window.onresize = chart.resize;
    window.addEventListener("resize", function() {
      chart.resize();
    });
  },
  watch: {
    seriesData() {
      this.formBarChart();
    }
  },
  methods: {
    formBarChart() {
      this.myChart = echarts.init(document.getElementById("formBarChart"));
      var option = {
        title: {
          text: this.title,
          x: "center",
          align: "right"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          top: 60,
          left: "2%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: {
          type: "category",
          data: this.xAxisData,

          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
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
        yAxis: {
          name: "条 ",
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
        series: [
          {
            smooth: false,
            type: "bar",
            barWidth: "80",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                color: "#4b9aa2"
              }
            },
            data: this.seriesData,
            animationDuration: 1500
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
};
</script>
