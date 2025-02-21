<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-09 10:02:04
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-10 16:25:37
-->
<script setup name="App">
import { RouterLink, RouterView } from 'vue-router'
import autofit from 'autofit.js'
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import ProjectProfile from '@/views/project-profile/index.vue'
import CarbonReduction from '@/views/carbon-reduction/index.vue'
import CarbonEmission from '@/views/carbon-emission/index.vue'
import dayjs from 'dayjs';
import bg from '@/assets/bg.png'
const time = ref("")
const getTime = () => {
  time.value = dayjs().format(`YYYY-MM-DD     HH:mm:ss`)
}
const projectProfile = ref()
const carbonEmission = ref()
const carbonReduction = ref()
let lastTime = 0
const ani = () => {
  const now = Date.now()
  const dt = now - lastTime
  if (dt >= 1000) {
    // 每秒执行一次
    lastTime = now
    getTime()
    // 执行动画逻辑
  }
  requestAnimationFrame(() => {
    if (carousel.value?.activeIndex === 0) {
      projectProfile.value?.getViewer()?.update()
    } else if (carousel.value?.activeIndex === 1) {
      // carbonEmission.value?.getViewer()?.update()
    } else if (carousel.value?.activeIndex === 2) {
      // carbonReduction.value?.getViewer()?.update()
    }
    ani()
  })
}
ani()
const carousel = ref(null)
onMounted(() => {
  autofit.init({
    el: '.wrapfit',
    dw: 1440,
    dh: 780,
  })
})
onUnmounted(() => {
  autofit.off();
})



const goto = (value) => {
  carousel.value?.setActiveItem(value)
}

</script>

<template>
  <div class="h-100% wrapfit" id="wrapfit">
    <el-config-provider>
      <main class="relative overflow-hidden h-100% w-100%">
        <div id="container">
          <div class="w-100% h-64px relative">
            <el-image class="w-100% h-64px" :src="bg" fit="fill" />
            <div class="absolute left-0px top-0px h-64px pl-420px flex items-center">
              <el-space wrap :size="32">
                <el-button link class="btn_wrap" :class="{ 'is-active': carousel?.activeIndex === 0 }"
                  @click="goto(0)">项目简介</el-button>
                <el-button link class="btn_wrap" :class="{ 'is-active': carousel?.activeIndex === 1 }"
                  @click="goto(1)">碳排分析</el-button>
                <el-button link class="btn_wrap" :class="{ 'is-active': carousel?.activeIndex === 2 }"
                  @click="goto(2)">减碳分析</el-button>
              </el-space>
            </div>
            <div class="absolute right-10px top-0px w-180px h-64px text-16px font-800 flex items-center text-#fff">
              {{ time }}
            </div>
          </div>
          <div class="wrap">
            <el-carousel class="w-100%" :autoplay="false" ref="carousel" height="100%" arrow="never"
              indicator-position="none">
              <el-carousel-item>
                <ProjectProfile ref="projectProfile"></ProjectProfile>
              </el-carousel-item>
              <el-carousel-item>
                <CarbonEmission ref="carbonEmission"></CarbonEmission>
              </el-carousel-item>
              <el-carousel-item>
                <CarbonReduction ref="carbonReduction"></CarbonReduction>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </main>
    </el-config-provider>
  </div>
</template>

<style scoped lang="scss">
.wrapfit {
  width: 1440px;
  height: 780px;
}

#container {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(-90deg, #0e4036, #022d29);



  .wrap {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    position: relative;
    justify-content: space-between;
  }

  .btn_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #e4e4e4;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%, 0% 70%);
    width: 120px;
    height: 30px;
    border: 1px solid;
    background: linear-gradient(180deg, #01774f, #0c6037);
    border-image: linear-gradient(180deg, #51C4AD, #26958A) 1 1;

    &:hover {
      background: linear-gradient(180deg, #51C4AD, #26958A);
      border-image: linear-gradient(180deg, #01774f, #0c6037) 1 1;
    }

    &.is-active {
      color: #fff;
      background: linear-gradient(180deg, #51C4AD, #26958A);
      border-image: linear-gradient(180deg, #01774f, #0c6037) 1 1;
    }
  }
}
</style>
