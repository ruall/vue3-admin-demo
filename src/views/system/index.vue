<template>
  <el-tabs type="border-card" @tab-click="changeTabs">
    <el-tab-pane label="城市区域设置"><City v-if="activeIndex === '0'" /></el-tab-pane>
    <el-tab-pane label="启动页设置"><Page v-if="activeIndex === '1'" /></el-tab-pane>
    <el-tab-pane label="客服信息设置"><Service v-if="activeIndex === '2'" /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import City from './city/index.vue'
import Page from './page/index.vue'
import Service from './service/index.vue'

const activeIndex = ref('0')
const changeTabs = (val: IObj) => {
  activeIndex.value = val.index as string
}
</script>
