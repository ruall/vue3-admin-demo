<template>
  <span class="text-xs inline-block text-yellow-500 mb-4">推荐尺寸：1242*2208</span>
  <qp-uploader fileType="image" ref="logoRef" :file-list="pageInfo.img" @file-change="onFileChange" />
  <el-button class="mt-4" type="primary">提交</el-button>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { qpUploader } from '/@/components'

const pageInfo: IObj = reactive({
  img: ''
})

const onFileChange = () => {}
</script>
