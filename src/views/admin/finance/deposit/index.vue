<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('ya-jin-liu-shui') }}</span>
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
        <template #createTime>
          <el-table-column :label="$t('jiao-yi-shi-jian')" align="center" width="200">
            <template #default="scope">
              {{ time(scope.row.createTime) }}
            </template>
          </el-table-column>
        </template>
        <template #billType>
          <el-table-column :label="$t('jiao-yi-lei-xing')" align="center">
            <template #default="scope">
              {{ getType(scope.row.billType) }}
            </template>
          </el-table-column>
        </template>
        <template #amount>
          <el-table-column :label="$t('jiao-yi-jin-e')" align="center">
            <template #default="scope">€ {{ scope.row.amount }}</template>
          </el-table-column>
        </template>
        <template #payType>
          <el-table-column :label="$t('jiao-yi-fang-shi')" align="center">
            <template #default="scope">
              {{ scope.row.payType === 0 ? $t('yu-e') : scope.row.payType === 1 ? 'PayPal' : $t('qi-ta') }}
            </template>
          </el-table-column>
        </template>
      </qp-table>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, toRefs, onMounted } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { deposit } from './model/index'
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
    const { depositList, getList, time, exportExcels } = deposit()
    onMounted(() => {
      getList()
    })
    const getType = (val) => {
      switch (val) {
        case 1:
          return t('jiao-na-ya-jin')
        case 2:
          return t('ya-jin-tui-huan')
        case 5:
          return t('ya-jin-kou-chu')
      }
    }
    const handleCurrentChange = (val) => {
      depositList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      depositList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(depositList),
      getList,
      time,
      exportExcels,
      searchFun,
      getType,
      handleCurrentChange
    }
  }
})
</script>
