<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('shang-jia-guan-li') }}</span>
        </div>
      </template>
      <qp-search
        :show-label="false"
        :data="searchData"
        @data-search="searchFun"
        showExport
        @data-export="exportFn"
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
          <el-table-column :label="$t('ru-zhu-shi-jian')" align="center" width="200px">
            <template v-slot="scope">{{ time(new Date(scope.row.createTime)) }}</template>
          </el-table-column>
        </template>
        <template #status>
          <el-table-column :label="$t('zhuang-tai')" align="center" width="120px">
            <template v-slot="scope">
              {{ scope.row.status ? $t('dong-jie-zhong') : $t('zheng-chang-shi-yong') }}
            </template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="260px">
            <template #default="scope">
              <el-button
                size="mini"
                class="my-btn-class"
                :type="scope.row.status === 0 ? 'danger' : 'success'"
                @click="setType(scope.row.status, scope.row.id)"
              >
                {{ scope.row.status === 0 ? $t('dong-jie') : $t('jie-dong') }}
              </el-button>
              <el-button size="mini" class="my-btn-class" type="primary" @click="getOrderInfo(scope.row)">
                {{ $t('cha-kan') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, toRefs } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { merchantList } from './model/merchantModel'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { freezeMerchant } from '/@/api/admin/merchant'
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
    const { orderList, getLists, time, exportFn } = merchantList()
    const getOrderInfo = (row) => {
      //点击查看按钮
      router.push({ name: 'MerchantInfo', query: { id: row.id } })
    }
    const handleCurrentChange = (currentPage) => {
      orderList.pageNo = currentPage
      getLists()
    }
    const searchFun = _.debounce(() => {
      orderList.pageNo = 1
      getLists()
    }, 500)
    const setType = (val, id) => {
      let txt = ''
      if (val === 0) {
        txt = `${t('tybs')}？`
      } else {
        txt = `${t('mlnh')}？`
      }
      ElMessageBox({
        title: t('xi-tong-ti-shi'),
        message: txt,
        showCancelButton: true,
        confirmButtonText: t('que-ding'),
        center: true,
        cancelButtonText: t('qu-xiao')
      })
        .then(async () => {
          const res = await freezeMerchant({
            merchantId: id,
            form: {}
          })
          if (res.data.code === 0) {
            ElMessage({
              message: t('cao-zuo-cheng-gong'),
              type: 'success'
            })
            orderList.pageNo = 1
            getLists()
          }
        })
        .catch(() => {})
    }
    return {
      ...toRefs(orderList),
      getOrderInfo,
      setType,
      time,
      getLists,
      handleCurrentChange,
      exportFn,
      searchFun
    }
  }
})
</script>
