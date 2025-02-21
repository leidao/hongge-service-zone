<template>
    <div class="button-group">
        <el-button v-for="(item, index) in buttons" :key="index" size="small"
            :class="['custom-button', { active: activeButton === item.value }]" @click="handleClick(item.value)">
            {{ item.label }}
        </el-button>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
    buttons: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['click'])

const activeButton = ref(props.buttons[0].value)

const handleClick = (value) => {
    activeButton.value = value
    emit('click', value)
}

</script>

<style lang="scss" scoped>
.button-group {
    height: 20px;
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    padding: 2px;
    border-radius: 22px;
    // gap: 4px;
    border: 1px solid #97FFDB;

    ::v-deep(.el-button) {
        padding: 0px 8px;
        height: 14px;
    }
}

.custom-button {
    background: transparent;
    border: none;
    color: #fff;
    border-radius: 16px;
    font-size: 10px;
    font-weight: 700;
}

.custom-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
}

.custom-button.active {
    background: #67C23A;
    color: #fff;
}

.custom-button.active:hover {
    background: #67C23A;
    opacity: 0.9;
}

.el-button+.el-button {
    margin-left: 2px !important;
}
</style>