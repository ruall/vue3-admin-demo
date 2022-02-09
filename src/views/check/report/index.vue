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
    <template #name8>
      <el-table-column label="举报类型" align="center">
        <template #default="scope">
          {{ scope.row.name8 === 0 ? '动态' : '用户' }}
        </template>
      </el-table-column>
    </template>
    <template #name9>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          {{ scope.row.name9 === 0 ? '未处理' : '已处理' }}
        </template>
      </el-table-column>
    </template>
    <template #operate>
      <el-table-column label="操作" align="center" fixed="right" width="200px">
        <template #default="scope">
          <el-button type="primary" size="small">标记</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </qp-table>
</template>
<script setup lang="ts">
import { qpSearch, qpTable } from '/@/components/index'
import { getDatas } from './index'

const { info, searchFun, handleCurrentChange, getList } = getDatas()
</script>
<style lang="scss" scoped>
.dialog-content {
  padding-right: 20px;
  height: 500px;
  overflow: auto;
}
</style>
