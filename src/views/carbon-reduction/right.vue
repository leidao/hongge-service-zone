<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-31 11:02:46
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 11:37:52
-->
<template>
  <!-- 右侧 -->
  <div class="aside-right z-[14]">
    <el-image class="w-430px h-100%" :src="r2" fit="fill" />
    <div class="absolute left-0px top-0px w-430px h-100%">
      <div class="float-right">
        <div class="w-400px h-50px relative mt-10px">
          <el-image class="w-394px h-50px float-right" :src="r1" fit="fill" />
          <div
            class="absolute left-0px bottom-0px w-394px h-50px pr-40px pt-12px font-800 text-end text-16px text-#97FFDB"
          >
            碳排放分析
          </div>
        </div>
        <div class="w-400px relative mt-10px">
          <div class="flex justify-between">
            <div class="w-213px">
              <Backdrop
                :max="200"
                :skew="9"
                unit="kw"
                title="网供电日累计"
                :buttons="buttonsA"
                @click="handleClick"
              >
                <div class="ml-0px w-223px h-100%">
                  <Chart height="100%" :options="chart1Option"></Chart>
                </div>
              </Backdrop>
            </div>
            <div class="w-174px">
              <Backdrop
                :max="200"
                :skew="0"
                unit="kw"
                title="风电日累计"
                :buttons="buttonsB"
                @click="handleClick"
              >
                <div class="w-174px h-100%">
                  <Chart height="100%" :options="chart2Option"></Chart>
                </div>
              </Backdrop>
            </div>
          </div>
          <div class="flex justify-between mt-30px">
            <div class="w-164px ml-56px">
              <Backdrop
                :max="200"
                :skew="3"
                unit="kw"
                title="光伏日累计"
                :buttons="buttonsA"
                @click="handleClick"
              >
                <div class="ml-0px w-174px h-100%">
                  <Chart height="100%" :options="chart3Option"></Chart>
                </div>
              </Backdrop>
            </div>
            <div class="w-164px">
              <Backdrop
                :max="200"
                :skew="0"
                unit="kw"
                title="氢能日累计"
                :buttons="buttonsB"
                @click="handleClick"
              >
                <div class="w-164px h-100%">
                  <Chart height="100%" :options="chart4Option"></Chart>
                </div>
              </Backdrop>
            </div>
          </div>
        </div>
      </div>
      <div class="float-right mt-20px">
        <div class="w-340px h-50px relative">
          <el-image class="w-340px h-50px float-right" :src="r1" fit="fill" />
          <div
            class="absolute left-0px bottom-0px w-340px h-50px pr-36px pt-12px font-800 text-end text-16px text-#97FFDB"
          >
            减碳量总体态势
          </div>
        </div>
        <div class="w-340px mt-22px">
          <Chart height="188px" :options="chart5Option"></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from '@/components/chart/chart.vue'
import * as echarts from 'echarts'
import { onMounted, onUnmounted, nextTick, ref, reactive, shallowRef } from 'vue'
import day from 'dayjs'
import r1 from '@/assets/carbon-reduction/r1.png'
import r2 from '@/assets/carbon-reduction/r2.png'
import ra1 from '@/assets/carbon-emission/ra_1.png'
import Backdrop from '@/components/backdrop/index.vue'

const buttonsA = [
  {
    label: '电量',
    value: '1',
  },
  {
    label: '碳排放量',
    value: '2',
  },
]
const buttonsB = [
  {
    label: '电量',
    value: '1',
  },
  {
    label: '减碳量',
    value: '2',
  },
]
const handleClick = (item) => {
  console.log(item)
}
const chart1Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: 56,
    right: 14,
    bottom: 5,
    top: 6,
    containLabel: true,
  },
  legend: {
    show: false,
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#036744',
      },
    },
    axisLabel: {
      fontSize: 10,
      color: '#BBBAB5',
      // alignMinLabel: 'left',
      // alignMaxLabel: 'right',
      margin: 8,
    },
  },

  yAxis: {
    show: false,
    axisLine: {
      show: false,
    },
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        color: '#036744',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
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
        color: '#FF0606',
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255,6,6,0.38)',
          },
          {
            offset: 1,
            color: 'rgba(255,6,6,0.1)',
          },
        ]),
      },
      data: [40, 130, 70, 150, 190, 60, 200],
    },
  ],
}
const chart2Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: 16,
    right: 14,
    bottom: 5,
    top: 6,
    containLabel: true,
  },
  legend: {
    show: false,
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#036744',
      },
    },
    axisLabel: {
      fontSize: 10,
      color: '#BBBAB5',
      margin: 8,
    },
  },

  yAxis: {
    show: false,
    axisLine: {
      show: false,
    },
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        color: '#036744',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
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
        color: '#3DECFF',
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(61,236,255,0.38)',
          },
          {
            offset: 1,
            color: 'rgba(61,236,255,0.1)',
          },
        ]),
      },
      data: [40, 130, 70, 150, 190, 60, 200],
    },
  ],
}
const chart3Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: 26,
    right: 14,
    bottom: 5,
    top: 6,
    containLabel: true,
  },
  legend: {
    show: false,
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#036744',
      },
    },
    axisLabel: {
      fontSize: 10,
      color: '#BBBAB5',
      // alignMinLabel: 'left',
      // alignMaxLabel: 'right',
      margin: 8,
    },
  },

  yAxis: {
    show: false,
    axisLine: {
      show: false,
    },
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        color: '#036744',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
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
        color: '#FFE600',
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255,230,0,0.38)',
          },
          {
            offset: 1,
            color: 'rgba(255,230,0,0.1)',
          },
        ]),
      },
      data: [40, 130, 70, 150, 190, 60, 200],
    },
  ],
}
const chart4Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: 16,
    right: 14,
    bottom: 5,
    top: 6,
    containLabel: true,
  },
  legend: {
    show: false,
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#036744',
      },
    },
    axisLabel: {
      fontSize: 10,
      color: '#BBBAB5',
      margin: 8,
    },
  },

  yAxis: {
    show: false,
    axisLine: {
      show: false,
    },
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        color: '#036744',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
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
        color: '#0972FF',
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(9,114,255,0.38)',
          },
          {
            offset: 1,
            color: 'rgba(9,114,255,0.1)',
          },
        ]),
      },
      data: [40, 130, 70, 150, 190, 60, 200],
    },
  ],
}

const colorMap = {
  风电减碳量: '#00C2FF',
  光伏减碳量: '#00FF2B',
  氢能减碳量: '#FFE600',
  储能减碳量: '#E85318',
  其他减碳量: '#1FF0A5',
}

const chart5Option = reactive({
  xAxis: {
    show: false,
  },
  yAxis: {
    show: false,
  },
  tooltip: {
    trigger: 'item',
    formatter: function (res) {
      if (res.componentSubType == 'liquidFill') {
        return res.seriesName + ': ' + ((res.value * 10000) / 100).toFixed(2) + '%'
      } else {
        return (
          '<span class="ii" style="background:' +
          res.color +
          ' "></span>' +
          res.name +
          ': ' +
          res.value.toFixed(2) +
          '%'
        )
      }
    },
  },
  legend: {
    orient: 'vertical',
    right: '2%',
    top: 'center',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#fff',
    },
    formatter: function (name) {
      const data = chart5Option.series[3].data
      const target = data.find((item) => item.name === name)

      if (target) {
        return [`{name|${name}}  {value|${target.value.toFixed(2)}%}`].join('')
      }
      return name
    },
    textStyle: {
      rich: {
        name: {
          color: '#fff',
        },
        value: {
          color: '#fff',
        },
      },
    },
  },
  series: [
    {
      name: '',
      type: 'gauge',
      splitNumber: 30,
      min: 0,
      max: 100,
      radius: '105%',
      center: ['25%', '50%'],
      startAngle: 90,
      endAngle: -270,
      axisLine: {
        show: false,
        lineStyle: {
          width: 0,
          shadowBlur: 0,
          color: [[1, '#1FBE85']],
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'auto',
          width: 1,
        },
        length: 6,
        splitNumber: 5,
      },
      splitLine: {
        show: true,
        length: 16,
        lineStyle: {
          color: 'auto',
        },
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: 0,
      },
      detail: {
        show: 0,
      },
    },
    {
      name: '',
      type: 'gauge',
      splitNumber: 30,
      min: 0,
      max: 100,
      radius: '100%',
      center: ['25%', '50%'],
      startAngle: 90,
      endAngle: -270,
      axisLine: {
        show: true,
        lineStyle: {
          width: 0,
          shadowBlur: 0,
          color: [
            [0, '#1FBE85'],
            [1, '#1FBE85'],
          ],
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#1FBE85',
          width: 2,
        },
        length: 10,
        splitNumber: 5,
      },
      splitLine: {
        show: true,
        length: 20,
        lineStyle: {
          color: '#1FBE85',
        },
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: 0,
      },
      detail: {
        show: 0,
      },
    },
    {
      type: 'pie',
      zlevel: 20,
      silent: true,
      radius: ['74%', '82%'],
      center: ['25%', '50%'],
      hoverAnimation: false,
      color: '#00F0FF',
      data: [1],
      labelLine: {
        normal: {
          show: false,
        },
      },
    },
    {
      name: '中间环形图',
      type: 'pie',
      radius: ['55%', '68%'],
      center: ['25%', '50%'],
      avoidLabelOverlap: false,
      hoverAnimation: false,
      label: {
        normal: {
          show: false,
          position: 'center',
        },
        emphasis: {
          show: false,
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      itemStyle: {
        borderWidth: 4,
        borderColor: '#142468',
      },
      data: [
        {
          value: 22.3,
          name: '风电减碳量',
          itemStyle: {
            color: '#00C2FF',
          },
        },
        {
          value: 35.72,
          name: '光伏减碳量',
          itemStyle: {
            color: '#00FF2B',
          },
        },
        {
          value: 35.26,
          name: '氢能减碳量',
          itemStyle: {
            color: '#FFE600',
          },
        },
        {
          value: 35.49,
          name: '储能减碳量',
          itemStyle: {
            color: '#E85318',
          },
        },
        {
          value: 35.49,
          name: '其他减碳量',
          itemStyle: {
            color: '#1FF0A5',
          },
        },
      ],
    },
  ],
  graphic: [
    // 中心背景圆
    {
      type: 'circle',
      shape: { r: 44 },
      left: '11.8%',
      top: 'center',
      z: 1000,
      style: {
        fill: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
          {
            offset: 0,
            color: 'rgba(13,194,254,0.3)',
          },
          {
            offset: 0.7,
            color: 'rgba(13,194,254,0.1)',
          },
          {
            offset: 1,
            color: 'rgba(13,194,254,0)',
          },
        ]),
        stroke: 'rgba(99, 226, 255, 0.6)',
        lineWidth: 2,
      },
    },
    {
      type: 'text',
      left: '14%',
      top: '35%',
      style: {
        text: '35',
        textAlign: 'center',
        fill: '#fff',
        fontSize: 38,
        fontWeight: 'bold',
      },
    },
    {
      type: 'text',
      left: '31%',
      top: '45%',
      style: {
        text: 'kg',
        textAlign: 'center',
        fill: '#fff',
        fontSize: 14,
      },
    },
    {
      type: 'text',
      left: '17%',
      top: '58%',
      style: {
        text: '减碳总量',
        textAlign: 'center',
        fill: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  ],
})

onMounted(() => {})

onUnmounted(() => {})
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
</style>
