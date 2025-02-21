<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-01-22 18:31:10
 * @LastEditors: ldx
 * @LastEditTime: 2024-07-22 14:55:36
-->
<template>
  <div id="chart" ref="chartRef" :style="{ height: props.height }" :class="`w-100% ${props.class}`" />
</template>

<script setup lang="ts">
import { defineProps, watch, onMounted, ref, onUnmounted } from "vue"
import _ from "lodash"
import { baseOptions } from "./baseOptions"
import * as echarts from "echarts"
import "echarts-liquidfill"
let chartInstance: echarts.ECharts
const props = defineProps({
  height: String,
  options: Object,
  class: String
})
const chartRef = ref()

onMounted(() => {
  const chartDom = chartRef.value
  chartInstance = echarts.init(chartDom)
  update(props.options)
  const resizeObserver = new ResizeObserver(() => chartInstance.resize())
  resizeObserver.observe(chartDom)
})
onUnmounted(() => {
  chartInstance.clear()
  chartInstance.dispose()
})
const update = (value) => {
  const options = _.merge(_.cloneDeep({ ...baseOptions, toolbox: {} }), value)
  chartInstance && chartInstance.setOption(options, true)
}
watch(
  () => props.options,
  (value) => {
    update(value)
  },
  { deep: true }
)
</script>

<style scoped lang="scss"></style>
