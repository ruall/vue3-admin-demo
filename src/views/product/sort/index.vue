<template>
  <el-button type="primary" @click="addSort">添加分类</el-button>
  <qp-table
    :loading="info.loading"
    :columns="info.columns"
    :table-data="info.tableData"
    :page-no="info.pageNo"
    :page-size="info.pageSize"
    :total-count="info.total"
    @handleCurrentChange="handleCurrentChange"
  >
    <template #name1>
      <el-table-column label="排序" align="left" width="120px">
        <template v-slot="scope">{{ scope.row.name1 }}</template>
      </el-table-column>
    </template>
    <template #name5>
      <el-table-column label="调整排序" align="center" width="200px">
        <template v-slot="scope">
          <el-button type="primary" size="small" v-if="scope.row.showSort && scope.row.id !== info.tableData[0].id">
            上移
          </el-button>
          <el-button
            type="primary"
            size="small"
            v-if="scope.row.showSort && scope.row.id !== info.tableData[info.tableData.length - 1].id"
          >
            下移
          </el-button>
        </template>
      </el-table-column>
    </template>
    <template #operate>
      <el-table-column label="操作" align="center" fixed="right" width="220px">
        <template #default="scope">
          <el-button type="primary" size="small">添加子分类</el-button>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </qp-table>
  <el-dialog v-model="info.dialogInfo.isVisible" width="45%" center :close-on-click-modal="false" :show-close="false">
    <el-form
      ref="ruleFormRef"
      :model="info.dialogInfo.formInfo"
      status-icon
      :rules="info.dialogInfo.rules"
      label-width="120px"
    >
      <el-form-item label="分类名称" prop="name1">
        <el-input v-model="info.dialogInfo.formInfo.name1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="name2">
        <el-radio-group v-model="info.dialogInfo.formInfo.name2">
          <el-radio :label="0">显示</el-radio>
          <el-radio :label="1">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.dialogInfo.isVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpTable } from '/@/components/index'
import { getDatas } from './index'
import { ref } from 'vue'

const { info, handleCurrentChange } = getDatas()
const ruleFormRef = ref<HTMLElement | null>(null)

const addSort = () => {
  info.dialogInfo.isVisible = true
}

const onSubmit = () => {
  ;(ruleFormRef.value as IObj).validate((valid: IObj) => {
    if (valid) {
      info.dialogInfo.isVisible = false
    }
  })
}
</script>
<style lang="scss" scoped>
.dialog-content {
  padding-right: 20px;
  height: 500px;
  overflow: auto;
}
</style>
