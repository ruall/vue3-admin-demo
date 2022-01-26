import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { queryUserBill } from '/@/api/admin/finance'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function balance() {
  let balanceList = reactive({
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
            label: t('ding-dan-zhi-fu'),
            val: 0
          },
          {
            label: t('chong-zhi-yu-e'),
            val: 3
          },
          {
            label: t('ding-dan-tui-kuan'),
            val: 4
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
    balanceList.loading = true
    const res = await queryUserBill({
      billType: balanceList.searchData.sortBy.val,
      endTime: balanceList.searchData.dates.val ? balanceList.searchData.dates.val[1] : '',
      pageNo: balanceList.pageNo,
      pageSize: balanceList.pageSize,
      searchKey: balanceList.searchData.input.val,
      selectType: 0,
      startTime: balanceList.searchData.dates.val ? balanceList.searchData.dates.val[0] : ''
    })
    if (res.data.code === 0) {
      //@ts-ignore
      balanceList.tableData = res.data.data.dtos
      //@ts-ignore
      balanceList.total = res.data.data.count
      balanceList.loading = false
    }
  }

  const exportExcels = () => {
    const url = '/finance/exportBillExcel/0',
      params = {
        billType: balanceList.searchData.sortBy.val,
        endTime: balanceList.searchData.dates.val ? balanceList.searchData.dates.val[1] : '',
        pageNo: balanceList.pageNo,
        pageSize: balanceList.pageSize,
        searchKey: balanceList.searchData.input.val,
        selectType: 0,
        startTime: balanceList.searchData.dates.val ? balanceList.searchData.dates.val[0] : ''
      },
      fileName = t('yong-hu-yueliu-shui')
    exportExcel(url, params, fileName)
  }
  return { balanceList, getList, time, exportExcels }
}
