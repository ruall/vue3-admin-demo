import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { getList, clear, getMerchantList, bind, del } from '/@/api/admin/pile'
import dayjs from 'dayjs'
import { ElMessageBox, ElMessage } from 'element-plus'

const { t } = I18n.global

export function pile() {
  let pileList = reactive({
    tableData: [],
    columns: [
      { prop: 'chargingPileNo', label: t('nausa') },
      { slot: 'spce' },
      { slot: 'createTime' },
      { prop: 'merchantName', label: t('bang-ding-shang-jia') },
      { slot: 'status' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      sortBy: {
        label: t('zhuang-tai'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('bu-ke-yong'),
            val: 0
          },
          {
            label: t('yun-xing-zhong'),
            val: 1
          },
          {
            label: t('tiao-du-zhong'),
            val: 2
          },
          {
            label: t('dai-tou-fang'),
            val: 3
          }
        ]
      },
      dates: { label: t('lu-ru-shi-jian'), val: '', type: 'timerange' }
    }
  })
  let merchantList = reactive({
    MerchantTableData: [],
    MerchantColumns: [
      { prop: 'merchantName', label: t('shang-jia-ming-cheng') },
      { prop: 'phoneNo', label: t('shou-ji-hao') },
      { prop: 'address', label: t('di-zhi') },
      { slot: 'status' }
    ],
    MerchantPageNo: 1,
    MerchantPageSize: 10,
    MerchantTotal: 10,
    MerchantPage: {},
    MerchantLoading: true,
    MerchantSearchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getLists = async () => {
    pileList.loading = true
    const res = await getList({
      endTime: pileList.searchData.dates.val ? time(pileList.searchData.dates.val[1]) : '',
      pageNo: pileList.pageNo,
      pageSize: pileList.pageSize,
      pileStatus: pileList.searchData.sortBy.val,
      searchKey: pileList.searchData.input.val,
      startTime: pileList.searchData.dates.val ? time(pileList.searchData.dates.val[0]) : ''
    })
    if (res.data.code === 0) {
      // @ts-ignore
      pileList.tableData = res.data.data.dtos
      // @ts-ignore
      pileList.total = res.data.data.count
      pileList.loading = false
    }
  }
  const getMerchantLists = async () => {
    merchantList.MerchantLoading = true
    const res = await getMerchantList({
      pageNo: merchantList.MerchantPageNo,
      pageSize: merchantList.MerchantPageSize,
      searchKey: merchantList.MerchantSearchData.input.val
    })
    if (res.data.code === 0) {
      // @ts-ignore
      merchantList.MerchantTableData = res.data.data.dtos
      // @ts-ignore
      merchantList.MerchantTotal = res.data.data.count
      merchantList.MerchantLoading = false
    }
  }
  const clearBind = (pileId: any) => {
    ElMessageBox({
      title: t('xi-tong-ti-shi'),
      message: `${t('que-ding-jie-chu-bang-ding-ma')}？`,
      showCancelButton: true,
      confirmButtonText: t('que-ding'),
      center: true,
      cancelButtonText: t('qu-xiao')
    })
      .then(async () => {
        const res = await clear({ pileId })
        if (res.data.code === 0) {
          ElMessage({
            message: t('cao-zuo-cheng-gong'),
            type: 'success'
          })
          getLists()
        }
      })
      .catch(() => {})
  }
  const bindMerchant = async (merchantId: number, pileId: number) => {
    const res = await bind({
      merchantId,
      pileId
    })
    if (res.data.code === 0) {
      ElMessage({
        message: t('bang-ding-cheng-gong'),
        type: 'success'
      })
      merchantList.MerchantPageNo = 1
      merchantList.MerchantSearchData.input.val = ''
      merchantList.MerchantTableData = []
      merchantList.MerchantLoading = true
      getLists()
    }
  }
  const delPile = (pileId: number) => {
    ElMessageBox({
      title: t('xi-tong-ti-shi'),
      message: `${t('que-ding-yao-shan-chu-gai-she-bei-ma')}？`,
      showCancelButton: true,
      confirmButtonText: t('que-ding'),
      center: true,
      cancelButtonText: t('qu-xiao')
    })
      .then(async () => {
        const res = await del(pileId)
        if (res.data.code === 0) {
          ElMessage({
            message: t('shan-chu-cheng-gong'),
            type: 'success'
          })
          pileList.pageNo = 1
          getLists()
        }
      })
      .catch(() => {})
  }
  return { pileList, merchantList, getMerchantLists, time, getLists, clearBind, bindMerchant, delPile }
}
