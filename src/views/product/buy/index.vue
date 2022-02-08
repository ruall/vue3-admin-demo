<template>
  <qp-search :show-label="false" showReset :data="info.searchData" @data-search="searchFun"></qp-search>
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
          <el-button type="success" size="small" @click="top">置顶</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </qp-table>
  <el-dialog v-model="info.dialogInfo.isVisible" width="70%" center>
    <div class="dialog-content"><dialogInfo ref="dialogRef" /></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel()">取消</el-button>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="info.top.isVisible" title="请选择置顶时间" width="45%" center>
    <el-radio-group v-model="info.top.time">
      <el-radio :label="0">24小时</el-radio>
      <el-radio :label="1">
        自定义
        <el-input class="w-2/5" v-model="info.top.inputTxt" />
        小时
      </el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.top.isVisibl = false">取消</el-button>
        <el-button type="primary" @click="info.top.isVisibl = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpSearch, qpTable } from '/@/components/index'
import { getDatas } from './index'
import dialogInfo from './dialogInfo/index.vue'
import { ref, nextTick } from 'vue'

const { info, searchFun, handleCurrentChange, getList } = getDatas()
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

const top = () => {
  info.top.isVisible = true
}
</script>
<style lang="scss" scoped>
.dialog-content {
  padding-right: 20px;
  height: 500px;
  overflow: auto;
}
</style>
