<template>
  <el-tabs type="border-card">
    <el-tab-pane label="用户列表">
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
        <template #name8>
          <el-table-column label="状态" align="center" width="120px">
            <template v-slot="scope">{{ scope.row.name8 === 0 ? '启用中' : '禁用中' }}</template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column label="操作" align="center" fixed="right" width="220px">
            <template #default="scope">
              <el-button
                :type="scope.row.name8 === 0 ? 'danger' : 'primary'"
                size="small"
                @click="changeType(scope.row.name8)"
              >
                {{ scope.row.name8 === 0 ? '封禁' : '启用' }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { qpSearch, qpTable } from '/@/components/index'
import { getDatas } from './index'
import { ElMessageBox, ElMessage } from 'element-plus'

const { info, searchFun, handleCurrentChange } = getDatas()

const changeType = (type: number) => {
  let txt
  if (type === 0) {
    txt = '确定要封禁该用户吗？封禁之后用户将无法发布/编辑商品信息、求购信息、动态、求职招聘，并无法回复以及聊天'
  } else {
    txt = '确定要启用该用户吗？'
  }
  ElMessageBox.confirm(txt, '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '处理成功'
      })
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
.dialog-content {
  padding-right: 20px;
  height: 500px;
  overflow: auto;
}
</style>
