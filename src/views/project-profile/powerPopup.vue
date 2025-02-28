<!--
 * @Description:
 * @Author: ldx
 * @Date: 2025-01-10 17:13:08
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 17:44:51
-->

<template>
  <div class="w-272px h-100px relative bg-transparent">
    <!-- <el-image class="w-272px h-100px absolute left-136px bottom-40px" :src="bg" fit="cover" /> -->
    <div class="absolute left-136px bottom-40px flex w-272px h-100px flex bg-transparent popup">
      <div class="w-80px h-100px bg-transparent"></div>
      <div class="w-190px h-100px bg-transparent">
        <div class="flex items-center h-32px">
          <el-image class="w-16px h-16px" :src="src" fit="cover" />
          <span class="ml-10px text-#FFFFFF text-14px font-700">{{ name }}</span>
        </div>
        <div class="h-68px px-20px pt-10px flex text-#FFFFFF justify-between text-center">
          <div>
            <div class="text-14px font-500">实时功率</div>
            <div class="text-12px">326
              <span class="text-14px"> MW</span>
            </div>
          </div>
          <div>
            <div class="text-14px font-500">额定功率</div>
            <div class="text-12px">680
              <span class="text-14px"> MW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, defineProps } from 'vue'
import bg from '@/assets/project-profile/bg.png'
import $Bus from "@/utils/eventBus";
defineProps({
  src: String,
  name: String
});



onMounted(() => {



})


</script>

<style lang="scss" scoped>
.popup {
  background-image: url('@/assets/project-profile/bg.png');
  background-size: cover;
  background-position: center;
}
</style>
