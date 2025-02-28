<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-31 11:02:46
 * @LastEditors: ldx
 * @LastEditTime: 2025-01-11 13:55:37
-->
<template>
  <main class="w-100% h-100% relative">
    <div class="w-100% h-100% z-10 zone" ref="zone"></div>
    <div class="absolute right-15px top-40px w-334px h-456px z-12">
      <el-image class="w-100% h-100%" :src="a1" fit="fill" />
      <div class="absolute left-60px right-10px top-10px text-16px font-700 text-#00FFCC">
        <span>关于红格服务区</span>
      </div>
      <div class="absolute left-0px top-57px px-16px">
        <el-image class="w-300px h-162px rounded-10px" :src="a2" fit="fill" />
        <div class="text-14px font-400 text-#DCFFF8 mt-8px indent-8">
          攀枝花市气候独特，属南亚热带亚湿润气候。具有夏季长、温度日变化大，四季不分明，降雨少而集中，日照多，太阳辐射强，气候垂直差。攀枝花所处的河谷地区比较温暖，年平均气温在19℃～21℃之间。全年无冬，最冷月的月平均气温也在10℃以上。夏季的气温却不高，最热月的月平均气温也不过26℃左右。这里降水
          10不多，云量少而光照充足，全年日照时数长达 2300h～2700h。
        </div>
      </div>
    </div>
    <div class="absolute left-15px right-15px bottom-20px h-160px z-12 flex justify-between">
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">低碳化</div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="b2" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            积极采用太阳能、风能等清洁能源替代传统能源，优化交通流线与车辆能源结构，以降低二氧化碳排放。
          </div>
        </div>
      </div>
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">节能化</div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="c1" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            选用高效节能设备，借助能源管理系统精细调控能源消耗，避免能源浪费，提高能源利用效率。
          </div>
        </div>
      </div>
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">智慧化</div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="d1" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            运用物联网、大数据、人工智能等技术搭建智能平台，实现设施设备的远程监控与智能运维、能源的精准管理与优化调度，提升整体运营效率和服务质量。
          </div>
        </div>
      </div>
      <div class="w-334px h-160px relative">
        <el-image class="w-100% h-100%" :src="b1" fit="fill" />
        <div class="absolute left-60px top-10px text-16px font-700 text-#00FFCC">循环化</div>
        <div class="absolute left-0px top-40px px-12px w-334px h-120px flex justify-between items-center">
          <el-image class="w-132px h-77px" :src="e1" fit="fill" />
          <div class="text-12px font-400 text-#DCFFF8 w-168px">
            污水经处理后回用于非饮用场景，构建水资源循环；对固体废弃物分类回收与处置，实现资源再生；将有机废弃物转化为能源和肥料。
          </div>
        </div>
      </div>
    </div>
    <div class="absolute left-15px top-40px w-234px h-42px z-12">
      <div class="w-234px h-42px flex items-center justify-center">
        <!-- <el-image class="w-100% h-100%" :src="b1" fit="fill" /> -->
        <el-tooltip class="box-item" effect="dark" content="旋转" placement="top" v-if="status !== '旋转'">
          <el-button :disabled="['光伏板', '风力发电', 'B区充电桩', 'A区充电桩'].includes(status) || disabled" color="#4a9391"
            :icon="VideoPlay" circle @click="startRotation" />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="暂停" placement="top" v-else>
          <el-button :disabled="['光伏板', '风力发电', 'B区充电桩', 'A区充电桩'].includes(status)" color="#4a9391" :icon="VideoPause"
            circle @click="stopRotation" />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="A区充电桩" placement="top">
          <el-button color="#4a9391" :disabled="['光伏板', '风力发电', 'B区充电桩'].includes(status) || disabled" circle
            @click="fly(status === 'A区充电桩' ? 'A区充电桩_返回' : 'A区充电桩')">
            <el-image class="w-18px h-18px" :src="status === 'A区充电桩' ? back : charging_pile" fit="fill" />
          </el-button>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="B区充电桩" placement="top">
          <el-button color="#4a9391" :disabled="['光伏板', '风力发电', 'A区充电桩'].includes(status) || disabled" circle
            @click="fly(status === 'B区充电桩' ? 'B区充电桩_返回' : 'B区充电桩')">
            <el-image class="w-18px h-18px" :src="status === 'B区充电桩' ? back : charging_pile" fit="fill" />
          </el-button>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="光伏板" placement="top">
          <el-button color="#4a9391" :disabled="['风力发电', 'B区充电桩', 'A区充电桩'].includes(status) || disabled" circle
            @click="fly(status === '光伏板' ? '光伏板_返回' : '光伏板')">
            <el-image class="w-18px h-18px" :src="status === '光伏板' ? back : solar_panel" fit="fill" />
          </el-button>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="风力发电" placement="top">
          <el-button color="#4a9391" :disabled="['光伏板', 'B区充电桩', 'A区充电桩'].includes(status) || disabled" circle
            @click="fly(status === '风力发电' ? '风力发电_返回' : '风力发电')">
            <el-image class="w-18px h-18px" :src="status === '风力发电' ? back : wind_turbine" fit="fill" />
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref, defineExpose, shallowRef } from 'vue'
import Viewer from './viewer'
import $Bus from '@/utils/eventBus'
import { elRectification } from 'autofit.js'
import a1 from '@/assets/project-profile/a1.png'
import a2 from '@/assets/project-profile/a2.png'
import b1 from '@/assets/project-profile/b1.png'
import b2 from '@/assets/project-profile/b2.png'
import c1 from '@/assets/project-profile/c1.png'
import d1 from '@/assets/project-profile/d1.png'
import e1 from '@/assets/project-profile/e1.png'
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import charging_pile from '/img/charging_pile.png'
import solar_panel from '/img/solar_panel.png'
import wind_turbine from '/img/wind_turbine.png'
import back from '/img/back.png'
import * as THREE from 'three'
const zone = ref()
const status = ref('旋转')
const disabled = ref(true)
const viewer = shallowRef()
const flyPaths = {
  '风力发电': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-22.38, 35.6, -36.49),
      new THREE.Vector3(1.68, 21.2, 5.56)
    ]),
    startLookAt: new THREE.Vector3(0, 0, 0),
    endLookAt: new THREE.Vector3(-2, 7, -12)
  },
  '风力发电_返回': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.68, 21.2, 5.56),
      new THREE.Vector3(-22.38, 35.6, -36.49),
    ]),
    endLookAt: new THREE.Vector3(0, 0, 0),
    startLookAt: new THREE.Vector3(-2, 7, -12)
  },
  'B区充电桩': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-22.38, 35.6, -36.49),
      new THREE.Vector3(20, 3, -13),
    ]),
    startLookAt: new THREE.Vector3(8.2, 15.2, -11.56),
    endLookAt: new THREE.Vector3(18, 1.6, -7.4)
  },
  'B区充电桩_返回': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(20, 3, -13),
      new THREE.Vector3(-22.38, 35.6, -36.49),
    ]),
    startLookAt: new THREE.Vector3(20, 1.6, -9.4),
    endLookAt: new THREE.Vector3(0, 0, 0)
  },
  'A区充电桩': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-22.38, 35.6, -36.49),
      new THREE.Vector3(25, 3, 9),
    ]),
    startLookAt: new THREE.Vector3(0, 0, 0),
    endLookAt: new THREE.Vector3(22, 1.6, 17.4)
  },
  'A区充电桩_返回': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(25, 3, 9),
      new THREE.Vector3(-22.38, 35.6, -36.49),
    ]),
    endLookAt: new THREE.Vector3(0, 0, 0),
    startLookAt: new THREE.Vector3(22, 1.6, 17.4)
  },
  '光伏板': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(-22.38, 35.6, -36.49),
      new THREE.Vector3(5, 6, 4),
    ]),
    startLookAt: new THREE.Vector3(0, 0, 0),
    endLookAt: new THREE.Vector3(-4, 1.6, 6.4)
  },
  '光伏板_返回': {
    path: new THREE.CatmullRomCurve3([
      new THREE.Vector3(5, 6, 4),
      new THREE.Vector3(-22.38, 35.6, -36.49),
    ]),
    startLookAt: new THREE.Vector3(-4, 1.6, 6.4),
    endLookAt: new THREE.Vector3(0, 0, 0),
  }
}
// const flyPaths = {
//   '风力发电': {
//     path: [
//       new THREE.Vector3(-22.38, 35.6, -36.49),
//       new THREE.Vector3(1.68, 21.2, 5.56),
//     ],
//     // path: new THREE.CatmullRomCurve3([
//     //   new THREE.Vector3(-22.38, 35.6, -36.49),
//     //   new THREE.Vector3(-18.68, 32.2, -9.56),
//     //   new THREE.Vector3(3.68, 28.2, 12.56),
//     //   new THREE.Vector3(1.68, 21.2, 5.56),
//     // ]),
//     startLookAt: new THREE.Vector3(0, 0, 0),
//     endLookAt: new THREE.Vector3(-2, 7, -12)
//   },
//   'B区充电桩': {
//     path: [
//       new THREE.Vector3(-22.38, 35.6, -36.49),
//       new THREE.Vector3(20, 3, -13),
//     ],
//     // path: new THREE.CatmullRomCurve3([
//     //   new THREE.Vector3(-22.38, 35.6, -36.49),
//     //   new THREE.Vector3(8.68, 18.2, -20.56),
//     //   new THREE.Vector3(23.2, 5.2, -15.56),
//     //   new THREE.Vector3(20, 3, -13),
//     // ]),
//     startLookAt: new THREE.Vector3(8.2, 15.2, -11.56),
//     endLookAt: new THREE.Vector3(20, 1.6, -9.4)
//   },
//   'A区充电桩': {
//     path: [
//       new THREE.Vector3(-22.38, 35.6, -36.49),
//       new THREE.Vector3(25, 3, 9),
//     ],
//     // path: new THREE.CatmullRomCurve3([
//     //   new THREE.Vector3(-22.38, 35.6, -36.49),
//     //   new THREE.Vector3(11.68, 18.2, -5.56),
//     //   new THREE.Vector3(32.2, 8.2, 4.56),
//     //   new THREE.Vector3(25, 3, 9),
//     // ]),
//     startLookAt: new THREE.Vector3(0, 0, 0),
//     endLookAt: new THREE.Vector3(22, 1.6, 17.4)
//   },
//   '光伏板': {
//     path: [
//       new THREE.Vector3(-22.38, 35.6, -36.49),
//       new THREE.Vector3(5, 6, 4)
//     ],
//     // path: new THREE.CatmullRomCurve3([
//     //   new THREE.Vector3(-22.38, 35.6, -36.49),
//     //   new THREE.Vector3(10.68, 18.2, -1.56),
//     //   new THREE.Vector3(7.2, 8.2, 4.56),
//     //   new THREE.Vector3(5, 6, 4),
//     // ]),
//     startLookAt: new THREE.Vector3(0, 0, 0),
//     endLookAt: new THREE.Vector3(-4, 1.6, 6.4)
//   }
// }
const getViewer = () => {
  return viewer.value
}

defineExpose({
  getViewer,
})

onMounted(() => {
  nextTick(() => {
    elRectification('.zone')
    viewer.value = new Viewer(zone.value)
    viewer.value.useOrbitControls()
    viewer.value.listen()
    viewer.value.loadServiceArea()
  })
  $Bus.on('fly', (flag) => {
    disabled.value = flag
  })
})



const startRotation = () => {
  viewer.value?.startRotation()
  status.value = '旋转'
  disabled.value = true
}

const stopRotation = () => {
  viewer.value?.stopRotation()
  status.value = '暂停'
  disabled.value = false
}

const fly = (type) => {
  const flyPath = flyPaths[type]
  status.value = type
  disabled.value = true
  viewer.value?.fly(flyPath, type)
}

onUnmounted(() => {
  viewer.value?.destroy()
})
</script>

<style lang="scss" scoped></style>
