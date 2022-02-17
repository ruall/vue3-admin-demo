<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="信息标题" prop="name1">
      <el-input v-model="form.name1" placeholder="请输入动态标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="信息详情" prop="name2">
      <el-input v-model="form.name2" placeholder="请输入动态详情" type="textarea" :rows="3" clearable></el-input>
    </el-form-item>
    <el-form-item label="信息类型" prop="name3">
      <el-select v-model="form.name3" placeholder="请选择动态分类" clearable>
        <el-option
          v-for="(item, index) in info.name1Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="月薪">
      <el-input v-model="form.name4[0]" placeholder="最低月薪" clearable class="w-1/5"></el-input>
      <span class="px-2">至</span>
      <el-input v-model="form.name4[1]" placeholder="最高月薪" clearable class="w-1/5"></el-input>
      <span class="text-xs text-gray-400">（未填写月薪则默认为面议）</span>
    </el-form-item>
    <el-form-item label="信息图片">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name5" @file-change="onFileChange1" />
    </el-form-item>
    <el-form-item label="发布城市" prop="name6">
      <el-select v-model="form.name6" placeholder="请选择发布城市" clearable>
        <el-option
          v-for="(item, index) in info.name2Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话" prop="name7">
      <el-input v-model="form.name7" placeholder="请输入联系电话" clearable></el-input>
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
