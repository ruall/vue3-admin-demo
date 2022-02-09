<template>
  <el-tabs type="border-card" @tab-click="changeTabs">
    <el-tab-pane label="申请入驻企业列表"><Enterprise v-if="activeIndex === '0'" /></el-tab-pane>
    <el-tab-pane label="举报列表"><Report v-if="activeIndex === '1'" /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Enterprise from './enterprise/index.vue'
import Report from './report/index.vue'

const activeIndex = ref('0')
const changeTabs = (val: IObj) => {
  activeIndex.value = val.index as string
}
</script>
