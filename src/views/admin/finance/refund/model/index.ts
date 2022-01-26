import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { queryOrderRefundRecord } from '/@/api/admin/finance'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function refund() {
  let refundList = reactive({
    tableData: [],
    columns: [
      { prop: 'uid', label: t('yong-hu-id') },
      { prop: 'orderNo', label: t('ding-dan-hao') },
      { slot: 'amount' },
      { slot: 'refundAmount' },
      { prop: 'refundReason', label: t('tui-kuan-li-you') },
      { prop: 'handler', label: t('chu-li-ren') },
      { slot: 'handleTime' }
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
    refundList.loading = true
    const res = await queryOrderRefundRecord({
      endTime: refundList.searchData.dates.val ? refundList.searchData.dates.val[1] : '',
      pageNo: refundList.pageNo,
      pageSize: refundList.pageSize,
      searchKey: refundList.searchData.input.val,
      startTime: refundList.searchData.dates.val ? refundList.searchData.dates.val[0] : ''
    })
    if (res.data.code === 0) {
      //@ts-ignore
      refundList.tableData = res.data.data.dtos
      //@ts-ignore
      refundList.total = res.data.data.count
      refundList.loading = false
    }
  }

  const exportExcels = () => {
    const url = '/finance/exportOrderRefundRecordExcel',
      params = {
        endTime: refundList.searchData.dates.val ? refundList.searchData.dates.val[1] : '',
        pageNo: refundList.pageNo,
        pageSize: refundList.pageSize,
        searchKey: refundList.searchData.input.val,
        startTime: refundList.searchData.dates.val ? refundList.searchData.dates.val[0] : ''
      },
      fileName = t('tui-kuan-ji-lu')
    exportExcel(url, params, fileName)
  }
  return { refundList, getList, time, exportExcels }
}
