import { reactive } from 'vue'
import I18n from '/@/lang/index'
import dayjs from 'dayjs'
import { getApplyList } from '/@/api/admin/merchant'

const { t } = I18n.global

export function settle() {
  let settleList = reactive({
    tableData: [],
    columns: [
      { prop: 'merchantName', label: t('shang-jia-ming-cheng') },
      { prop: 'linkman', label: t('tyhn') },
      { prop: 'phoneNo', label: t('shou-ji-hao') },
      { prop: 'email', label: t('ybfs'), width: '300px' },
      { prop: 'address', label: t('di-zhi'), width: '300px' },
      { slot: 'createTime', label: t('shen-qing-shi-jian') },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async () => {
    settleList.loading = true
    const res = await getApplyList({
      pageNo: settleList.pageNo,
      pageSize: settleList.pageSize,
      searchKey: settleList.searchData.input.val
    })
    if (res.data.code === 0) {
      // @ts-ignore
      settleList.tableData = res.data.data.dtos
      // @ts-ignore
      settleList.total = res.data.data.count
      settleList.loading = false
    }
  }
  return { settleList, time, getList }
}
