<template>
  <el-tabs type="border-card" @tab-click="changeTabs">
    <el-tab-pane label="虚拟分类管理"><Virtual v-if="activeIndex === '0'" /></el-tab-pane>
    <el-tab-pane label="发布帮助管理"><Help v-if="activeIndex === '1'" /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Virtual from './virtual/index.vue'
import Help from './help/index.vue'

const activeIndex = ref('0')
const changeTabs = (val: IObj) => {
  activeIndex.value = val.index as string
}
</script>
