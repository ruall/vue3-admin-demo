<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="动态标题" prop="name1">
      <el-input v-model="form.name1" placeholder="请输入动态标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="动态详情" prop="name2">
      <el-input v-model="form.name2" placeholder="请输入动态详情" type="textarea" :rows="3" clearable></el-input>
    </el-form-item>
    <el-form-item label="动态分类">
      <el-select v-model="form.name3" placeholder="请选择动态分类" clearable>
        <el-option
          v-for="(item, index) in info.name1Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="动态图片" prop="name4">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name4" @file-change="onFileChange1" />
    </el-form-item>
    <el-form-item label="发布城市">
      <el-select v-model="form.name5" placeholder="请选择发布城市" clearable>
        <el-option
          v-for="(item, index) in info.name2Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否匿名">
      <el-radio-group v-model="form.name6">
        <el-radio label="0">是</el-radio>
        <el-radio label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { getDatas } from './index'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { form, info, onFileChange1, rules } = getDatas()
    const submit = () => {
      console.log('submit!')
    }
    const cancel = () => {
      console.log('cancel!')
    }
    return {
      form,
      info,
      onFileChange1,
      rules,
      submit,
      cancel
    }
  }
})
</script>
