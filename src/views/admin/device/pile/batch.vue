<template>
  <el-card>
    <pb-import
      :initData="initData"
      @file-change="onFileChange"
      @importData="importData"
      @del="del"
      @handleSelectionChange="handleSelectionChange"
    ></pb-import>
  </el-card>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { pbImport } from '/@/components/index'
import { useI18n } from 'vue-i18n'
import { batchAddPile } from '/@/api/admin/pile'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  components: { pbImport },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const initData = reactive({
      count: 20,
      warning: 10,
      error: 10,
      showErr: false,
      columns: [{ prop: 'pileNo', label: t('chong-dian-zhuang-id'), width: '120px' }, { slot: 'spce' }],
      tableData: [],
      loading: false,
      downLoadInfo: {
        excelName: t('chong-dian-zhuang-lie-biao'),
        url: '/pile/writePileExcel',
        excelType: 0
      },
      selection: []
    })
    const onFileChange = (response) => {
      initData.tableData = response.data
    }
    const importData = async () => {
      if (initData.selection.length) {
        const res = await batchAddPile({
          forms: initData.selection
        })
        if (res.data.code === 0) {
          ElMessage({
            message: t('dao-ru-cheng-gong'),
            type: 'success'
          })
          router.push({ name: 'Pile' })
        }
      } else {
        ElMessage({
          message: t('qing-xuan-ze-xu-yao-dao-ru-de-shu-ju'),
          type: 'warning'
        })
      }
    }
    const del = () => {
      if (initData.selection.length) {
        for (let i of initData.selection) {
          initData.tableData = initData.tableData.filter((val) => val.pileNo !== i.pileNo)
        }
      } else {
        ElMessage({
          message: t('qing-xuan-ze-xu-yao-shan-chu-de-shu-ju'),
          type: 'warning'
        })
      }
    }
    const handleSelectionChange = (val) => {
      initData.selection = val
    }
    return {
      initData,
      onFileChange,
      importData,
      del,
      handleSelectionChange
    }
  }
})
</script>
