<template>
  <el-tabs type="border-card" @tab-click="changeTabs">
    <el-tab-pane label="动态信息管理"><Info v-if="activeIndex === '0'" /></el-tab-pane>
    <el-tab-pane label="求职招聘管理"><Job v-if="activeIndex === '1'" /></el-tab-pane>
    <el-tab-pane label="动态分类管理"><Class v-if="activeIndex === '2'" /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Info from './info/index.vue'
import Job from './job/index.vue'
import Class from './class/index.vue'

const activeIndex = ref('0')
const changeTabs = (val: IObj) => {
  activeIndex.value = val.index as string
}
</script>
