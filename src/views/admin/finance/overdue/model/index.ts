import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { queryOrderExpireRecord } from '/@/api/admin/finance'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function overdue() {
  let overdueList = reactive({
    tableData: [],
    columns: [
      { prop: 'uid', label: t('yong-hu-id') },
      { prop: 'orderNo', label: t('ding-dan-hao') },
      { slot: 'pledgeAmount' },
      { slot: 'isDeduct' },
      { prop: 'handler', label: t('chu-li-ren') },
      { slot: 'handleTime' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      sortBy: {
        label: t('jiao-yi-lei-xing'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('wei-kou-chu'),
            val: 0
          },
          {
            label: t('yi-kou-chu'),
            val: 1
          }
        ]
      },
      dates: { label: t('jiao-yi-shi-jian'), val: '', type: 'timerange' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async () => {
    overdueList.loading = true
    const res = await queryOrderExpireRecord({
      isDeduct: overdueList.searchData.sortBy.val,
      endTime: overdueList.searchData.dates.val ? overdueList.searchData.dates.val[1] : '',
      pageNo: overdueList.pageNo,
      pageSize: overdueList.pageSize,
      searchKey: overdueList.searchData.input.val,
      startTime: overdueList.searchData.dates.val ? overdueList.searchData.dates.val[0] : ''
    })
    if (res.data.code === 0) {
      //@ts-ignore
      overdueList.tableData = res.data.data.dtos
      //@ts-ignore
      overdueList.total = res.data.data.count
      overdueList.loading = false
    }
  }
  const exportExcels = () => {
    const url = '/finance/exportOrderExpireRecordExcel',
      params = {
        isDeduct: overdueList.searchData.sortBy.val,
        endTime: overdueList.searchData.dates.val ? overdueList.searchData.dates.val[1] : '',
        pageNo: overdueList.pageNo,
        pageSize: overdueList.pageSize,
        searchKey: overdueList.searchData.input.val,
        startTime: overdueList.searchData.dates.val ? overdueList.searchData.dates.val[0] : ''
      },
      fileName = t('yu-qi-ji-lu')
    exportExcel(url, params, fileName)
  }
  return { overdueList, getList, time, exportExcels }
}
