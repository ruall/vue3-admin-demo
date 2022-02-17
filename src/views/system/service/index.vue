<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="微信二维码" prop="name1">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name1" @file-change="onFileChange" />
    </el-form-item>
    <el-form-item label="微信号" prop="name2">
      <el-row>
        <el-col :span="24">
          <el-input
            class="w-auto"
            v-model="form.name2"
            placeholder="请输入微信号"
            clearable
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="手机号" prop="name3">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select v-model="form.name4">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <el-input v-model="form.name3" placeholder="请输入手机号" clearable maxlength="11" show-word-limit></el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="-ml-12 mt-4 w-24">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { getDatas } from './index'

export default defineComponent({
  setup() {
    const { form, options, onFileChange, rules } = getDatas()
    const onSubmit = () => {
      console.log('submit!')
    }
    return {
      form,
      onSubmit,
      onFileChange,
      rules,
      options
    }
  }
})
</script>
