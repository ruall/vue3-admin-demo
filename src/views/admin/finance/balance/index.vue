<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('yong-hu-yueliu-shui') }}</span>
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
              {{
                scope.row.payType === 0
                  ? $t('yu-e')
                  : scope.row.payType === 1
                  ? 'PayPal'
                  : scope.row.payType === 4
                  ? $t('ya-jin')
                  : $t('qi-ta')
              }}
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
import { balance } from './model/index'
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
    const { balanceList, getList, time, exportExcels } = balance()
    onMounted(() => {
      getList()
    })
    const getType = (val) => {
      switch (val) {
        case 0:
          return t('ding-dan-zhi-fu')
        case 3:
          return t('chong-zhi-yu-e')
        case 4:
          return t('ding-dan-tui-kuan')
      }
    }
    const handleCurrentChange = (val) => {
      balanceList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      balanceList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(balanceList),
      getType,
      getList,
      time,
      searchFun,
      handleCurrentChange,
      exportExcels
    }
  }
})
</script>
