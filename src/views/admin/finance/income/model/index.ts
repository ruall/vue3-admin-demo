import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { queryMerchantCommission } from '/@/api/admin/finance'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function income() {
  let incomeList = reactive({
    tableData: [],
    columns: [
      { prop: 'phoneNo', label: t('shou-ji-hao') },
      { prop: 'merchantName', label: t('shang-jia-ming-cheng') },
      { prop: 'orderNo', label: t('ding-dan-hao') },
      { slot: 'amount' },
      { slot: 'commission' },
      { slot: 'completeTime' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      dates: { label: t('jiao-yi-shi-jian'), val: '', type: 'timerange' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async () => {
    incomeList.loading = true
    const res = await queryMerchantCommission({
      endTime: incomeList.searchData.dates.val ? incomeList.searchData.dates.val[1] : '',
      pageNo: incomeList.pageNo,
      pageSize: incomeList.pageSize,
      searchKey: incomeList.searchData.input.val,
      startTime: incomeList.searchData.dates.val ? incomeList.searchData.dates.val[0] : ''
    })
    if (res.data.code === 0) {
      //@ts-ignore
      incomeList.tableData = res.data.data.dtos
      //@ts-ignore
      incomeList.total = res.data.data.count
      incomeList.loading = false
    }
  }

  const exportExcels = () => {
    const url = '/finance/exportMerchantCommissionExcel',
      params = {
        endTime: incomeList.searchData.dates.val ? incomeList.searchData.dates.val[1] : '',
        pageNo: incomeList.pageNo,
        pageSize: incomeList.pageSize,
        searchKey: incomeList.searchData.input.val,
        startTime: incomeList.searchData.dates.val ? incomeList.searchData.dates.val[0] : ''
      },
      fileName = t('shang-jia-shou-ru-liu-shui')
    exportExcel(url, params, fileName)
  }
  return { incomeList, getList, time, exportExcels }
}
