<template>
  <qp-table :loading="info.loading" :columns="info.columns" :table-data="info.tableData" :showPage="false">
    <template #operate>
      <el-table-column label="操作" align="center" fixed="right" width="200px">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.name2)">编辑</el-button>
        </template>
      </el-table-column>
    </template>
  </qp-table>
  <el-dialog
    v-model="info.editDialog.isVisible"
    width="60%"
    top="2%"
    center
    :title="info.editDialog.title"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <qp-editor v-model="info.editDialog.content" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.editDialog.isVisible = false">取消</el-button>
        <el-button type="primary" @click="info.editDialog.isVisible = false">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpTable, qpEditor } from '/@/components/index'
import { getDatas } from './index'

const { info, getList } = getDatas()

const edit = (title: string) => {
  info.editDialog.isVisible = true
  info.editDialog.title = title
}
</script>
<style lang="scss" scoped>
.dialog-content {
  padding-right: 20px;
  height: 500px;
  overflow: auto;
}
</style>
