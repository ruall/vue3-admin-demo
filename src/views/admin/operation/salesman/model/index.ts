import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { bizUser, addBiz } from '/@/api/admin/operation'

const { t } = I18n.global

export function sales() {
  let salesList = reactive({
    tableData: [],
    columns: [
      { prop: 'bizName', label: t('ye-wu-yuan-xing-ming') },
      { prop: 'phoneNo', label: t('shou-ji-hao') },
      { prop: 'promotionCode', label: t('tui-guang-ma') },
      { slot: 'createTime', label: t('lu-ru-shi-jian') },
      { prop: 'monthInvite', label: t('ben-yue-ye-ji') },
      { prop: 'totalInvite', label: t('zong-ye-ji') },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      sortBy: {
        label: t('pai-lie-fang-shi'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('zong-ye-ji'),
            val: 0
          },
          {
            label: t('lu-ru-shi-jian'),
            val: 1
          },
          {
            label: t('yue-ye-ji'),
            val: 2
          }
        ]
      }
    },
    phoneCodeList: [
      {
        value: 39,
        label: '+39'
      }
    ],
    showAddPop: false,
    salesInfo: {
      name: '',
      code: 39,
      phone: ''
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async () => {
    salesList.loading = true
    const res = await bizUser({
      orderSort: salesList.searchData.sortBy.val,
      pageNo: salesList.pageNo,
      pageSize: salesList.pageSize,
      searchKey: salesList.searchData.input.val
    })
    if (res.data.code === 0) {
      //@ts-ignore
      salesList.tableData = res.data.data.dtos
      //@ts-ignore
      salesList.total = res.data.data.count
      salesList.loading = false
    }
  }
  const addBizFn = async (bizName: string, phoneNo: number, code: number) => {
    const res = await addBiz({
      bizName,
      phoneNo: `${code}+${phoneNo}`
    })
    if (res.data.code === 0) {
      ElMessage({
        message: t('lu-ru-cheng-gong'),
        type: 'success'
      })
      salesList.showAddPop = false
      getList()
    }
  }
  return { salesList, getList, time, addBizFn }
}
