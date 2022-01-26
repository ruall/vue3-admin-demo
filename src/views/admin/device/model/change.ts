import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { getDisList } from '/@/api/admin/device'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function change() {
  let changeList = reactive({
    tableData: [],
    columns: [
      { prop: 'phoneNo', label: t('tiao-du-yuan') },
      { slot: 'createTime', label: t('tiao-du-shi-jian') },
      { prop: 'merchantName', label: t('shang-jia') },
      { prop: 'putIn', label: t('fang-ru-chong-dian-bao-shu') },
      { prop: 'tackOut', label: t('qu-chu-chong-dian-bao-shu') }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      dates: { label: t('lu-ru-shi-jian'), val: '', type: 'timerange' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getLists = async () => {
    changeList.loading = true
    const res = await getDisList({
      endTime: changeList.searchData.dates.val ? time(changeList.searchData.dates.val[1]) : '',
      pageNo: changeList.pageNo,
      pageSize: changeList.pageSize,
      searchKey: changeList.searchData.input.val,
      startTime: changeList.searchData.dates.val ? time(changeList.searchData.dates.val[0]) : ''
    })
    if (res.data.code === 0) {
      // @ts-ignore
      changeList.tableData = res.data.data.dtos
      // @ts-ignore
      changeList.total = res.data.data.count
      changeList.loading = false
    }
  }
  const exportExcels = () => {
    const url = '/terminal/exportDispatchRecord',
      params = {
        endTime: changeList.searchData.dates.val ? time(changeList.searchData.dates.val[1]) : '',
        pageNo: changeList.pageNo,
        pageSize: changeList.pageSize,
        searchKey: changeList.searchData.input.val,
        startTime: changeList.searchData.dates.val ? time(changeList.searchData.dates.val[0]) : ''
      },
      fileName = t('tiao-du-ji-lu')
    exportExcel(url, params, fileName)
  }
  return { changeList, getLists, time, exportExcels }
}
