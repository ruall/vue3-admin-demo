import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { getMerchantList, add } from '/@/api/admin/pile'
import { ElMessage } from 'element-plus'
import Router from '/@/router'

const { t } = I18n.global

export function pile() {
  let pileList = reactive({
    info: {
      id: '',
      status: 8,
      merchantID: ''
    },
    status: [
      {
        value: 8,
        label: `8${t('kou')}`
      },
      {
        value: 24,
        label: `24${t('kou')}`
      },
      {
        value: 48,
        label: `48${t('kou')}`
      },
      {
        value: 72,
        label: `72${t('kou')}`
      }
    ]
  })
  let merchantList = reactive({
    tableData: [],
    columns: [
      { prop: 'merchantName', label: t('shang-jia-ming-cheng') },
      { prop: 'phoneNo', label: t('shou-ji-hao') },
      { prop: 'address', label: t('di-zhi') },
      { slot: 'status' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '' }
    }
  })
  const dialog = reactive({
    isShow: false,
    currentRow: ''
  })

  const getMerchantLists = async () => {
    const res = await getMerchantList({
      pageNo: merchantList.pageNo,
      pageSize: merchantList.pageSize,
      searchKey: merchantList.searchData.input.val
    })
    if (res.data.code === 0) {
      // @ts-ignore
      merchantList.tableData = res.data.data.dtos
      // @ts-ignore
      merchantList.total = res.data.data.count
      merchantList.loading = false
    }
  }

  const addPile = async () => {
    const res = await add({
      merchantId: pileList.info.merchantID,
      pileNo: pileList.info.id,
      spce: pileList.info.status
    })
    if (res.data.code === 0) {
      ElMessage({
        message: t('tian-jia-cheng-gong'),
        type: 'success'
      })
      pileList.info.id = ''
      pileList.info.merchantID = ''
      pileList.info.status = 8
      merchantList.pageNo = 1
      merchantList.searchData.input.val = ''
      merchantList.tableData = []
      merchantList.loading = true
      dialog.currentRow = ''
      Router.push({ name: 'Pile' })
    }
  }

  return { pileList, merchantList, getMerchantLists, addPile, dialog }
}
