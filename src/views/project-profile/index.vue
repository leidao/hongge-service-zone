<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-31 11:02:46
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-11 13:55:37
-->
<template>
  <main class="w-100% h-100% relative">
    <div class="w-100% h-100% z-10 zone" ref="zone">
    </div>
    <div class="absolute right-15px top-40px w-334px h-456px z-12">
      <el-image class="w-100% h-100%" :src="a1" fit="fill" />
      <div
        class="absolute left-60px right-10px top-10px text-16px font-700 text-#00FFCC flex items-center justify-between">
        <span>关于红格服务区</span>
        <el-button link type="primary" @click="viewDetail">详情</el-button>
      </div>
      <div class="absolute left-0px top-57px px-16px">
        <el-image class="w-300px h-162px rounded-10px" :src="a2" fit="fill" />
        <div class="text-14px font-400 text-#DCFFF8 mt-8px indent-8">
          攀枝花市气候独特，属南亚热带亚湿润气候。具有夏季长、温度日变化大，四季不分明，降雨少而集中，日照多，太阳辐射强，气候垂直差。攀枝花所处的河谷地区比较温暖，年平均气温在19℃～21℃之间。全年无冬，最冷月的月平均气温也在10℃以上。夏季的气温却不高，最热月的月平均气温也不过26℃左右。这里降水
          10不多，云量少而光照充足，全年日照时数长达 2300h～2700h。</div>
      </div>
    </div>
    <div class="absolute left-15px right-15px bottom-20px h-160px z-12 flex justify-between">
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">
          低碳化
        </div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="b2" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px ">
            积极采用太阳能、风能等清洁能源替代传统能源，优化交通流线与车辆能源结构，以降低二氧化碳排放。</div>
        </div>
      </div>
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">
          节能化
        </div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="c1" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            选用高效节能设备，借助能源管理系统精细调控能源消耗，避免能源浪费，提高能源利用效率。</div>
        </div>
      </div>
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">
          智慧化
        </div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="d1" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            运用物联网、大数据、人工智能等技术搭建智能平台，实现设施设备的远程监控与智能运维、能源的精准管理与优化调度，提升整体运营效率和服务质量。</div>
        </div>
      </div>
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">
          循环化
        </div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="e1" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            污水经处理后回用于非饮用场景，构建水资源循环；对固体废弃物分类回收与处置，实现资源再生；将有机废弃物转化为能源和肥料。</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

import { onMounted, onUnmounted, nextTick, ref, defineExpose, shallowRef } from 'vue';
import Viewer from './viewer'
import { elRectification } from "autofit.js";
import a1 from '@/assets/project-profile/a1.png'
import a2 from '@/assets/project-profile/a2.png'
import b1 from '@/assets/project-profile/b1.png'
import b2 from '@/assets/project-profile/b2.png'
import c1 from '@/assets/project-profile/c1.png'
import d1 from '@/assets/project-profile/d1.png'
import e1 from '@/assets/project-profile/e1.png'
const zone = ref()
const viewer = shallowRef()
const getViewer = () => {
  return viewer.value
}

defineExpose({
  getViewer
})
// let id = null
// const animation = () => {
//   viewer.value && viewer.value.update()
//   id = requestAnimationFrame(animation)
// }


onMounted(() => {

  nextTick(() => {

    // setTimeout(() => {
    elRectification(".zone");
    viewer.value = new Viewer(zone.value)
    viewer.value.useOrbitControls()
    viewer.value.listen()
    viewer.value.loadServiceArea()
    // animation()
    // }, 7000)

  })

})

const viewDetail = () => {
  viewer.value?.stopRotation()
}

onUnmounted(() => {
  // cancelIdleCallback(id)
  viewer.value?.destroy()
})
</script>

<style lang="scss" scoped></style>
