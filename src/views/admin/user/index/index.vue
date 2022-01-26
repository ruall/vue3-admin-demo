<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('yong-hu-lie-biao') }}</span>
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
        <template #loginNo>
          <el-table-column :label="$t('zhu-ce-zhang-hao')" align="center" width="200px">
            <template v-slot="scope">{{ registerInfo(scope.row) }}</template>
          </el-table-column>
        </template>
        <template #createTime>
          <el-table-column :label="$t('zhu-ce-shi-jian')" align="center" width="200px">
            <template v-slot="scope">{{ time(new Date(scope.row.createTime)) }}</template>
          </el-table-column>
        </template>
        <template #isBindCard>
          <el-table-column :label="$t('shi-fou-bang-ka')" align="center" width="120px">
            <template v-slot="scope">{{ scope.row.isBindCard ? $t('yi-bang-ka') : $t('wei-bang-ka') }}</template>
          </el-table-column>
        </template>
        <template #status>
          <el-table-column :label="$t('yong-hu-zhuang-tai')" align="center" width="120px">
            <template v-slot="scope">
              {{ scope.row.status ? $t('zheng-chang-shi-yong') : $t('dong-jie-zhong') }}
            </template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="300px">
            <template #default="scope">
              <el-button
                size="mini"
                class="my-btn-class"
                :type="scope.row.status === 0 ? 'success' : 'danger'"
                @click="setType(scope.row.status, 'changeStatus', scope.row.id)"
              >
                {{ scope.row.status === 0 ? $t('jie-dong') : $t('dong-jie') }}
              </el-button>
              <el-button size="mini" class="my-btn-class" type="primary" @click="getOrderInfo(scope.row)">
                {{ $t('cha-kan') }}
              </el-button>
              <el-button
                size="mini"
                class="my-btn-class"
                :type="scope.row.isDispatcher === 0 ? 'danger' : 'warning'"
                @click="setType(scope.row.isDispatcher, 'changeType', scope.row.id, scope.row.isBindPhone)"
              >
                {{ scope.row.isDispatcher === 0 ? $t('she-wei-tiao-du-yuan') : $t('qu-xiao-tiao-du-yuan') }}
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
import { userList } from './model/index'
import { ElMessageBox } from 'element-plus'
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
    const { orderList, getLists, time, freezeUserFn, dispatcherFn } = userList()
    onMounted(() => {
      getLists()
    })
    const searchFun = _.debounce(() => {
      orderList.pageNo = 1
      getLists()
    }, 500)
    const registerInfo = (val) => {
      return val.sourceType === 0
        ? `${t('shou-ji-hao')}\n${val.loginNo}`
        : val.sourceType === 1
        ? `${t('you-xiang')}\n${val.loginNo}`
        : val.sourceType === 2
        ? `apple ID\n${val.loginNo}`
        : `facebook\n${val.loginNo}`
    }
    const getOrderInfo = (row) => {
      //点击查看按钮
      router.push({ name: 'UserEdit', query: { id: row.id } })
    }
    const setType = (val, type, userId, isBindPhone) => {
      let txt = ''
      if (type === 'changeStatus') {
        if (val === 0) {
          txt = `${t('qwedx')}？`
        } else {
          txt = `${t('qwevas')}？`
        }
      } else {
        if (val === 0) {
          txt =
            isBindPhone === 1 ? `${t('vdcaa')}？` : t('she-wei-tiao-du-yuan-xu-yao-gai-yong-hu-bang-ding-shou-ji-hao')
        } else {
          txt = `${t('fewca')}？`
        }
      }
      ElMessageBox({
        title: t('xi-tong-ti-shi'),
        message: txt,
        showCancelButton: true,
        confirmButtonText: t('que-ding'),
        center: true,
        cancelButtonText: t('qu-xiao')
      })
        .then(() => {
          if (type === 'changeStatus') {
            freezeUserFn(userId)
          } else {
            if (isBindPhone === 1) {
              dispatcherFn(userId)
            }
          }
        })
        .catch(() => {})
    }
    const handleCurrentChange = (currentPage) => {
      orderList.pageNo = currentPage
      getLists()
    }
    return {
      ...toRefs(orderList),
      handleCurrentChange,
      getOrderInfo,
      registerInfo,
      setType,
      time,
      getLists,
      searchFun
    }
  }
})
</script>
