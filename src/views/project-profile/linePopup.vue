<!--
 * @Description:
 * @Author: ldx
 * @Date: 2025-01-10 17:13:08
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 17:44:51
-->

<template>
  <div class="w-214px h-59px relative bg-transparent">
    <!-- <el-image class="w-272px h-100px absolute left-136px bottom-40px" :src="bg" fit="cover" /> -->
    <div class="absolute left-106px bottom-30px flex w-214px h-59px flex bg-transparent popup">
      <div class="w-54px h-59px bg-transparent"></div>
      <div class="w-160px h-59px bg-transparent">
        <div class="px-12px pt-14px flex text-#FFFFFF justify-between text-center whitespace-nowrap">
          <span class="text-12px flex items-center font-600">碳排放量</span>
          <span class="flex items-center">
            <span class="text-14px font-800 flex items-center">3261</span>
            <span class="text-12px flex items-center"> kgCO2</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, defineProps } from 'vue'
import bg from '@/assets/project-profile/bg.png'
defineProps({
  src: String,
  name: String
});



onMounted(() => {



})


</script>

<style lang="scss" scoped>
.popup {
  background-image: url('@/assets/project-profile/a3.png');
  background-size: cover;
  background-position: center;
}
</style>
