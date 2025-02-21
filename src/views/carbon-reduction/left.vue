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
        <div class="w-392px h-50px relative mt-10px">
          <el-image class="w-392px h-50px" :src="l1" fit="fill" />
          <div class="absolute left-0px bottom-0px w-394px h-50px pl-40px pt-12px font-800 text-16px text-#97FFDB">
            实时充电碳排放因子
          </div>
        </div>
        <div class="w-380px">
          <div class="h-125px">
            <Chart height="100%" :options="chart1Option"></Chart>
          </div>
        </div>
      </div>
      <div>
        <div class="w-362px h-50px relative mt-10px">
          <el-image class="w-362px h-50px" :src="l1" fit="fill" />
          <div class="absolute left-0px bottom-0px w-360px h-50px pl-40px pt-12px font-800 text-16px text-#97FFDB">
            充电桩实时状态
          </div>
          <div class="absolute left-0px bottom-0px w-360px h-50px pr-20px pt-12px flex justify-end">
            <Buttons :buttons="buttons" @click="handleClick"></Buttons>
          </div>
        </div>
        <div class="w-340px h-166px pl-30px mt-0px">
          <div class="grid grid-cols-3 grid-rows-2 gap-y-22px gap-x-10px">
            <div v-for="item in chargingPileA" :key="item.id">
              <el-popover :show-arrow="false" popper-class="pile-popover" placement="top-start"
                :title="`设备编号:${item.name}`" :width="200" trigger="hover">
                <template #reference>
                  <div class="flex items-center cursor-pointer">
                    <div>
                      <el-image class="w-29px h-54px" :src="item.pile" fit="fill" />
                    </div>
                    <div class="relative text-center flex flex-col items-center ml-4px">
                      <span class="text-#1FF0A5 text-10px font-500">{{ item.name }}</span>
                      <el-image class="w-32px h-37px" :src="item.state" fit="fill" />
                      <span class="text-#1FF0A5 text-7px font-500 whitespace-nowrap">{{
                        item.status }}</span>
                    </div>
                  </div>
                </template>
                <template #default>
                  <div>
                    <div class=" px-10px py-5px">
                      <span class="text-#1FF0A5 text-10px font-400 mr-10px">实时碳排放因子</span>
                      <span class="text-#1FF0A5 text-12px font-600">0.0 kgCO₂/kwh</span>
                    </div>
                    <div class="mt-10px  px-10px py-5px">
                      <span class="text-#1FF0A5 text-10px font-400 mr-40px">实时功率</span>
                      <span class="text-#1FF0A5 text-12px font-600">235 kW</span>
                    </div>
                  </div>
                </template>
              </el-popover>

            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="w-342px h-50px relative mt-0px">
          <el-image class="w-342px h-50px" :src="l1" fit="fill" />
          <div class="absolute left-0px bottom-0px w-340px h-50px pl-40px pt-12px font-800 text-16px text-#97FFDB">
            储能运行情况
          </div>
        </div>
        <div class="w-360px pl-24px pr-10px mt-16px flex justify-between whitespace-nowrap relative">
          <div class="flex flex-col justify-between">
            <div class="flex items-center mt-30px">
              <div>
                <el-image class="w-25px h-25px" :src="lc1" fit="fill" />
              </div>
              <div class="ml-4px">
                <div class="text-#fff text-10px">可放电量</div>
                <div class="text-#1EDBE9 text-12px font-700">100.7 MWh</div>
              </div>
            </div>
            <div class="flex items-center mt-30px">
              <div>
                <el-image class="w-25px h-25px" :src="lc1" fit="fill" />
              </div>
              <div class="ml-4px">
                <div class="text-#fff text-10px">今日放电量</div>
                <div class="text-#1EDBE9 text-12px font-700">2.3 MWh</div>
              </div>
            </div>
            <div class="flex items-center mt-30px">
              <div>
                <el-image class="w-25px h-25px" :src="lc1" fit="fill" />
              </div>
              <div class="ml-4px">
                <div class="text-#fff text-10px">年累计充电电量</div>
                <div class="text-#1EDBE9 text-12px font-700">16522.4 MWh</div>
              </div>
            </div>
          </div>
          <div class="w-160px absolute left-0px right-0px m-auto">
            <div class="flex justify-between items-center">
              <div class="text-#E2E2E2 text-12px">实时功率</div>
              <div class="text-#00F0FF text-14px font-500 mx-10px">-0.3kW</div>
              <div class="w-27px h-16px text-center bg-#00FFA4/17 rounded-2px text-#1FF0A5 text-10px">充电</div>
            </div>
            <div>
              <Chart height="174px" :options="chartOption"></Chart>
            </div>
            <div class="text-#00F0FF text-12px text-center">SOC百分比</div>
          </div>
          <div class="flex flex-col justify-between">
            <div class="flex items-center mt-30px">
              <div>
                <el-image class="w-25px h-25px" :src="lc1" fit="fill" />
              </div>
              <div class="ml-4px">
                <div class="text-#fff text-10px">可充电量</div>
                <div class="text-#1EDBE9 text-12px font-700">349.9 kWh</div>
              </div>
            </div>
            <div class="flex items-center mt-30px">
              <div>
                <el-image class="w-25px h-25px" :src="lc1" fit="fill" />
              </div>
              <div class="ml-4px">
                <div class="text-#fff text-10px">今日充电量</div>
                <div class="text-#1EDBE9 text-12px font-700">57.3 MWh</div>
              </div>
            </div>
            <div class="flex items-center mt-30px">
              <div>
                <el-image class="w-25px h-25px" :src="lc1" fit="fill" />
              </div>
              <div class="ml-4px">
                <div class="text-#fff text-10px">年累计放电电量</div>
                <div class="text-#1EDBE9 text-12px font-700">14052.4 MWh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Chart from '@/components/chart/chart.vue'
import * as echarts from "echarts"
import { onMounted, onUnmounted, nextTick, ref, reactive, shallowRef } from 'vue';
import l1 from '@/assets/carbon-reduction/l1.png'
import l2 from '@/assets/carbon-reduction/l2.png'
import lb1 from '@/assets/carbon-reduction/lb_1.png'
import lb2 from '@/assets/carbon-reduction/lb_2.png'
import lb3 from '@/assets/carbon-reduction/lb_3.png'
import lb4 from '@/assets/carbon-reduction/lb_4.png'
import lb5 from '@/assets/carbon-reduction/lb_5.png'
import lc1 from '@/assets/carbon-reduction/lc_1.png'
import lc2 from '@/assets/carbon-reduction/lc_2.png'
import Buttons from '@/components/buttons/index.vue'
const buttons = [
  { label: 'A区', value: '1' },
  { label: 'B区', value: '2' },
]

const activeButton = ref('1')
const chargingPileA = ref([
  { id: '1', name: 'A#01', status: '低碳充电中', pile: lb1, state: lb2 },
  { id: '2', name: 'A#02', status: '闲置中', pile: lb1, state: lb3 },
  { id: '3', name: 'A#03', status: '充电中', pile: lb1, state: lb2 },
  { id: '4', name: 'A#04', status: '充电中', pile: lb1, state: lb2 },
  { id: '5', name: 'A#05', status: '充电中', pile: lb1, state: lb2 },
  { id: '6', name: 'A#06', status: '正在维修', pile: lb5, state: lb4 },
])



const handleClick = (value) => {
  activeButton.value = value
}

const chartOption = reactive({
  yAxis: {
    show: false
  },
  grid: {
    y: 0,
    x: 0,
    x2: -100,
    y2: -100
  },
  tooltip: {
    trigger: "item"
  },
  title: {
    show: false
  },
  series: [
    {
      name: "储能状态",
      type: "liquidFill",
      center: ["50%", "50%"],
      data: [2, [0.6]],
      radius: "75%",
      waveLength: "99%",
      waveHeight: "10",
      amplitude: 10,
      outline: {
        show: false
      },
      backgroundStyle: {
        color: "rgba(51, 51, 51, 0.8)",
        borderColor: "rgba(0,145,255,0.15)",
        borderWidth: 1,
        shadowColor: "rgba(0,145,255,0.69)",
        shadowBlur: 10
      },
      shape: "path://M82.6,85.5c0-1.1,0.4-2.1,1.4-2.9s2-1.3,3.1-1.3l19.5,0c1.1,0,2,0.4,2.9,1.3c0.9,0.9,1.3,1.8,1.3,2.9l0.1,54.1c0,1-0.4,1.9-1.3,2.8c-0.9,0.9-1.8,1.3-2.9,1.3l-19.5,0c-1.1,0-2.2-0.4-3.1-1.3c-0.9-0.9-1.4-1.7-1.4-2.8L82.6,85.5z M91.5,80.5c0-1.7,0.4-2.8,1.4-3.3c0.9-0.5,2.2-0.8,3.9-0.8c1.7,0,3,0.3,4,0.8c1,0.5,1.5,1.7,1.5,3.3H91.5z",
      color: ['rgba(0,145,255,0.49)'],
      label: {

        normal: {
          formatter: "68%",
          // position: 'center',
          fontSize: 16,
          color: '#00F0FF'
        }
      }
    }
  ]
})

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
    axisLine: {
      show: false,
    },
    type: "value",
    name: "kgco²",
    nameTextStyle: {
      color: "#fff"
    },
    splitLine: {
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
        color: "#fff"
      }
    },
  },
  series: [
    {
      name: '发电量',
      type: 'line',
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: 'none',
      lineStyle: {
        color: "#71e2f4",
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(113,226,244,0.38)'
          },
          {
            offset: 1,
            color: 'rgba(113,226,244,0.1)'
          }
        ])
      },
      data: [0.4, 0.3, 0.7, 0.5, 0.9, 0.6, 0.2]
    }
  ]
}

onMounted(() => {



})

onUnmounted(() => {
})
</script>

<style lang="scss" scoped>
.wrap_bg_h {
  background: url('@/assets/carbon-reduction/l1.png');
  background-repeat: no-repeat;
  background-size: cover;
}



.border {
  border: 1px solid #0db1bc;
}

.aside-left {
  position: absolute;
  left: 0;
  top: 0px;
  width: 430px;
  height: 100%;
  box-sizing: border-box;

}
</style>
