<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-31 11:02:46
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 11:37:52
-->
<template>
  <!-- 右侧 -->
  <div class="aside-right z-[10]">
    <el-image class="w-430px h-100%" :src="r2" fit="fill" />
    <div class="absolute left-0px top-0px w-430px h-100% ">
      <div class="float-right">
        <div class="w-397px h-50px relative mt-10px">
          <el-image class="w-397px h-50px" :src="r1" fit="fill" />
          <div
            class="absolute left-0px bottom-0px w-394px h-50px pr-40px pt-12px font-800 text-end text-16px text-#97FFDB">
            碳排放因子曲线
          </div>
        </div>
        <div class="w-380px relative">
          <el-image class="w-380px h-142px" :src="ra1" fit="fill" />
          <div class="absolute left-40px top-0px w-360px">
            <Chart height="164px" :options="chart1Option"></Chart>
          </div>
        </div>
      </div>
      <div class="float-right">
        <div class="w-320px h-50px relative mt-14px">
          <el-image class="w-320px h-50px" :src="r1" fit="fill" />
          <div
            class="absolute left-0px bottom-0px w-312px h-50px pr-36px pt-12px font-800 text-end text-16px text-#97FFDB">
            用能碳排放统计
          </div>
        </div>
        <div class="w-320px">
          <div class="h-38px flex justify-between px-10px">
            <div class="w-50px h-50px relative">
              <el-image class="w-50px h-50px" :src="b8" fit="fill" />
              <div class="absolute left-0px top-10px w-50px h-18px text-#2AFFD2 text-11px text-center">25%</div>
              <div class="absolute left-0px top-26px w-50px h-18px text-#fff text-13px font-700 text-center">市电</div>
            </div>
            <div class="w-50px h-50px relative">
              <el-image class="w-50px h-50px" :src="b8" fit="fill" />
              <div class="absolute left-0px top-10px w-50px h-18px text-#2AFFD2 text-11px text-center">25%</div>
              <div class="absolute left-0px top-26px w-50px h-18px text-#fff text-13px font-700 text-center">储能</div>
            </div>
            <div class="w-50px h-50px relative">
              <el-image class="w-50px h-50px" :src="b8" fit="fill" />
              <div class="absolute left-0px top-10px w-50px h-18px text-#2AFFD2 text-11px text-center">25%</div>
              <div class="absolute left-0px top-26px w-50px h-18px text-#fff text-13px font-700 text-center">光伏</div>
            </div>
            <div class="w-50px h-50px relative">
              <el-image class="w-50px h-50px" :src="b8" fit="fill" />
              <div class="absolute left-0px top-10px w-50px h-18px text-#2AFFD2 text-11px text-center">25%</div>
              <div class="absolute left-0px top-26px w-50px h-18px text-#fff text-13px font-700 text-center">后备</div>
            </div>
          </div>
          <div>
            <Chart height="144px" :options="chart2Option"></Chart>
          </div>
        </div>
      </div>
      <div class="float-right">
        <div class="w-343px h-50px relative mt-0px">
          <el-image class="w-343px h-50px" :src="r1" fit="fill" />
          <div
            class="absolute left-0px bottom-0px w-343px h-50px pl-16px pt-16px font-700 text-start text-12px text-#97FFDB">
            {{ day(value).format('YYYY年MM月') }}
          </div>
          <div
            class="absolute left-0px bottom-0px w-343px h-50px pr-36px pt-12px font-800 text-end text-16px text-#97FFDB">
            碳排放量日历图
          </div>
        </div>
        <div class="w-340px">
          <div>
            <el-calendar v-model="value">
              <template #date-cell="{ data }">
                <div class="w-100% h-100% flex justify-between" @click="(e) => handleClick(e)">
                  <span class="text-#1EE9B6 text-10px ml-2px">{{ data.day.split("-")[2] }}</span>
                  <div class="flex items-center h-100%">
                    <div class="w-6px h-6px rounded-full bg-#1EE9B6 relative mr-4px animate-spin-slow"
                      :style="computedStyle(data)">
                      <div class="absolute -inset-1 bg-#1EE9B6/30 rounded-full " :style="{
                        animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }">
                      </div>
                    </div>

                  </div>
                  <div class="mr-2px"></div>
                </div>
              </template>
            </el-calendar>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-600px h-200px absolute z-11" v-show="visible" :style="{
    right: `${right}px`,
    bottom: `${bottom}px`
  }">
    <el-image class="w-600px h-200px" :src="c1" fit="fill" />
    <div class="absolute left-0px top-0px w-452px h-26px flex items-center justify-between">
      <div class="pl-20px text-#97FFDB text-16px font-700">{{ day(value).format('MM月DD日') }}碳排放量曲线</div>
      <el-icon color="#1BE2B8" class="cursor-pointer" @click="handleClose">
        <CloseBold />
      </el-icon>
    </div>
    <div class="absolute left-0px top-26px w-464px h-140px">
      <Chart height="140px" :options="chart3Option"></Chart>
    </div>
  </div>

</template>

<script setup>
import Chart from '@/components/chart/chart.vue'
import * as echarts from "echarts"
import { onMounted, onUnmounted, nextTick, ref, reactive, shallowRef } from 'vue';
import day from 'dayjs'
import r1 from '@/assets/carbon-reduction/r1.png'
import r2 from '@/assets/carbon-reduction/r2.png'
import ra1 from '@/assets/carbon-emission/ra_1.png'
import b8 from '@/assets/carbon-emission/b8.png'
import c1 from '@/assets/carbon-emission/c1.png'
import { CloseBold } from '@element-plus/icons-vue'
const container = ref()
const right = ref(0)
const bottom = ref(0)
const visible = ref(false)
const value = ref(new Date())
const chart1Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 10,
    top: 30,
    containLabel: true
  },
  legend: {
    show: false
  },

  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLabel: {
      interval: 0, // 强制显示所有标签
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 10 // 调小字号以避免重叠
      },
      margin: 16
    }
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: {
      show: false,
      lineStyle: {
        color: 'white'
      }
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Microsoft YaHei'
      },
    },
  },

  yAxis: {
    show: false,
    axisLine: {
      show: false,
    },
    type: "value",
    name: "kgco²/kwh",
    nameTextStyle: {
      color: "#ebf8ac"
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#036744',
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#ebf8ac"
      }
    },
    min: 0,
    max: 1,
    interval: 0.2,
    splitNumber: 5
  },
  series: [
    {
      name: '发电量',
      type: 'line',
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: 'none',
      lineStyle: {
        color: "#1FBE85",
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(74,243,63,0.38)'
          },
          {
            offset: 1,
            color: 'rgba(74,243,63,0.1)'
          }
        ])
      },
      data: [0.4, 0.3, 0.7, 0.5, 0.9, 0.6, 0.2]
    }
  ]
}

const chart2Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 0,
    top: 28,
    containLabel: true
  },
  legend: {
    data: ['用能kW·h', '碳排放t'],
    right: 10,
    top: 12,
    textStyle: {
      color: "#fff"
    },
    itemWidth: 12,
    itemHeight: 10,
  },
  xAxis: {
    type: 'category',
    data: ['4月', '5月', '6月', '7月'],
    axisLine: {
      lineStyle: {
        color: 'white'

      }
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Microsoft YaHei'
      }
    },
  },
  yAxis: {
    type: "value",
    // name: "kW",
    axisLine: {
      show: false,
    },
    nameTextStyle: {
      color: "#ebf8ac"
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#ebf8ac"
      }
    },

  },
  series: [

    {
      name: '用能kW·h',
      type: 'bar',
      barWidth: '15%',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#8bd46e'
          }, {
            offset: 1,
            color: '#09bcb7'
          }]),
          barBorderRadius: 11,
        }

      },
      data: [48, 33, 30, 45]
    },
    {
      name: '碳排放t',
      type: 'bar',
      barWidth: '15%',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#248ff7'
          }, {
            offset: 1,
            color: '#6851f1'
          }]),
          barBorderRadius: 11,
        }
      },
      data: [28, 16, 32, 40]
    }]
}

const chart3Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: 10,
    right: 20,
    bottom: 10,
    top: 30,
    containLabel: true
  },
  legend: {
    show: false
  },

  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLabel: {
      interval: 0, // 强制显示所有标签
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 10 // 调小字号以避免重叠
      },
      margin: 16
    }
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: {
      show: false,
      lineStyle: {
        color: 'white'
      }
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Microsoft YaHei'
      },
    },
  },

  yAxis: {
    type: "value",
    name: "kgco²",
    nameTextStyle: {
      color: "#F4F4F4"
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(181,181,181,0.26)',
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#F4F4F4"
      }
    },
  },
  series: [
    {
      name: '碳排放量',
      type: 'line',
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: 'none',
      lineStyle: {
        color: "#1BE2B8",
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(27,226,184,0.38)'
          },
          {
            offset: 1,
            color: 'rgba(27,226,184,0.1)'
          }
        ])
      },
      data: [0.4, 0.3, 0.7, 0.5, 0.9, 0.6, 0.2]
    }
  ]
}

const colors = ['#209980', '#67D8AE', '#c6c044', '#d09435', '#df4929', '#732615']
const computedStyle = (data) => {
  const flag = day(data.date).isBefore(day())
  let color = '#aaa'

  // if (flag) {
  color = colors[Math.floor(Math.random() * 6)]
  // }
  const value = Math.floor(Math.random() * 5) + 3 // 生成4-10的随机整数
  return {
    width: value + 'px',
    height: value + 'px',
  }
}

const handleClick = (e) => {
  const element = e.target.parentElement
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const topY = rect.top

  right.value = window.innerWidth - centerX
  bottom.value = window.innerHeight - topY
  visible.value = true
}
const handleClose = () => {
  visible.value = false
}

onMounted(() => {



})

onUnmounted(() => {
})
</script>

<style lang="scss" scoped>
.aside-right {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 430px;
  height: 100%;
  box-sizing: border-box;
}

::v-deep(.el-calendar) {
  background-color: transparent !important;

  .el-calendar__header {
    padding: 4px;
    display: none;
  }

  th {
    color: #97FFDB !important;
    padding: 0px 0px 4px 0px !important;
    font-size: 12px;
  }

  .el-calendar__body {
    padding: 0px 10px 12px 10px !important;
  }

  .is-selected {
    // background: transparent !important;
    background: rgba(74, 243, 63, 0.26) !important;
  }

  tr:first-child td {
    border-top: 1px solid rgba(74, 243, 63, 0.26) !important;
  }

  td {
    &:first-child {
      border-left: 1px solid rgba(74, 243, 63, 0.26) !important;
      // border-top: 1px solid rgba(74, 243, 63, 0.26) !important;
    }

    // border: 0px !important;
    border-right: 1px solid rgba(74, 243, 63, 0.26) !important;
    border-bottom: 1px solid rgba(74, 243, 63, 0.26) !important;

    .el-calendar-day {
      height: 34px;
      text-align: center;
      padding: 0px !important;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        // background: transparent !important;
        background: rgba(74, 243, 63, 0.16) !important;
      }
    }
  }

}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }
}


.animate-spin-slow {
  animation: pulse 2s linear infinite;
  transform-origin: center;
}
</style>
