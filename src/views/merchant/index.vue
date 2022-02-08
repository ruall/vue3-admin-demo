<template>
  <el-tabs type="border-card" @tab-click="changeTabs">
    <el-tab-pane label="入驻企业管理"><charmentList v-if="activeIndex === '0'" /></el-tab-pane>
    <el-tab-pane label="企业类型管理"><charmentType v-if="activeIndex === '1'" /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import charmentList from './charmentList/index.vue'
import charmentType from './charmentType/index.vue'

const activeIndex = ref<string>('0')
const changeTabs = (val: IObj) => {
  activeIndex.value = val.index as string
}
</script>
