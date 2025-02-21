<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-23 13:39:26
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-06 10:11:07
-->
<script setup lang="ts">

import { nextTick, onMounted, onUnmounted } from 'vue';
import home_a from '@/assets/home/a.png'
import home_b from '@/assets/home/b.png'
import home_c from '@/assets/home/c.png'
import home_d from '@/assets/home/d.png'
import home_e from '@/assets/home/e.png'
import home_f from '@/assets/home/f.png'
import home_g from '@/assets/home/g.png'

onMounted(() => {

})

</script>

<template>
  <main class="overflow-hidden w-100% h-100%">
    <div class="flex w-100% h-100% wrap p-30px " id="wrap">
      <div class="ml-20px h-100%">
        <div class="w-60px h-220px relative">
          <el-image class="w-60px h-220px" :src="home_a" fit="fill" />
          <div
            class="w-60px h-220px absolute top-0px left-0px flex justify-center items-center text_wrap text-36px font-800">
            项目特色
          </div>
        </div>
        <!-- <div class="w-24px text_wrap">围绕多能变换一体装备的公路交通自洽能源系统应用示范工程</div> -->
      </div>
      <div>
        <div class="ml-80px h-100%">
          <div class="w-60px h-100% relative">
            <el-image class="w-60px h-100%" :src="home_b" fit="fill" />
            <div
              class="w-60px h-100% absolute top-0px left-0px flex justify-center items-center text_wrap text-30px font-800">
              红格服务区
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-1px border-#3a446d border-solid border-l-0px w-300px p-16px py-32px flex flex-col justify-between items-center">
        <el-image class="w-100%" :src="home_c" fit="fill" />
        <div class="indent-8">
          攀枝花市气候独特，属南亚热带亚湿润气候。具有夏季长、温度日变化大，四季不分明，降雨少而集中，日照多，太阳辐射强，气候垂直差。攀枝花所处的河谷地区比较温暖，年平均气温在19℃～21℃之间。全年无冬，最冷月的月平均气温也在10℃以上。夏季的气温却不高，最热月的月平均气温也不过26℃左右。这里降水
          10不多，云量少而光照充足，全年日照时数长达 2300h～2700h。
        </div>
      </div>
      <div class="border-1px border-#3a446d border-solid border-l-0px w-900px p-16px grid grid-cols-2 gap-24px">
        <div>
          <el-image class="w-100% h-160px" :src="home_d" fit="fill" />
          <div class="text-22px font-800">低碳化</div>
          <div class="indent-8">
            积极采用太阳能、风能等清洁能源替代传统能源，优化交通流线与车辆能源结构，以降低二氧化碳排放。
          </div>
        </div>
        <div>
          <el-image class="w-100% h-160px" :src="home_f" fit="fill" />
          <div class="text-22px font-800">节能化</div>
          <div class="indent-8">
            选用高效节能设备，借助能源管理系统精细调控能源消耗，避免能源浪费，提高能源利用效率。
          </div>
        </div>
        <div>
          <el-image class="w-100% h-160px" :src="home_e" fit="fill" />
          <div class="text-22px font-800">智慧化</div>
          <div class="indent-8">
            运用物联网、大数据、人工智能等技术搭建智能平台，实现设施设备的远程监控与智能运维、能源的精准管理与优化调度，提升整体运营效率和服务质量。
          </div>
        </div>
        <div>
          <el-image class="w-100% h-160px" :src="home_g" fit="fill" />
          <div class="text-22px font-800">循环化</div>
          <div class="indent-8">
            污水经处理后回用于非饮用场景，构建水资源循环；对固体废弃物分类回收与处置，实现资源再生；将有机废弃物转化为能源和肥料。
          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
.wrap {
  // background: #dadada;
  background: url("https://imgservices-1252317822.image.myqcloud.com/coco/s04232024/682ad393.to0id6.jpg") 50% 0/auto 50%;
}

.bg_home_1 {
  background-image: url('@/assets/home/a.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.text_wrap {
  writing-mode: vertical-rl;
}
</style>
