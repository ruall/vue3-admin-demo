<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('opmsakd') }}</span>
        </div>
      </template>
      <qp-search
        :show-label="false"
        :data="searchData"
        @data-search="searchFun"
        showExport
        @data-export="exportExcels"
        showBtn
        :btnText="$t('pi-liang-tong-guo')"
        @data-btnclick="passAll"
      ></qp-search>
      <qp-table
        ref="tableRef"
        :loading="loading"
        :columns="columns"
        :table-data="tableData"
        :page-no="pageNo"
        :page-size="pageSize"
        :total-count="total"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @clearTable="clear"
      >
        <template #selection>
          <el-table-column type="selection" align="center" width="50px" :selectable="checkSelectable"></el-table-column>
        </template>
        <template #createTime>
          <el-table-column :label="$t('shen-qing-shi-jian')" align="center" width="200px">
            <template #default="scope">
              {{ time(scope.row.createTime) }}
            </template>
          </el-table-column>
        </template>
        <template #amount>
          <el-table-column :label="$t('ti-xian-jin-e')" align="center" width="130px">
            <template #default="scope">€ {{ scope.row.amount }}</template>
          </el-table-column>
        </template>
        <template #fee>
          <el-table-column :label="$t('kou-chu-shou-xu-fei')" align="center" width="130px">
            <template #default="scope">€ {{ scope.row.fee }}</template>
          </el-table-column>
        </template>
        <template #withdrewType>
          <el-table-column :label="$t('ti-xian-fang-shi')" align="center">
            <template #default="scope">
              {{ scope.row.withdrewType === 1 ? $t('shou-dong-shen-qing') : $t('zi-dong-da-kuan') }}
            </template>
          </el-table-column>
        </template>
        <template #status>
          <el-table-column :label="$t('zhuang-tai')" align="center">
            <template #default="scope">
              {{ getType(scope.row.status) }}
            </template>
          </el-table-column>
        </template>
        <template #completeTime>
          <el-table-column :label="$t('da-kuan-shi-jian')" align="center" width="200px">
            <template #default="scope">
              {{ scope.row.status !== 3 ? time(scope.row.completeTime) : '' }}
            </template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="260px">
            <template #default="scope">
              <el-button
                size="mini"
                class="my-btn-class"
                type="primary"
                @click="pass(scope.row.id)"
                :disabled="scope.row.status !== 0 || scope.row.withdrewType === 0"
              >
                {{ $t('tong-guo') }}
              </el-button>
              <el-button
                size="mini"
                class="my-btn-class"
                type="danger"
                @click="overrule(scope.row.id)"
                v-if="scope.row.status === 0 && scope.row.withdrewType === 1"
              >
                {{ $t('bo-hui') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
      <el-dialog v-model="dialogInfo.isShow" :title="dialogInfo.title" width="30%" center>
        <el-form label-position="top" label-width="100px" :model="dialogInfo.overrule" v-if="dialogInfo.type === 1">
          <el-form-item :label="$t('bo-hui-li-you')" required>
            <el-input v-model="dialogInfo.overrule.content"></el-input>
          </el-form-item>
        </el-form>
        <span v-if="dialogInfo.type === 0">{{ $t('bdhabd') }}</span>
        <span v-if="dialogInfo.type === 2">{{ $t('dasnjda') }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="onCancel">{{ $t('qu-xiao') }}</el-button>
            <el-button type="primary" @click="passFun">{{ $t('que-ding') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs, ref } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { withdraw } from './model/index'
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
    const tableRef = ref(null)
    const { withdrawList, getList, time, exportExcels, passFun } = withdraw()
    onMounted(() => {
      getList()
    })
    const searchFun = _.debounce(() => {
      //点击搜索按钮
      withdrawList.pageNo = 1
      getList()
    }, 500)
    const handleCurrentChange = (val) => {
      withdrawList.pageNo = val
      getList()
    }
    const getType = (val) => {
      switch (val) {
        case 0:
          return t('dai-chu-li')
        case 1:
          return t('deng-dai-da-kuan')
        case 2:
          return t('yi-da-kuan')
        case 3:
          return t('yi-bo-hui')
      }
    }
    const onCancel = () => {
      tableRef.value.clearTable()
      withdrawList.dialogInfo.withdrewIds = []
      withdrawList.dialogInfo.overrule.content = ''
      withdrawList.dialogInfo.isShow = false
    }
    const pass = (id) => {
      withdrawList.dialogInfo.withdrewIds = [id]
      withdrawList.dialogInfo.isShow = true
      withdrawList.dialogInfo.type = 0
      withdrawList.dialogInfo.title = t('tong-guo-shen-qing')
    }
    const overrule = (id) => {
      withdrawList.dialogInfo.withdrewIds = [id]
      withdrawList.dialogInfo.isShow = true
      withdrawList.dialogInfo.type = 1
      withdrawList.dialogInfo.title = t('bo-hui-li-you')
    }
    const passAll = () => {
      if (withdrawList.dialogInfo.withdrewIds.length) {
        withdrawList.dialogInfo.isShow = true
        withdrawList.dialogInfo.type = 2
        withdrawList.dialogInfo.title = t('tong-guo-shen-qing')
      } else {
        ElMessage({
          message: t('qing-xuan-ze-xu-yao-cao-zuo-de-shu-ju'),
          type: 'warning'
        })
      }
    }
    const handleSelectionChange = (val) => {
      if (val.length > 0) {
        let arr = val.filter((v) => {
          if (v.withdrewType === 1 && v.status === 0) {
            return v
          } else {
            tableRef.value.clearRow(v, false)
            ElMessage({
              message: t(
                'zhi-you-shou-dong-shen-qing-bing-qie-dai-chu-li-de-ti-xian-cai-zhi-chi-pi-liang-xuan-ze-chu-li'
              ),
              type: 'warning'
            })
            return false
          }
        })
        if (arr.length > 0) {
          arr = val.map((v) => v.id)
        }
        withdrawList.dialogInfo.withdrewIds = arr
      } else {
        tableRef.value.tableRef.clearSelection()
        return false
      }
    }
    const checkSelectable = (row) => {
      return row.withdrewType === 1 && row.status === 0
    }
    return {
      ...toRefs(withdrawList),
      searchFun,
      getList,
      time,
      exportExcels,
      handleCurrentChange,
      handleSelectionChange,
      getType,
      pass,
      overrule,
      passAll,
      passFun,
      onCancel,
      tableRef,
      checkSelectable
    }
  }
})
</script>
