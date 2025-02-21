<template>
    <div class="backdrop h-100%">
        <div class="flex justify-between items-center mb-6px">
            <span class="text-#BBBAB5 text-8px">{{ unit }}</span>
            <span class="text-#97FFDB text-10px">{{ title }}</span>
            <Buttons :buttons="buttons" @click="handleClick" />
        </div>
        <div class="relative" style="height: calc(100% - 20px);">
            <div class="text-#BBBAB5 text-8px w-10px text-right" v-for="(item, index) in 5" :key="index"
                :style="{ marginLeft: `${item * skew}px`, marginBottom: item === 5 ? '14px' : '12px' }">{{
                    (props.max / 4) * (4 - index) }}
            </div>
            <div class="absolute left-0px top-0px w-full h-full">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import Buttons from '@/components/buttons/index.vue'
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
    max: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    buttons: {
        type: Array,
        required: true
    },
    skew: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['click'])
const handleClick = (item) => {
    emit('click', item)
}

</script>

<style lang="scss" scoped></style>
