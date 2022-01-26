<template>
  <el-card>
    <el-form :model="info" class="my-form-class" label-width="120px" label-position="left">
      <el-form-item :label="$t('chong-dian-zhuang-id')" required>
        <el-input v-model="info.id"></el-input>
      </el-form-item>
      <el-form-item :label="$t('chong-dian-zhuang-gui-ge')" required>
        <el-select v-model="info.status" :placeholder="$t('qing-xuan-ze')">
          <el-option v-for="item in status" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('bang-ding-shang-jia')">
        <span class="merchantName" v-if="currentRow">{{ currentRow.merchantName }}</span>
        <el-button type="primary" size="small" @click="openDialog">{{ $t('xuan-ze-shang-jia') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">{{ $t('qu-xiao') }}</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('que-ding') }}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="isShow" :title="$t('xuan-ze-shang-jia')" width="50%">
      <qp-search :show-label="false" :data="searchData" @data-search="searchFun"></qp-search>
      <qp-table
        showIndex
        :stripe="false"
        :loading="loading"
        :columns="columns"
        :table-data="tableData"
        :page-no="pageNo"
        :page-size="pageSize"
        :total-count="total"
        @handleRadioChange="handleRadioChange"
        @handleCurrentChange="handleCurrentChange"
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
</template>
<script>
import { defineComponent, toRefs } from 'vue'
import { pile } from './model/pileAdd'
import { qpTable, qpSearch } from '/@/components/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: '',
  components: {
    qpSearch,
    qpTable
  },
  setup() {
    const { pileList, merchantList, getMerchantLists, addPile, dialog } = pile()
    const router = useRouter()

    const searchFun = () => {
      merchantList.pageNo = 1
      getMerchantLists()
    }
    const openDialog = () => {
      getMerchantLists()
      dialog.isShow = true
    }
    const submit = () => {
      if (dialog.currentRow) {
        dialog.isShow = false
        pileList.info.merchantID = dialog.currentRow.id
      } else {
        ElMessage({
          message: t('qing-xuan-ze-yi-ge-shang-jia'),
          type: 'warning'
        })
      }
    }
    const cancel = () => {
      dialog.isShow = false
      merchantList.pageNo = 1
      merchantList.searchData.input.val = ''
      merchantList.tableData = []
      merchantList.loading = true
      merchantList.currentRow = ''
    }
    const onSubmit = () => {
      if (pileList.info.id) {
        addPile()
      } else {
        ElMessage({
          message: t('qing-tian-xie-chong-dian-zhuang-id'),
          type: 'warning'
        })
      }
    }
    const onCancel = () => {
      router.push({ name: 'Pile' })
    }
    const handleRadioChange = (val) => {
      dialog.currentRow = val
    }
    return {
      ...toRefs(pileList),
      ...toRefs(merchantList),
      ...toRefs(dialog),
      searchFun,
      getMerchantLists,
      openDialog,
      submit,
      cancel,
      handleRadioChange,
      onSubmit,
      onCancel
    }
  }
})
</script>
<style lang="scss" scoped>
.my-form-class {
  width: 500px;
}
.merchantName {
  font-size: 14px;
  color: #666;
  padding-right: 20px;
}
</style>
