<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('chong-dian-bao-lie-biao') }}</span>
        </div>
      </template>
      <qp-search :show-label="false" :data="searchData" @data-search="searchFun" :btnList="btnList"></qp-search>
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
          <el-table-column :label="$t('lu-ru-shi-jian')" align="center" fixed="right" width="260px">
            <template #default="scope">
              {{ time(scope.row.createTime) }}
            </template>
          </el-table-column>
        </template>
        <template #status>
          <el-table-column :label="$t('zhuang-tai')" align="center" fixed="right" width="260px">
            <template #default="scope">
              {{ getStatus(scope.row.status) }}
            </template>
          </el-table-column>
        </template>
      </qp-table>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, toRefs, onMounted, reactive } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { power } from './model/power'
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    const { powerList, getLists, time } = power()
    onMounted(() => {
      getLists()
    })
    const addPower = (val) => {
      router.push({ name: val })
    }
    const handleCurrentChange = (val) => {
      powerList.pageNo = val
      getLists()
    }
    const searchFun = _.debounce(() => {
      powerList.pageNo = 1
      getLists()
    }, 500)
    const getStatus = (val) => {
      switch (val) {
        case 0:
          return t('dai-tou-fang')
        case 1:
          return t('dai-chu-jie')
        case 2:
          return t('chu-jie-zhong')
        case 3:
          return t('diu-shi')
        case 4:
          return t('yi-bao-fei')
      }
    }
    const btnList = reactive([
      {
        type: 'primary',
        name: t('lu-ru-chong-dian-bao'),
        obj: 'PowerAdd',
        fun: addPower
      },
      {
        type: 'primary',
        name: t('pi-liang-lu-ru'),
        obj: 'PowerBatchAdd',
        fun: addPower
      }
    ])
    return {
      ...toRefs(powerList),
      getStatus,
      addPower,
      getLists,
      searchFun,
      handleCurrentChange,
      time,
      btnList
    }
  }
})
</script>
