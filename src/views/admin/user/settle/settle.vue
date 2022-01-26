<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('shang-jia-ru-zhu-shen-qing') }}</span>
        </div>
      </template>
      <qp-search :show-label="false" :data="searchData" @data-search="searchFun"></qp-search>
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
          <el-table-column :label="$t('shen-qing-shi-jian')" align="center" fixed="right" width="260px">
            <template #default="scope">{{ time(new Date(scope.row.createTime)) }}</template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="100px">
            <template #default="scope">
              <el-button size="mini" class="my-btn-class" type="primary" @click="audit(scope.row)">
                {{ $t('qwsa') }}
              </el-button>
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
import { settle } from './model/settle'
import { useRouter } from 'vue-router'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const router = useRouter()
    const { settleList, time, getList } = settle()
    onMounted(() => {
      getList()
    })
    const audit = (row) => {
      //点击查看按钮
      router.push({ name: 'SettleInfo', query: { id: row.id } })
    }
    const handleCurrentChange = (val) => {
      settleList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      settleList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(settleList),
      getList,
      time,
      audit,
      handleCurrentChange,
      searchFun
    }
  }
})
</script>
