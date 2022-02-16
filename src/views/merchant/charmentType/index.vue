<template>
  <el-button type="primary">添加类型</el-button>
  <qp-table
    :loading="info.loading"
    :columns="info.columns"
    :table-data="info.tableData"
    :page-no="info.pageNo"
    :page-size="info.pageSize"
    :total-count="info.total"
    @handleCurrentChange="handleCurrentChange"
  >
    <template #operate>
      <el-table-column label="操作" align="center" fixed="right" width="220px">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </template>
  </qp-table>
  <el-dialog v-model="info.dialogInfo.isVisible" width="50%" center :close-on-click-modal="false" :show-close="false">
    <el-form
      ref="ruleFormRef"
      :model="info.dialogInfo.ruleForm"
      status-icon
      :rules="info.dialogInfo.rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="排序">
        <el-input
          v-model="info.dialogInfo.ruleForm.name1"
          v-input-number="{ min: 0, max: 10 }"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类名称" prop="name2">
        <el-input v-model="info.dialogInfo.ruleForm.name2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="name3">
        <el-radio-group v-model="info.dialogInfo.ruleForm.name3">
          <el-radio label="0">显示</el-radio>
          <el-radio label="1">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.dialogInfo.isVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpTable } from '/@/components/index'
import { getDatas } from './index'
import { ref } from 'vue'

const { info, handleCurrentChange, getList } = getDatas()
const ruleFormRef = ref<HTMLElement | null>(null)

const edit = (row: IObj) => {
  info.dialogInfo.isVisible = true
}

const submitForm = () => {
  ;(ruleFormRef.value as IObj).validate((valid: IObj) => {
    if (valid) {
      info.dialogInfo.isVisible = false
    }
  })
}
const resetForm = () => {}
</script>
