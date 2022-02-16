<template>
  <el-row :gutter="20" class="mb-4" v-for="item in info.class" :key="item.id">
    <el-col :span="8"><el-input type="primary" v-model="item.name" placeholder="请输入虚拟分类名称" /></el-col>
    <el-col :span="4"><el-button type="primary" @click="chooseMerchandise">选择数据</el-button></el-col>
  </el-row>
  <el-button type="primary" class="w-24 mt-4">提交</el-button>

  <el-dialog
    v-model="info.merchandiseDialog.isVisible"
    width="60%"
    center
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-button type="primary" class="mb-4" @click="merchandiseList">选择商品</el-button>
    <div>
      <span class="mr-4 mb-4 border inline-flex close">
        <el-icon class="el-icon-close" @click="del"></el-icon>
        <el-image style="width: 100px; height: 100px" :fit="'cover'"></el-image>
      </span>
      <span class="mr-4 mb-4 border inline-flex close">
        <el-icon class="el-icon-close"></el-icon>
        <el-image style="width: 100px; height: 100px" :fit="'cover'"></el-image>
      </span>
      <span class="mr-4 mb-4 border inline-flex close">
        <el-icon class="el-icon-close"></el-icon>
        <el-image style="width: 100px; height: 100px" :fit="'cover'"></el-image>
      </span>
      <span class="mr-4 mb-4 border inline-flex close">
        <el-icon class="el-icon-close"></el-icon>
        <el-image style="width: 100px; height: 100px" :fit="'cover'"></el-image>
      </span>
      <span class="mr-4 mb-4 border inline-flex close">
        <el-icon class="el-icon-close"></el-icon>
        <el-image style="width: 100px; height: 100px" :fit="'cover'"></el-image>
      </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.merchandiseDialog.isVisible = false">返回</el-button>
        <el-button type="primary" @click="info.merchandiseDialog.isVisible = false">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="info.merchandiseListDialog.isVisible" width="60%" center :close-on-click-modal="false">
    <qp-search
      :show-label="false"
      showReset
      :data="info.merchandiseListDialog.searchData"
      @data-search="searchFun"
    ></qp-search>
    <qp-table
      :loading="info.merchandiseListDialog.loading"
      :columns="info.merchandiseListDialog.columns"
      :table-data="info.merchandiseListDialog.tableData"
      :page-no="info.merchandiseListDialog.pageNo"
      :page-size="info.merchandiseListDialog.pageSize"
      :total-count="info.merchandiseListDialog.total"
      @handleCurrentChange="handleCurrentChange"
    >
      <template #operate>
        <el-table-column label="操作" align="center" fixed="right" width="200px">
          <template #default="scope">
            <el-button :type="scope.row.name7 === 0 ? 'primary' : ''" size="small">
              {{ scope.row.name7 === 0 ? '选择' : '取消选择' }}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </qp-table>
  </el-dialog>
</template>
<script setup lang="ts">
import { qpSearch, qpTable } from '/@/components/index'
import { getDatas } from './index'

const { info, getList, handleCurrentChange, searchFun } = getDatas()

const chooseMerchandise = () => {
  info.merchandiseDialog.isVisible = true
}

const del = () => {}

const merchandiseList = () => {
  info.merchandiseListDialog.isVisible = true
}
</script>
<style lang="scss" scoped>
.close {
  cursor: pointer;
  position: relative;
  .el-icon {
    display: none;
  }
  &:hover {
    .el-icon {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      z-index: 9;
    }
  }
}
</style>
