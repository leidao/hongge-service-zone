<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-31 11:02:46
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-11 13:55:37
-->
<template>
  <main class="overflow-hidden w-100% h-100%">
    <div class="flex h-100% wrap relative" id="wrap">
      <div class="w-100% h-100% relative">
        <div class="absolute left-0px top-0px z-12 w-100% flex justify-center items-center">
          <div class="w-356px h-104px wrap_bg_title relative">
            <span class="absolute left-118px top-3px text-#6CFFCB text-18px font-700">日累计碳减排量</span>
            <div class="text-#fff text-52px absolute left-0px top-16px w-356px text-center">231,556</div>
            <div class="text-#fff text-14px absolute right-20px top-56px text-center">kgCO2</div>
          </div>
        </div>
        <Left></Left>
        <Right></Right>
        <div class="w-100% h-100% zone" ref="zone">
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Left from './left.vue'
import Right from './right.vue'

import { onMounted, onUnmounted, nextTick, ref, defineExpose, shallowRef } from 'vue';
import Viewer from './viewer'

import { elRectification } from "autofit.js";
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
    viewer.value = new Viewer(zone.value, 1332, 660)
    viewer.value.useOrbitControls()
    viewer.value.listen()
    viewer.value.loadServiceArea()
    // animation()
    // }, 7000)

  })

})

onUnmounted(() => {
  // cancelIdleCallback(id)
  viewer.value?.destroy()
})
</script>

<style lang="scss" scoped>
.wrap {
  background: url("https://imgservices-1252317822.image.myqcloud.com/coco/s04232024/682ad393.to0id6.jpg") 50% 0/auto 50%;
}

.wrap2 {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10;
  background: url('@/assets/zone/bg1.png');
  background-repeat: no-repeat;
  background-size: cover;



  .center {
    width: calc(100% - 640px);
  }
}

.wrap_bg_title {
  background: url('@/assets/carbon-reduction/title.png');
  background-repeat: no-repeat;
  background-size: cover;
}



.border {
  border: 1px solid #0db1bc;
}
</style>
