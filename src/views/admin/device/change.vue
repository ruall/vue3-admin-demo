<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('tiao-du-ji-lu') }}</span>
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
          <el-table-column :label="$t('tiao-du-shi-jian')" align="center" width="200px">
            <template v-slot="scope">
              {{ time(scope.row.createTime) }}
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
import { change } from './model/change'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    onMounted(() => {
      getLists()
    })
    const { changeList, time, getLists, exportExcels } = change()
    const searchFun = _.debounce(() => {
      changeList.pageNo = 1
      getLists()
    }, 500)
    const handleCurrentChange = (val) => {
      //分页
      changeList.pageNo = val
      getLists()
    }
    return {
      ...toRefs(changeList),
      time,
      getLists,
      handleCurrentChange,
      exportExcels,
      searchFun
    }
  }
})
</script>
