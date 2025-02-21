<!--
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-23 13:39:26
 * @LastEditors: ldx
 * @LastEditTime: 2024-12-31 15:33:00
-->
<script setup lang="ts">

import { nextTick, onMounted, onUnmounted } from 'vue';
import home_a from '@/assets/home/a.png'



const tableData = [
  {
    id: 1,
    rowspan: 3,
    a: '热传导系数 (U 值)',
    b: '屋顶材料的热传导性能',
    c: '0.20 W/m²·K',
    d: '≤ 0.20 W/m²·K',
  },
  {
    id: 2,
    rowspan: 0,
    a: '热传导系数 (U 值)',
    b: '绝缘材料的导热率',
    c: '0.035 W/m·K',
    d: '≤ 0.035 W/m·K',
  },
  {
    id: 3,
    rowspan: 0,
    a: '热传导系数 (U 值)',
    b: '屋顶表面的太阳反射率',
    c: '0.70',
    d: '≥ 0.70',
  },
  {
    id: 4,
    rowspan: 2,
    a: '反射与辐射指标',
    b: '太阳反射率 (SR)',
    c: '0.75',
    d: '≥ 0.75',
  },
  {
    id: 5,
    rowspan: 0,
    a: '反射与辐射指标',
    b: '热辐射损失系数 (LR)',
    c: '0.25',
    d: '≤ 0.25',
  },
  {
    id: 6,
    rowspan: 2,
    a: '生态设计指标',
    b: '绿化屋顶植被覆盖率',
    c: '50%',
    d: '≥ 50%',
  },
  {
    id: 7,
    rowspan: 0,
    a: '生态设计指标',
    b: '持水能力',
    c: '30 L/m²',
    d: '≥ 30 L/m²',
  },
  {
    id: 8,
    rowspan: 2,
    a: '抗风能力数值',
    b: '风压抗力 (设计风压)',
    c: '2.0 kPa',
    d: '≥ 2.0 kPa',
  },
  {
    id: 9,
    rowspan: 0,
    a: '抗风能力数值',
    b: '抗震等级',
    c: '3 级',
    d: '≥ 3 级',
  },
  {
    id: 10,
    rowspan: 3,
    a: '热容量',
    b: '比热容',
    c: '1000 J/kg·K',
    d: '≥ 1000 J/kg·K',
  },
  {
    id: 11,
    rowspan: 0,
    a: '热容量',
    b: '储热能力',
    c: '1500 J/m²·K',
    d: '≥ 1500 J/m²·K',
  },
  {
    id: 12,
    rowspan: 0,
    a: '热容量',
    b: '热容量变化系数',
    c: '0.1',
    d: '≤ 0.1',
  },
]
const objectSpanMethod = ({
  row,
  columnIndex,
}: any) => {
  if (columnIndex === 1) {
    return {
      rowspan: row.rowspan,
      colspan: 1,
    }
  }
}
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
            能耗指标
          </div>
        </div>
      </div>
      <div class="ml-80px flex items-center">
        <div>
          <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 860px">
            <el-table-column prop="id" label="序号" width="100" align="center" />
            <el-table-column prop="a" label="类别" align="center" />
            <el-table-column prop="b" label="内容" align="center" />
            <el-table-column prop="c" label="数值" align="center" />
            <el-table-column prop="d" label="标准要求" align="center" />
          </el-table>
        </div>
        <div class="ml-20px">
          <div>
            <div class="text-28px text-#1f394e">满足标准:</div>
            <div class="text-16px text-#3a446d ml-20px">
              <div>1.遵循建筑节能规范</div>
              <div>2.材料选择合规</div>
              <div>3.定期审查与更新</div>
            </div>
          </div>
          <div class="mt-20px">
            <div class="text-28px text-#1f394e">目标:</div>
            <div class="text-16px text-#3a446d ml-20px">
              <div>1.实现运行阶段碳中和</div>
            </div>
          </div>
          <div class="mt-20px">
            <div class="text-28px text-#1f394e">计算:</div>
            <div class="text-16px text-#3a446d ml-20px">
              <div>1.能量平衡计算</div>
              <div>2.热负荷分析</div>
              <div>3.经济效益评估</div>
            </div>
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
