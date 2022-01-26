<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('yu-qi-ji-lu') }}</span>
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
        <template #pledgeAmount>
          <el-table-column :label="$t('ya-jin-jin-e')" align="center">
            <template #default="scope">€ {{ scope.row.pledgeAmount }}</template>
          </el-table-column>
        </template>
        <template #isDeduct>
          <el-table-column :label="$t('jiao-yi-lei-xing')" align="center">
            <template #default="scope">
              {{ getType(scope.row.isDeduct) }}
            </template>
          </el-table-column>
        </template>
        <template #handleTime>
          <el-table-column :label="$t('chu-li-shi-jian')" align="center">
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
import { overdue } from './model/index'
import { useI18n } from 'vue-i18n'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const { t } = useI18n()
    const { overdueList, getList, time, exportExcels } = overdue()
    onMounted(() => {
      getList()
    })
    const getType = (val) => {
      switch (val) {
        case 0:
          return t('wei-kou-chu')
        case 1:
          return t('yi-kou-chu')
      }
    }
    const handleCurrentChange = (val) => {
      overdueList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      overdueList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(overdueList),
      getList,
      time,
      exportExcels,
      getType,
      searchFun,
      handleCurrentChange
    }
  }
})
</script>
