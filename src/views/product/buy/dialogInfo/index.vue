<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="商品标题" prop="name1">
      <el-input v-model="form.name1" placeholder="请输入企业名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="商品类目" prop="name2">
      <el-cascader v-model="form.name2" :options="info.name2Options" :props="cascaderProps" clearable />
    </el-form-item>
    <el-form-item label="价格" prop="name3">
      <el-input v-model="form.name3[0]" placeholder="最低价格" clearable class="w-1/5"></el-input>
      <span class="px-2">至</span>
      <el-input v-model="form.name3[1]" placeholder="最高价格" clearable class="w-1/5"></el-input>
      <span class="text-xs text-gray-400">（未填写价格则默认为面议）</span>
    </el-form-item>
    <el-form-item label="数量" prop="name4">
      <el-input v-model="form.name4[0]" placeholder="最低数量" clearable class="w-1/5"></el-input>
      <span class="px-2">至</span>
      <el-input v-model="form.name4[1]" placeholder="最高数量" clearable class="w-1/5"></el-input>
    </el-form-item>
    <el-form-item label="起订量" prop="name5">
      <el-input v-model="form.name5" placeholder="请输入起订量" clearable></el-input>
    </el-form-item>
    <el-form-item label="商品单位">
      <el-select v-model="form.name6" placeholder="请选择商品单位" clearable>
        <el-option
          v-for="(item, index) in info.name1Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发布城市">
      <el-select v-model="form.name7" placeholder="请选择发布城市" clearable>
        <el-option
          v-for="(item, index) in info.name1Options"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品详情" prop="name11">
      <el-input v-model="form.name11" placeholder="请输入商品详情" type="textarea" :rows="3" clearable></el-input>
    </el-form-item>
    <el-form-item label="商品照片" prop="name7">
      <qp-uploader fileType="image" ref="logoRef" :file-list="form.name7" @file-change="onFileChange1" />
    </el-form-item>
    <el-form-item label="联系电话" prop="name9">
      <el-input v-model="form.name9" placeholder="请输入联系电话" clearable></el-input>
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
