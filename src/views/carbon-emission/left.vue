<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-31 11:02:46
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 11:35:55
-->
<template>
  <!-- 左侧 -->
  <div class="aside-left z-[10]">
    <el-image class="w-430px h-100%" :src="l2" fit="fill" />
    <div class="absolute left-0px top-0px w-430px h-100%">
      <div>
        <div class="w-394px h-50px relative mt-10px">
          <el-image class="w-394px h-50px" :src="l1" fit="fill" />
          <div class="absolute left-0px bottom-0px w-394px h-50px pl-40px pt-12px font-800 text-16px text-#97FFDB">
            天气情况
          </div>
        </div>
        <div class="mt-0px">
          <div class="flex pl-22px pr-50px">
            <div class="flex flex-col items-center  mr-20px">
              <el-image class="w-80px h-83px pl-10px" :src="a1" fit="fill" />
              <span class="text-12px text-#fff font-600">36.5℃</span>
              <span class="text-11px text-#fff font-500">多云</span>
              <span class="text-10px text-#fff font-500">东风2级</span>
            </div>
            <div class="flex flex-col items-center bg-#12b67c4d rounded-10px px-10px pb-16px pt-4px mr-20px">
              <span class="text-10px text-#fff font-400">周一</span>
              <span class="text-8px text-#fff font-400">4月16日</span>
              <el-image class="w-30px h-25px mt-12px mb-30px" :src="a2" fit="fill" />
              <span class="text-8px text-#fff font-400">6~16℃</span>
              <span class="text-8px text-#fff font-400 mt-6px">多云</span>
            </div>
            <div class="h-146px w-0px border-l-2px border-dashed border-#08E597 opacity-37 mr-6px"></div>
            <div class="h-146px w-164px">
              <div class="text-16px text-#fff font-700">天气详情</div>
              <div class="grid grid-cols-3 grid-rows-2 gap-y-2px">
                <div class="flex flex-col items-center">
                  <div class="text-11px text-#fff font-500">317w/m²</div>
                  <el-image class="w-25px h-25px" :src="a3" fit="fill" />
                  <div class="text-12px text-#9ACEF5 font-500">总辐射</div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="text-11px text-#fff font-500">16.7℃</div>
                  <el-image class="w-25px h-25px" :src="a8" fit="fill" />
                  <div class="text-12px text-#9ACEF5 font-500">温度</div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="text-11px text-#fff font-500">16.74%</div>
                  <el-image class="w-25px h-25px" :src="a5" fit="fill" />
                  <div class="text-12px text-#9ACEF5 font-500">湿度</div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="text-11px text-#fff font-500">1.96m/s</div>
                  <el-image class="w-25px h-25px" :src="a4" fit="fill" />
                  <div class="text-12px text-#9ACEF5 font-500">风速</div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="text-11px text-#fff font-500">6.75°</div>
                  <el-image class="w-25px h-25px" :src="a6" fit="fill" />
                  <div class="text-12px text-#9ACEF5 font-500">风向角度</div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="text-11px text-#fff font-500">0mm</div>
                  <el-image class="w-25px h-25px" :src="a7" fit="fill" />
                  <div class="text-12px text-#9ACEF5 font-500">降雨量</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="w-312px h-50px relative mt-10px">
          <el-image class="w-312px h-50px" :src="l1" fit="fill" />
          <div class="absolute left-0px bottom-0px w-394px h-50px pl-40px pt-12px font-800 text-16px text-#97FFDB">
            资源概览
          </div>
        </div>
        <div class="flex justify-between items-center relative pl-20px pr-100px">
          <div class="bg_wrap_linear w-130px h-180px p-12px">
            <div class="flex items-center">
              <el-image class="w-22px h-22px" :src="b2" fit="fill" />
              <div class="flex flex-col ml-5px">
                <div class="text-10px text-#fff font-500">风电容量</div>
                <div class="text-12px text-#2AFFD2 font-500">30
                  <span class="text-8px text-#fff">kW</span>
                </div>
              </div>
            </div>
            <div class="bolid_wrap mt-15px"></div>
            <div class="flex items-center mt-11px">
              <el-image class="w-22px h-22px" :src="b3" fit="fill" />
              <div class="flex flex-col ml-5px">
                <div class="text-10px text-#fff font-500">碱水制氢容量</div>
                <div class="text-12px text-#2AFFD2 font-500">2
                  <span class="text-8px text-#fff">Nm³/h</span>
                </div>
              </div>
            </div>
            <div class="bolid_wrap mt-15px"></div>
            <div class="flex items-center mt-11px">
              <el-image class="w-22px h-22px" :src="b4" fit="fill" />
              <div class="flex flex-col ml-5px">
                <div class="text-10px text-#fff font-500">燃料电池容量</div>
                <div class="text-12px text-#2AFFD2 font-500">30
                  <span class="text-8px text-#fff">kW/100kWh</span>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute left-136px top-60px w-74px h-74px">
            <el-image class="w-74px h-74px" :src="b1" fit="fill" />
            <div class="absolute left-0px top-0px w-74px h-74px text-center pt-12px">
              <div class="text-#2AFFD2 text-16px font-700">1763</div>
              <div class="text-#F9F9F9 text-8px font-700">
                <div>负荷容量</div>
                <div>kW</div>
              </div>
            </div>
          </div>
          <div class="bg_wrap_linear w-130px h-180px p-12px">
            <div class="flex items-center">
              <el-image class="w-22px h-22px" :src="b6" fit="fill" />
              <div class="flex flex-col ml-5px">
                <div class="text-10px text-#fff font-500">光热组件容量</div>
                <div class="text-12px text-#2AFFD2 font-500">28.08
                  <span class="text-8px text-#fff">kW</span>
                </div>
              </div>
            </div>
            <div class="bolid_wrap mt-15px"></div>
            <div class="flex items-center mt-11px">
              <div class="w-22px h-22px">
                <el-image class="w-22px h-22px" :src="b5" fit="fill" />
              </div>
              <div class="flex flex-col ml-5px">
                <div class="text-10px text-#fff font-500">储能容量</div>
                <div class="text-12px text-#2AFFD2 font-500 whitespace-nowrap">
                  800
                  <span class="text-8px text-#fff">kW</span>
                  /1751
                  <span class="text-8px text-#fff">kW</span>
                </div>
              </div>
            </div>
            <div class="bolid_wrap mt-15px"></div>
            <div class="flex items-center mt-11px">
              <el-image class="w-22px h-22px" :src="b7" fit="fill" />
              <div class="flex flex-col ml-5px">
                <div class="text-10px text-#fff font-500">光伏总容量</div>
                <div class="text-12px text-#2AFFD2 font-500">1244
                  <span class="text-8px text-#fff">kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="w-353px h-50px relative mt-10px">
          <el-image class="w-353px h-50px" :src="l1" fit="fill" />
          <div class="absolute left-0px bottom-0px w-394px h-50px pl-40px pt-12px font-800 text-16px text-#97FFDB">
            设备实时状态
          </div>
        </div>
        <div class="w-380px relative">
          <div class="absolute right-30px top--8px z-10">
            <div class="button-group mt-5px">
              <el-button v-for="(item, index) in buttons" :key="index" size="small"
                :class="['custom-button', { active: activeButton === item.value }]" @click="handleClick(item.value)">
                {{ item.label }}
              </el-button>
            </div>
          </div>
          <Chart height="204px" :options="chart1Option"></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from '@/components/chart/chart.vue'
import * as echarts from "echarts"
import { onMounted, onUnmounted, nextTick, ref, reactive, shallowRef } from 'vue';

import a1 from '@/assets/carbon-emission/a1.png'
import a2 from '@/assets/carbon-emission/a2.png'
import a3 from '@/assets/carbon-emission/a3.png'
import a4 from '@/assets/carbon-emission/a4.png'
import a5 from '@/assets/carbon-emission/a5.png'
import a6 from '@/assets/carbon-emission/a6.png'
import a7 from '@/assets/carbon-emission/a7.png'
import a8 from '@/assets/carbon-emission/a8.png'
import b1 from '@/assets/carbon-emission/b1.png'
import b2 from '@/assets/carbon-emission/b2.png'
import b3 from '@/assets/carbon-emission/b3.png'
import b4 from '@/assets/carbon-emission/b4.png'
import b5 from '@/assets/carbon-emission/b5.png'
import b6 from '@/assets/carbon-emission/b6.png'
import b7 from '@/assets/carbon-emission/b7.png'
import l1 from '@/assets/carbon-reduction/l1.png'
import l2 from '@/assets/carbon-reduction/l2.png'

const radio = ref('1')
const buttons = [
  { label: '风电', value: 'wind' },
  { label: '光伏', value: 'solar' },
  { label: '储能', value: 'storage' },
  { label: '网供电', value: 'grid' }
]

const activeButton = ref('wind')

const handleClick = (value) => {
  activeButton.value = value
}


const chart1Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: 10,
    right: 16,
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
    axisLine: {
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
    axisLine: {
      show: false,
    },
    type: "value",
    name: "kW",
    nameTextStyle: {
      color: "#ebf8ac"
    },
    splitLine: {
      show: true,
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
    max: 250,
    interval: 50,
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
        color: "#3DECFF",
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(61,236,255,0.41)'
          },
          {
            offset: 1,
            color: 'rgba(61,236,255,0.1)'
          }
        ])
      },
      data: [100, 80, 160, 130, 210, 150, 50]
    }
  ]
}


onMounted(() => {



})

onUnmounted(() => {
})
</script>

<style lang="scss" scoped>
.aside-left {
  position: absolute;
  left: 0;
  top: 0px;
  width: 430px;
  height: 100%;
  box-sizing: border-box;
}


.bg_wrap_linear {
  background: linear-gradient(180deg, rgba(0, 255, 201, 0.1435) 0%, rgba(0, 0, 0, 0) 99%);
}

.bolid_wrap {
  width: 102px;
  height: 1px;
  background: linear-gradient(63deg, rgba(22, 153, 250, 0) 0%, #2AFFD2 49%, rgba(0, 0, 0, 0) 99%);
  border-radius: 0px 0px 0px 0px;
}

.button-group {
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px;
  border-radius: 20px;
  // gap: 4px;
  border: 1px solid #97FFDB;

  ::v-deep(.el-button) {
    padding: 0px 8px;
    height: 18px;
  }
}

.custom-button {
  background: transparent;
  border: none;
  color: #fff;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 700;
}

.custom-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
}

.custom-button.active {
  background: #67C23A;
  color: #fff;
}

.custom-button.active:hover {
  background: #67C23A;
  opacity: 0.9;
}

.el-button+.el-button {
  margin-left: 6px !important;
}
</style>
