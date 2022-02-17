<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="企业名称" prop="name1">
      <el-input v-model="form.name1" placeholder="请输入企业名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="企业Logo">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name2" @file-change="onFileChange1" />
    </el-form-item>
    <el-form-item label="企业类型" prop="name3">
      <el-select v-model="form.name3" placeholder="请选择企业类型" clearable>
        <el-option
          v-for="(item, index) in info.name3Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主营类目">
      <el-cascader :options="info.name4Options" :props="cascaderProps" clearable />
    </el-form-item>
    <el-form-item label="企业所在地">
      <el-select v-model="form.name5" placeholder="请选择企业所在地" clearable>
        <el-option
          v-for="(item, index) in info.name5Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="企业地址">
      <el-input v-model="form.name6" placeholder="请输入企业地址" clearable></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.name7" placeholder="请输入企业介绍" clearable></el-input>
    </el-form-item>
    <el-form-item label="企业相册">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name2" @file-change="onFileChange1" />
    </el-form-item>
    <el-form-item label="企业印章">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name2" @file-change="onFileChange1" />
    </el-form-item>
    <el-form-item label="企业视频">
      <qp-uploader
        fileType="file"
        placeholder="只能上传视频格式"
        ref="logoRef"
        :file-list="form.name2"
        @file-change="onFileChange1"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { getDatas } from './index'

export default defineComponent({
  setup() {
    const { form, info, cascaderProps, onFileChange1, rules } = getDatas()
    const submit = () => {
      console.log('submit!')
    }
    const cancel = () => {
      console.log('cancel!')
    }
    return {
      form,
      info,
      cascaderProps,
      onFileChange1,
      rules,
      submit,
      cancel
    }
  }
})
</script>
