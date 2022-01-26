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
import { addList } from '/@/api/admin/device'
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
      columns: [{ prop: 'deviceNo', label: t('chong-dian-bao-id'), width: '120px' }],
      tableData: [],
      loading: false,
      downLoadInfo: {
        excelName: t('chong-dian-bao-lie-biao'),
        url: '/device/writeDeviceExcel',
        excelType: 1
      },
      selection: []
    })
    const onFileChange = (response) => {
      initData.tableData = response.data
    }
    const importData = async () => {
      if (initData.selection.length) {
        const arr = []
        initData.selection.forEach((v) => {
          arr.push(v.deviceNo)
        })
        const res = await addList({
          deviceNos: arr
        })
        if (res.data.code === 0) {
          ElMessage({
            message: t('dao-ru-cheng-gong'),
            type: 'success'
          })
          router.push({ name: 'PowerBank' })
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
          initData.tableData = initData.tableData.filter((val) => val.deviceNo !== i.deviceNo)
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
