import { reactive } from 'vue'
import I18n from '/@/lang/index'
import dayjs from 'dayjs'
import { queryKpi } from '/@/api/admin/operation'

const { t } = I18n.global

export function info() {
  let infoList = reactive({
    tableData: [],
    columns: [{ prop: 'merchantName', label: t('shang-jia-ming-cheng') }, { slot: 'createTime' }],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: { dates: { label: t('ru-zhu-shi-jian'), val: '', type: 'timerange' } }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async (bizUserId: number) => {
    const res = await queryKpi({
      bizUserId: bizUserId,
      endTime: infoList.searchData.dates.val ? infoList.searchData.dates.val[1] : '',
      pageNo: infoList.pageNo,
      pageSize: infoList.pageSize,
      startTime: infoList.searchData.dates.val ? infoList.searchData.dates.val[0] : ''
    })
    if (res.data.code === 0) {
      //@ts-ignore
      infoList.tableData = res.data.data.dtos
      //@ts-ignore
      infoList.total = res.data.data.count
      infoList.loading = false
    }
  }
  return { infoList, getList, time }
}
