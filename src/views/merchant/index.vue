<template>
  <el-tabs type="border-card">
    <el-tab-pane label="入驻企业管理"><charmentList /></el-tab-pane>
    <el-tab-pane label="企业类型管理"><charmentType /></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import charmentList from './charmentList/index.vue'
import charmentType from './charmentType/index.vue'
</script>
