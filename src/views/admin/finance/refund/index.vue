<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('tui-kuan-ji-lu') }}</span>
        </div>
      </template>
      <qp-search
        :show-label="false"
        :data="searchData"
        @data-search="searchFun"
        showExport
        @data-export="exportExcels"
      ></qp-search>
      <qp-table
        :loading="loading"
        :columns="columns"
        :table-data="tableData"
        :page-no="pageNo"
        :page-size="pageSize"
        :total-count="total"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #amount>
          <el-table-column :label="$t('ding-dan-jin-e')" align="center">
            <template #default="scope">€ {{ scope.row.amount }}</template>
          </el-table-column>
        </template>
        <template #refundAmount>
          <el-table-column :label="$t('tui-kuan-jin-e')" align="center">
            <template #default="scope">€ {{ scope.row.refundAmount }}</template>
          </el-table-column>
        </template>
        <template #handleTime>
          <el-table-column :label="$t('tui-kuan-shi-jian')" align="center" width="170">
            <template #default="scope">
              {{ time(scope.row.handleTime) }}
            </template>
          </el-table-column>
        </template>
      </qp-table>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { refund } from './model/index'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const { refundList, getList, time, exportExcels } = refund()
    onMounted(() => {
      getList()
    })
    const handleCurrentChange = (val) => {
      refundList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      refundList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(refundList),
      getList,
      time,
      exportExcels,
      searchFun,
      handleCurrentChange
    }
  }
})
</script>
