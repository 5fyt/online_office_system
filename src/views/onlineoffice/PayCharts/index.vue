<template>
  <div>
    <SearchComp :searchConfig="searchConfig" @searchInfo="searchInfo"></SearchComp>
    <div id="chart-container">
      <el-row :gutter="100">
        <el-col :span="8"><div class="chart" id="chart-1"></div></el-col>
        <el-col :span="8"><div class="chart" id="chart-2"></div></el-col>
        <el-col :span="8"><div class="chart" id="chart-3"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div id="chart-4"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchComp from '@/components/onlineoffice/SearchComp/index.vue'
import searchConfig from './constants/seachConfig.ts'
import { ref, onMounted } from 'vue'
import $ from 'jquery'
import * as echarts from 'echarts'
const data = ref([])
//图表一
const loadChartOne = () => {
  let option_1 = {
    title: {
      show: false,
      text: '暂无数据',
      left: 'center',
      top: 'center',
      textStyle: {
        color: 'pink',
        fontSize: 16,
        fontWeight: 400
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '罚款类型',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          formatter: '{name|{b}}',
          rich: {
            time: {
              fontSize: 12,
              color: '#999'
            }
          }
        },
        data: [
          { value: 335, name: 'A' },
          { value: 310, name: 'B' },
          { value: 234, name: 'C' },
          { value: 135, name: 'D' },
          { value: 1548, name: 'E' }
        ]
      }
    ]
  }
  let chart = echarts.init(document.getElementById('chart-1'))
  // console.log(chart)
  chart.setOption(option_1)
}

//图表二
const loadChartTwo = () => {}
//图表三
const loadChartThree = () => {}
//图表四
const loadChartFour = () => {
  let option_4 = {
    title: {
      text: '全年违纪统计图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['已交费', '未交费']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '已交费',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        data: [10, 22, 28, 43, 49]
      },
      {
        name: '未交费',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        data: [5, 4, 3, 5, 10]
      }
    ]
  }
   let chart = echarts.init(document.getElementById('chart-4'))
  chart.setOption(option_4)
}
const loadList = () => {
  loadChartOne()
  loadChartFour()
}
onMounted(() => {
  loadList()
})

const searchInfo = () => {
  loadList()
}
</script>
<style scope lang="less">
#chart-container {
  .chart {
    background-color: #fff;
    height: 300px;
  }
  #chart-4 {
    height: 430px;
  }
}
</style>
<!-- loadDataList: function() {
    let that = this;
    that.dataListLoading = true;
    let data = {
        deptId: that.dataForm.deptId,
        typeId: that.dataForm.typeId
    };
    if (that.dataForm.date != null && that.dataForm.date.length == 2) {
        let startDate = that.dataForm.date[0];
        let endDate = that.dataForm.date[1];
        data.startDate = dayjs(startDate).format('YYYY-MM-DD');
        data.endDate = dayjs(endDate).format('YYYY-MM-DD');
    }
    that.$http('amect/searchChart', 'POST', data, true, function(resp) {
        let chart_1 = resp.chart_1;
        let temp = [];
        for (let one of chart_1) {
            temp.push({ name: one.type, value: one.ct });
        }
        // 绘制图表
        let option_1 = {
            title: {
                show: false,
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'pink',
                    fontSize: 16,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '罚款类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        formatter: '{name|{b}}',
                        rich: {
                            time: {
                                fontSize: 12,
                                color: '#999'
                            }
                        }
                    },
                    data: temp
                }
            ]
        };
        let myChart = null;
        if (temp == null || temp.length == 0) {
            option_1.title.show = true;
            myChart = that.$echarts.init($('#chart-1')[0]);
            myChart.setOption(option_1);
        } else {
            myChart = that.$echarts.init($('#chart-1')[0]);
            myChart.setOption(option_1);
        }
        let chart_2 = resp.chart_2;
        temp = [];
        for (let one of chart_2) {
            if (one.ct > 0) {
                temp.push({ name: one.title, value: one.ct });
            }
        }
        let option_2 = {
            title: {
                show: false,
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'pink',
                    fontSize: 16,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '罚款类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        formatter: '{name|{b}}',
                        rich: {
                            time: {
                                fontSize: 12,
                                color: '#999'
                            }
                        }
                    },
                    data: temp
                }
            ]
        };
        if (temp == null || temp.length == 0) {
            option_2.title.show = true;
            myChart = that.$echarts.init($('#chart-2')[0]);
            myChart.setOption(option_2);
        } else {
            myChart = that.$echarts.init($('#chart-2')[0]);
            myChart.setOption(option_2);
        }
        let chart_3 = resp.chart_3;
        temp = [];
        for (let one of chart_3) {
            if (one.ct > 0) {
                temp.push({ name: one.title, value: one.ct });
            }
        }
        let option_3 = {
            title: {
                show: false,
                text: '暂无数据',
                left: 'center',
                top: 'center',
                textStyle: {
                    color: 'pink',
                    fontSize: 16,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '罚款类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        formatter: '{name|{b}}',
                        rich: {
                            time: {
                                fontSize: 12,
                                color: '#999'
                            }
                        }
                    },
                    data: temp
                }
            ]
        };
        if (temp == null || temp.length == 0) {
            option_3.title.show = true;
            myChart = that.$echarts.init($('#chart-3')[0]);
            myChart.setOption(option_3);
        } else {
            myChart = that.$echarts.init($('#chart-3')[0]);
            myChart.setOption(option_3);
        }
        console.log(resp);
        let chart_4_1 = resp.chart_4_1;
        let data_1 = [];
        for (let one of chart_4_1) {
            data_1.push(one.ct);
        }
        let chart_4_2 = resp.chart_4_2;
        let data_2 = [];
        for (let one of chart_4_2) {
            data_2.push(one.ct);
        }
        let option_4 = {
            title: {
                text: '全年违纪统计图'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['已交费', '未交费']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        '1月',
                        '2月',
                        '3月',
                        '4月',
                        '5月',
                        '6月',
                        '7月',
                        '8月',
                        '9月',
                        '10月',
                        '11月',
                        '12月'
                    ]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '已交费',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    smooth: true,
                    data: data_1
                },
                {
                    name: '未交费',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    smooth: true,
                    data: data_2
                }
            ]
        };
        myChart = that.$echarts.init($('#chart-4')[0]);
        myChart.setOption(option_4);
    });
}, -->
