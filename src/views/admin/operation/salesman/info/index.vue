<template>
  <el-card>
    <qp-search :show-label="true" :data="searchData" @data-search="searchFun"></qp-search>
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
        <el-table-column :label="$t('ru-zhu-shi-jian')" align="center" fixed="right" width="260px">
          <template #default="scope">
            {{ time(scope.row.createTime) }}
          </template>
        </el-table-column>
      </template>
    </qp-table>
  </el-card>
</template>
<script>
import { defineComponent, toRefs, getCurrentInstance, watch, onMounted } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { info } from './model/index'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  props: ['salesId'],
  setup() {
    const proxy = getCurrentInstance()
    const { infoList, getList, time } = info()
    onMounted(() => {
      getList(proxy.props.salesId)
    })
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      getList(proxy.props.salesId)
    }, 500)
    watch(
      () => proxy.props.salesId,
      () => {
        infoList.searchData.dates.val = ''
        //@ts-ignore
        infoList.tableData = []
        //@ts-ignore
        infoList.total = 0
        infoList.loading = true
        getList(proxy.props.salesId)
      }
    )
    return {
      ...toRefs(infoList),
      searchFun,
      time
    }
  }
})
</script>
