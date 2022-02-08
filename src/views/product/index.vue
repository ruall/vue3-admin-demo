<template>
  <el-tabs type="border-card" @tab-click="changeTabs">
    <el-tab-pane label="出售信息管理"><Sell v-if="activeIndex === '0'" /></el-tab-pane>
    <el-tab-pane label="求购信息管理"><Buy v-if="activeIndex === '1'" /></el-tab-pane>
    <el-tab-pane label="商品分类管理"><Sort v-if="activeIndex === '2'" /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Sell from './sell/index.vue'
import Buy from './buy/index.vue'
import Sort from './sort/index.vue'

const activeIndex = ref('0')
const changeTabs = (val: IObj) => {
  activeIndex.value = val.index as string
}
</script>
