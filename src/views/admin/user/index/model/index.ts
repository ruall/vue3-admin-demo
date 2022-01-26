import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { getList, freezeUser, dispatcher } from '/@/api/admin/user'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

const { t } = I18n.global

export function userList() {
  let orderList = reactive({
    tableData: [],
    columns: [
      { prop: 'uId', label: t('yong-hu-id'), width: '120px' },
      { prop: 'email', label: t('you-xiang'), width: '200px' },
      { slot: 'loginNo' },
      { slot: 'createTime' },
      { prop: 'lentTime', label: t('zu-jie-ci-shu') },
      { prop: 'totalConsumer', label: t('lei-ji-xiao-fei') },
      { slot: 'isBindCard' },
      { slot: 'status' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      state: {
        label: t('yong-hu-zhuang-tai'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('dong-jie-zhong'),
            val: 0
          },
          {
            label: t('zheng-chang-shi-yong'),
            val: 1
          }
        ]
      },
      payType: {
        label: t('yong-hu-shen-fen'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('pu-tong-yong-hu'),
            val: 0
          },
          {
            label: t('tiao-du-yuan'),
            val: 1
          }
        ]
      },
      sortBy: {
        label: t('pai-lie-fang-shi'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('zhu-ce-shi-jian'),
            val: 0
          },
          {
            label: t('zu-jie-ci-shu'),
            val: 1
          },
          {
            label: t('lei-ji-xiao-fei'),
            val: 2
          }
        ]
      },
      dates: { label: t('zhu-ce-shi-jian'), val: '', type: 'timerange' }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getLists = async () => {
    orderList.loading = true
    const res = await getList({
      endTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[1]) : '',
      // @ts-ignore
      orderSort: orderList.searchData.sortBy.val,
      pageNo: orderList.pageNo,
      pageSize: orderList.pageSize,
      // @ts-ignore
      role: orderList.searchData.payType.val,
      searchKey: orderList.searchData.input.val,
      startTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[0]) : '',
      userStatus: orderList.searchData.state.val
    })
    if (res.data.code === 0) {
      // @ts-ignore
      orderList.tableData = res.data.data.dtos
      // @ts-ignore
      orderList.total = res.data.data.count
      orderList.loading = false
    }
  }
  const freezeUserFn = async (userId: any) => {
    const res = await freezeUser({ userId })
    if (res.data.code === 0) {
      ElMessage({
        message: t('cao-zuo-cheng-gong'),
        type: 'success'
      })
      getLists()
    }
  }

  const dispatcherFn = async (userId: any) => {
    const res = await dispatcher({ userId })
    if (res.data.code === 0) {
      ElMessage({
        message: t('cao-zuo-cheng-gong'),
        type: 'success'
      })
      getLists()
    }
  }
  return { orderList, getLists, time, freezeUserFn, dispatcherFn }
}
