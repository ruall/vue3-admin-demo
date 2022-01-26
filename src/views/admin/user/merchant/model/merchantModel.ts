import { reactive } from 'vue'
import I18n from '/@/lang/index'
import dayjs from 'dayjs'
import { getList } from '/@/api/admin/merchant'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function merchantList() {
  let orderList = reactive({
    tableData: [],
    columns: [
      { prop: 'merchantName', label: t('shang-jia-ming-cheng'), width: '120px' },
      { prop: 'phoneNo', label: t('shou-ji-hao'), width: '200px' },
      { prop: 'address', label: t('di-zhi'), width: '200px' },
      { slot: 'createTime' },
      { prop: 'orderNum', label: t('nkla') },
      { prop: 'totalAmount', label: t('mdka') },
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
      state: {
        label: t('yunas'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('zheng-chang-shi-yong'),
            val: 0
          },
          {
            label: t('dong-jie-zhong'),
            val: 1
          }
        ]
      },
      sortBy: {
        label: t('pai-lie-fang-shi'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('zhu-ce-shi-jian'),
            val: 0
          },
          {
            label: t('jnsa'),
            val: 1
          },
          {
            label: t('mdka'),
            val: 2
          }
        ]
      },
      dates: { label: t('zhu-ce-shi-jian'), val: '', type: 'timerange' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getLists = async () => {
    orderList.loading = true
    const res = await getList({
      endTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[1]) : '',
      merchantStatus: orderList.searchData.state.val,
      orderSort: orderList.searchData.sortBy.val,
      pageNo: orderList.pageNo,
      pageSize: orderList.pageSize,
      searchKey: orderList.searchData.input.val,
      startTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[0]) : ''
    })
    if (res.data.code === 0) {
      // @ts-ignore
      orderList.tableData = res.data.data.dtos
      // @ts-ignore
      orderList.total = res.data.data.count
      orderList.loading = false
    }
  }
  const exportFn = async () => {
    const params = {
        endTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[1]) : '',
        merchantStatus: orderList.searchData.state.val,
        orderSort: orderList.searchData.sortBy.val,
        pageNo: orderList.pageNo,
        pageSize: orderList.pageSize,
        searchKey: orderList.searchData.input.val,
        startTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[0]) : ''
      },
      url = '/merchant/exportMerchantExcel',
      fileName = t('shang-jia-shu-ju')
    exportExcel(url, params, fileName)
  }
  getLists()
  return { orderList, getLists, time, exportFn }
}
