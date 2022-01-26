<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('chong-dian-zhuang-lie-biao') }}</span>
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
        <template #spce>
          <el-table-column :label="$t('gui-ge')" align="center" width="100px">
            <template v-slot="scope">{{ scope.row.spce }}口</template>
          </el-table-column>
        </template>
        <template #createTime>
          <el-table-column :label="$t('lu-ru-shi-jian')" align="center" width="200px">
            <template v-slot="scope">
              {{ time(scope.row.createTime) }}
            </template>
          </el-table-column>
        </template>
        <template #status>
          <el-table-column :label="$t('zhuang-tai')" align="center" width="120px">
            <template v-slot="scope">
              {{ getStatus(scope.row.status) }}
            </template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="300px">
            <template #default="scope">
              <el-button
                size="mini"
                class="my-btn-class"
                type="primary"
                @click="openDialog(scope.row.id)"
                v-show="scope.row.merchantId"
              >
                {{ $t('geng-gai-bang-ding') }}
              </el-button>
              <el-button
                size="mini"
                class="my-btn-class"
                type="warning"
                @click="clearBind(scope.row.id)"
                v-show="scope.row.merchantId"
              >
                {{ $t('jie-chu-bang-ding') }}
              </el-button>
              <el-button
                size="mini"
                class="my-btn-class"
                type="primary"
                @click="openDialog(scope.row.id)"
                v-show="!scope.row.merchantId"
              >
                {{ $t('li-ji-bang-ding') }}
              </el-button>
              <el-button size="mini" class="my-btn-class" type="danger" @click="delPile(scope.row.id)">
                {{ $t('shan-chu') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
      <el-dialog v-model="dialog.isShow" :title="$t('xi-tong-ti-shi')" width="60%" @close="cancel">
        <qp-search :show-label="false" :data="MerchantSearchData" @data-search="searchFunDialog"></qp-search>
        <qp-table
          showIndex
          :stripe="false"
          :loading="MerchantLoading"
          :columns="MerchantColumns"
          :table-data="MerchantTableData"
          :page-no="MerchantPageNo"
          :page-size="MerchantPageSize"
          :total-count="MerchantTotal"
          :highlightCurrentRow="true"
          @handleRadioChange="handleRadioChange"
          @handleCurrentChange="handleCurrentChangeDialog"
        >
          <template #status>
            <el-table-column :label="$t('zhuang-tai')" align="center" width="120px">
              <template v-slot="scope">
                {{ scope.row.status ? $t('dong-jie-zhong') : $t('zheng-chang-shi-yong') }}
              </template>
            </el-table-column>
          </template>
        </qp-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">{{ $t('qu-xiao') }}</el-button>
            <el-button type="primary" @click="submit">{{ $t('que-ding') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, ref, toRefs, reactive, onMounted } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { pile } from './model/pile'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
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
    const { pileList, merchantList, getMerchantLists, time, getLists, clearBind, bindMerchant, delPile } = pile()
    const dialog = reactive({
      isShow: false,
      currentRow: '',
      pileId: ''
    })
    onMounted(() => {
      getLists()
    })
    const getStatus = (val) => {
      switch (val) {
        case 0:
          return t('bu-ke-yong')
        case 1:
          return t('yun-xing-zhong')
        case 2:
          return t('tiao-du-zhong')
        case 3:
          return t('dai-tou-fang')
      }
    }
    const searchFun = _.debounce(() => {
      pileList.pageNo = 1
      getLists()
    }, 500)
    const edit = (row) => {
      //点击查看按钮
      router.push({ name: 'PileEdit', query: { id: row.id } })
    }
    const addPile = (val) => {
      router.push({ name: val })
    }
    const openDialog = (id) => {
      getMerchantLists()
      dialog.isShow = true
      dialog.pileId = id
    }
    const submit = () => {
      if (dialog.currentRow) {
        dialog.isShow = false
        bindMerchant(dialog.currentRow.id, dialog.pileId)
      } else {
        ElMessage({
          message: t('qing-xuan-ze-yi-ge-shang-jia'),
          type: 'warning'
        })
      }
    }
    const cancel = () => {
      dialog.currentRow = ''
      dialog.isShow = false
      merchantList.MerchantPageNo = 1
      merchantList.MerchantSearchData.input.val = ''
      merchantList.MerchantTableData = []
      merchantList.MerchantLoading = true
    }
    const searchFunDialog = _.debounce(() => {
      merchantList.MerchantPageNo = 1
      getMerchantLists()
    }, 500)
    const handleCurrentChange = (val) => {
      pileList.pageNo = val
      getLists()
    }
    const handleCurrentChangeDialog = (val) => {
      merchantList.MerchantPageNo = val
      getMerchantLists()
    }
    const handleRadioChange = (val) => {
      dialog.currentRow = val
    }
    const btnList = reactive([
      {
        type: 'primary',
        name: t('lu-ru-chong-dian-zhuang'),
        obj: 'PileAdd',
        fun: addPile
      },
      {
        type: 'primary',
        name: t('pi-liang-lu-ru'),
        obj: 'PileBatchAdd',
        fun: addPile
      }
    ])
    return {
      ...toRefs(pileList),
      ...toRefs(merchantList),
      getLists,
      edit,
      addPile,
      openDialog,
      dialog,
      submit,
      cancel,
      searchFun,
      searchFunDialog,
      handleCurrentChange,
      handleCurrentChangeDialog,
      handleRadioChange,
      getStatus,
      time,
      clearBind,
      btnList,
      delPile
    }
  }
})
</script>
