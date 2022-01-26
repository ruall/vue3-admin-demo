<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('shang-jia-shou-ru-liu-shui') }}</span>
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
        <template #commission>
          <el-table-column :label="$t('shou-ru')" align="center">
            <template #default="scope">€ {{ scope.row.commission }}</template>
          </el-table-column>
        </template>
        <template #completeTime>
          <el-table-column :label="$t('dao-zhang-shi-jian')" align="center" width="200">
            <template #default="scope">
              {{ time(scope.row.completeTime) }}
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
import { income } from './model/index'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const { incomeList, getList, time, exportExcels } = income()
    onMounted(() => {
      getList()
    })
    const handleCurrentChange = (val) => {
      incomeList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      incomeList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(incomeList),
      getList,
      time,
      searchFun,
      exportExcels,
      handleCurrentChange
    }
  }
})
</script>
