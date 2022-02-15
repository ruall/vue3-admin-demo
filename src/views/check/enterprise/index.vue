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
    <template #name4>
      <el-table-column label="企业类型" align="center">
        <template #default="scope">
          {{ scope.row.name4 === 0 ? '印花厂' : '造纸厂' }}
        </template>
      </el-table-column>
    </template>
    <template #name10>
      <el-table-column label="信息类型" align="center">
        <template #default="scope">
          {{ scope.row.name10 === 0 ? '申请入驻' : '申请修改' }}
        </template>
      </el-table-column>
    </template>
    <template #name11>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <span class="inline-block">{{ scope.row.name10 === 0 ? '已通过' : '已驳回' }}</span>
          <span class="inline-block cursor-pointer text-indigo-400" v-if="scope.row.name10 === 1" @click="reportInfo">
            驳回原因
          </span>
        </template>
      </el-table-column>
    </template>
    <template #operate>
      <el-table-column label="操作" align="center" fixed="right" width="300px">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">查看详情</el-button>
          <el-button type="success" size="small" v-if="scope.row.name10 === 0">审核通过</el-button>
          <el-button type="warning" size="small" v-if="scope.row.name10 === 0" @click="report(scope.row)">
            审核驳回
          </el-button>
          <el-button type="danger" size="small" v-if="scope.row.name10 === 1">删除</el-button>
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
  <el-dialog
    v-model="info.reportDialog.isVisible"
    title="审核驳回"
    width="40%"
    center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-input
      v-model="info.reportDialog.txt"
      type="textarea"
      max="100"
      :rows="5"
      show-word-limit
      placeholder="请输入驳回原因，限制100个字符。"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.reportDialog.isVisible = false">取消</el-button>
        <el-button type="primary" @click="info.reportDialog.isVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpSearch, qpTable } from '/@/components/index'
import { getDatas } from './index'
import dialogInfo from './dialogInfo/index.vue'
import { ref, nextTick } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

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

const report = (row: IObj) => {
  info.reportDialog.isVisible = true
}
const reportInfo = () => {
  ElMessageBox.alert('驳回原因驳回原因驳回原因驳回原因驳回原因', '驳回原因', {
    showCancelButton: false,
    showConfirmButton: false
  }).catch(() => {})
}
</script>
<style lang="scss" scoped>
.dialog-content {
  padding-right: 20px;
  height: 500px;
  overflow: auto;
}
</style>
