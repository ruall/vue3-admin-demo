<template>
  <qp-search :show-label="false" showReset :data="info.searchData" @data-search="searchFun"></qp-search>
  <qp-table
    :loading="info.loading"
    :columns="info.columns"
    :table-data="info.tableData"
    :page-no="info.pageNo"
    :page-size="info.pageSize"
    :total-count="info.total"
    @handleCurrentChange="info.handleCurrentChange"
  >
    <template #operate>
      <el-table-column label="操作" align="center" fixed="right" width="220px">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small">禁用</el-button>
          <el-button type="warning" size="small">解除</el-button>
        </template>
      </el-table-column>
    </template>
  </qp-table>
  <el-dialog v-model="info.dialogInfo.isVisible" title="编辑" width="70%" center>
    <div class="dialog-content"><dialogInfo ref="dialogRef" /></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel()">取消</el-button>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpSearch, qpTable } from '/@/components/index'
import { getDatas } from './index'
import dialogInfo from './dialogInfo/index.vue'
import { ref, nextTick } from 'vue'

const { info, searchFun } = getDatas()
const dialogRef = ref<HTMLElement | null>(null)

const edit = (row: IObj) => {
  info.dialogInfo.isVisible = true
}

const onCancel = () => {
  nextTick(() => {
    ;(dialogRef.value as IObj)?.cancel()
  })
}
const onSubmit = () => {
  nextTick(() => {
    ;(dialogRef.value as IObj)?.submit()
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
