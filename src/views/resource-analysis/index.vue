<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-23 13:39:26
 * @LastEditors: ldx
 * @LastEditTime: 2024-12-31 13:38:25
-->
<script setup lang="ts">

import { nextTick, onMounted, onUnmounted } from 'vue';
import home_a from '@/assets/home/a.png'
import analysis_a from '@/assets/resource-analysis/a.png'
import analysis_b from '@/assets/resource-analysis/b.png'
import analysis_c from '@/assets/resource-analysis/c.png'


onMounted(() => {
})

</script>

<template>
  <main class="overflow-hidden w-100% h-100% ">
    <div class="flex h-100% wrap p-30px " id="wrap">
      <div class="ml-20px h-100%">
        <div class="w-60px h-220px relative">
          <el-image class="w-60px h-220px" :src="home_a" fit="fill" />
          <div
            class="w-60px h-220px absolute top-0px left-0px flex justify-center items-center text_wrap text-36px font-800">
            资源分析
          </div>
        </div>
      </div>
      <div class="ml-60px">
        <div class="w-1140px">
          <div class="relative">
            <el-image class="w-620px h-250px" :src="analysis_a" fit="fill" />
            <div class="w-620px h-250px absolute top-0px left-0px px-36px py-16px indent-8">
              根据国家重点研发计划对示范工程“综合考虑服务区、收费站、高速路边坡及中间护栏等公路交通特色用能负荷，结合公路沿线空地，本项目在红格服务区布局建设 2.0MW 规模集中式供能系统，并且在 G4216
              线宁攀段高速公路 25
              公里护坡建设分布式光伏及储能系统，形成基于风光储电热氢耦合转化的集能源“供应、输送、转换、存储、使用”于一体的公路交通自洽能源系统应用示范工程”的要求，红格服务区将围绕多能变换一体化装备，建成涵盖光伏分布式发电系统、风力分布式发电系统、氢能发电系统、储能系统、冷热负荷及供配电系统等六种能源的公路交通自洽能源系统应用示范工程。
              本项目建设内容包含风、光分布式发电系统、光热系统、氢能发电系统、储能系统、冷热负荷系统、供配电系统等主要几个部分。
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-26px">
          <div>
            <div class="relative">
              <el-image class="w-260px h-48px" :src="analysis_b" fit="fill" />
              <div
                class="w-260px h-48px absolute top-0px left-0px px-16px flex items-center justify-center text-18px font-800">
                光伏分布式发电系统
              </div>
            </div>
            <div class="relative">
              <el-image class="w-260px h-274px" :src="analysis_c" fit="fill" />
              <div class="w-260px h-274px absolute top-0px left-0px p-16px text-13px indent-8">
                光伏分布式发电系统主要分为红格服务区区域以及G4216线宁攀段高速公路25公里护坡区域。供配置建设光伏分布式系统容量为 10.70472MWp，其中红格 B 服务区南边坡(南)区域建设 1.25304MWp
                分布式光伏（其中包括普通固定支架1.21104MWp、双轴跟踪支架 0.02808MWp、光热组件 0.01392MWp），在 G4216 线宁攀段高速公路 25 公里护坡建设 9.45168MWp
                分布式光伏。
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <el-image class="w-260px h-48px" :src="analysis_b" fit="fill" />
              <div
                class="w-260px h-48px absolute top-0px left-0px px-16px flex items-center justify-center text-18px font-800">
                风力分布式发电系统
              </div>
            </div>
            <div class="relative">
              <el-image class="w-260px h-274px" :src="analysis_c" fit="fill" />
              <div class="w-260px h-274px absolute top-0px left-0px p-16px text-13px indent-8">
                红格服务区实际规划场地对服务区功能、绿化要求较高，因此综合考虑服务区
                运行安全性、工程造价等因素，拟在在服务区内不影响车辆型式、停放的边角位置
                建设 3 台 10kW 小型直流风力发电系统，符合项目实际情况，同时满足项目示范的
                要求。
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <el-image class="w-260px h-48px" :src="analysis_b" fit="fill" />
              <div
                class="w-260px h-48px absolute top-0px left-0px px-16px flex items-center justify-center text-18px font-800">
                氢能发电系统
              </div>
            </div>
            <div class="relative">
              <el-image class="w-260px h-274px" :src="analysis_c" fit="fill" />
              <div class="w-260px h-274px absolute top-0px left-0px p-16px text-13px indent-8">
                本项目初步规划氢能利用形式为制-储-用综合利用，考虑当前阶段氢能利用产业
                的发展状况，后期可根据投资成本、应用市场前景等实际因素进行氢能利用规模调
                整。本方案拟设计的氢能发电系统配置 2Nm3
                /h 的高压碱性水电解制氢，配置 30kW
                的燃料电池模块，配置 100kWh 电堆调节储能锂电模块和 30kWPCS 变换装置，集成
                在一个集装箱内。
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <el-image class="w-260px h-48px" :src="analysis_b" fit="fill" />
              <div
                class="w-260px h-48px absolute top-0px left-0px px-16px flex items-center justify-center text-18px font-800">
                储能系统
              </div>
            </div>
            <div class="relative">
              <el-image class="w-260px h-274px" :src="analysis_c" fit="fill" />
              <div class="w-260px h-274px absolute top-0px left-0px p-16px text-13px indent-8">
                本项目综合考虑以光伏发电单元为主的分布式新能源各月份、各时段出力功率、
                发电量等因素，优化配置储能总建设规模为 2.25MW/4.365MWh。其中红格服务区
                系统内配置 1.35MW/2.43MWh 储能系统，红格收费站接入点处配置0.7MW/1.505MWh 储能系统，和收费站接入点处配置 0.2MW/0.43MWh 储能系统。
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
.wrap {
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
