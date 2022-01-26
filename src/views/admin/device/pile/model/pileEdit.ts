import { reactive } from 'vue'
import I18n from '/@/lang/index'
const { t } = I18n.global

export function merchant() {
  let merchantList = reactive({
    tableData: [],
    columns: [
      { prop: 'name', label: t('shang-jia-ming-cheng') },
      { prop: 'phone', label: t('shou-ji-hao') },
      { prop: 'address', label: t('di-zhi') },
      { slot: 'status' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '' }
    }
  })
  const getList = () => {
    setTimeout(() => {
      const arr: never[] = []
      // @ts-ignore
      merchantList.tableData = arr
      merchantList.pageNo = 1
      merchantList.pageSize = 10
      merchantList.total = 200
      merchantList.loading = false
    }, 2000)
  }
  getList()
  return { merchantList }
}
