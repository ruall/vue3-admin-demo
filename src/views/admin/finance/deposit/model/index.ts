import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { queryUserBill } from '/@/api/admin/finance'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function deposit() {
  let depositList = reactive({
    tableData: [],
    columns: [
      { prop: 'uid', label: t('yong-hu-id') },
      { slot: 'createTime' },
      { slot: 'billType' },
      { slot: 'amount' },
      { slot: 'payType' },
      { prop: 'serialNo', label: t('jiao-yi-hao') },
      { prop: 'remark', label: t('xiang-guan-ding-dan-hao') }
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
            label: t('jiao-na-ya-jin'),
            val: 1
          },
          {
            label: t('ya-jin-tui-huan'),
            val: 2
          },
          {
            label: t('ya-jin-kou-chu'),
            val: 5
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
    depositList.loading = true
    const res = await queryUserBill({
      billType: depositList.searchData.sortBy.val,
      endTime: depositList.searchData.dates.val ? depositList.searchData.dates.val[1] : '',
      pageNo: depositList.pageNo,
      pageSize: depositList.pageSize,
      searchKey: depositList.searchData.input.val,
      selectType: 1,
      startTime: depositList.searchData.dates.val ? depositList.searchData.dates.val[0] : ''
    })
    if (res.data.code === 0) {
      //@ts-ignore
      depositList.tableData = res.data.data.dtos
      //@ts-ignore
      depositList.total = res.data.data.count
      depositList.loading = false
    }
  }
  const exportExcels = async () => {
    const url = '/finance/exportBillExcel/1',
      params = {
        billType: depositList.searchData.sortBy.val,
        endTime: depositList.searchData.dates.val ? depositList.searchData.dates.val[1] : '',
        pageNo: depositList.pageNo,
        pageSize: depositList.pageSize,
        searchKey: depositList.searchData.input.val,
        selectType: 1,
        startTime: depositList.searchData.dates.val ? depositList.searchData.dates.val[0] : ''
      },
      fileName = t('ya-jin-liu-shui')
    exportExcel(url, params, fileName)
  }
  return { depositList, getList, time, exportExcels }
}
