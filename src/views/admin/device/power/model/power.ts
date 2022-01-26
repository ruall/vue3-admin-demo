import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { getList } from '/@/api/admin/device'
import dayjs from 'dayjs'

const { t } = I18n.global

export function power() {
  let powerList = reactive({
    tableData: [],
    columns: [{ prop: 'deviceNo', label: t('chong-dian-bao-bian-hao') }, { slot: 'createTime' }, { slot: 'status' }],
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
            label: t('dai-tou-fang'),
            val: 0
          },
          {
            label: t('dai-chu-jie'),
            val: 1
          },
          {
            label: t('chu-jie-zhong'),
            val: 2
          },
          {
            label: t('diu-shi'),
            val: 3
          },
          {
            label: t('yi-bao-fei'),
            val: 4
          }
        ]
      },
      dates: { label: t('lu-ru-shi-jian'), val: '', type: 'timerange' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getLists = async () => {
    powerList.loading = true
    const res = await getList({
      endTime: powerList.searchData.dates.val ? time(powerList.searchData.dates.val[1]) : '',
      pageNo: powerList.pageNo,
      pageSize: powerList.pageSize,
      searchKey: powerList.searchData.input.val,
      startTime: powerList.searchData.dates.val ? time(powerList.searchData.dates.val[0]) : '',
      status: powerList.searchData.sortBy.val
    })
    if (res.data.code === 0) {
      // @ts-ignore
      powerList.tableData = res.data.data.dtos
      // @ts-ignore
      powerList.total = res.data.data.count
      powerList.loading = false
    }
  }
  return { powerList, getLists, time }
}
