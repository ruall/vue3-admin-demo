import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { queryMerchantWithdrew, pass, reject } from '/@/api/admin/finance'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'
import { ElMessage } from 'element-plus'

const { t } = I18n.global

export function withdraw() {
  let withdrawList = reactive({
    tableData: [],
    columns: [
      { slot: 'selection' },
      { prop: 'merchantName', label: t('shang-jia-ming-cheng'), width: '150px' },
      { slot: 'createTime' },
      { prop: 'accountPayee', label: t('qwxsa'), width: '200px' },
      { slot: 'amount' },
      { slot: 'fee' },
      { slot: 'withdrewType' },
      { slot: 'status' },
      { prop: 'realName', label: t('chu-li-ren') },
      { slot: 'completeTime' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' },
      sortBy: {
        label: t('zhuang-tai'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('dai-chu-li'),
            val: 0
          },
          {
            label: t('deng-dai-da-kuan'),
            val: 1
          },
          {
            label: t('yi-da-kuan'),
            val: 2
          },
          {
            label: t('yi-bo-hui'),
            val: 3
          }
        ]
      },
      withdraw: {
        label: t('ti-xian-fang-shi'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('zi-dong-da-kuan'),
            val: 0
          },
          {
            label: t('shou-dong-shen-qing'),
            val: 1
          }
        ]
      },
      dates: { label: t('jiao-yi-shi-jian'), val: '', type: 'timerange' }
    },
    dialogInfo: {
      isShow: false,
      type: 0,
      title: '',
      withdrewIds: [],
      overrule: {
        content: ''
      }
    }
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async () => {
    withdrawList.loading = true
    const res = await queryMerchantWithdrew({
      endTime: withdrawList.searchData.dates.val ? withdrawList.searchData.dates.val[1] : '',
      pageNo: withdrawList.pageNo,
      pageSize: withdrawList.pageSize,
      searchKey: withdrawList.searchData.input.val,
      startTime: withdrawList.searchData.dates.val ? withdrawList.searchData.dates.val[0] : '',
      withdrewStatus: withdrawList.searchData.sortBy.val,
      withdrewType: withdrawList.searchData.withdraw.val
    })
    if (res.data.code === 0) {
      //@ts-ignore
      withdrawList.tableData = res.data.data.dtos
      //@ts-ignore
      withdrawList.total = res.data.data.count
      withdrawList.loading = false
    }
  }
  const exportExcels = () => {
    const url = '/finance/exportMerchantWithdrewExcel',
      params = {
        endTime: withdrawList.searchData.dates.val ? withdrawList.searchData.dates.val[1] : '',
        pageNo: withdrawList.pageNo,
        pageSize: withdrawList.pageSize,
        searchKey: withdrawList.searchData.input.val,
        startTime: withdrawList.searchData.dates.val ? withdrawList.searchData.dates.val[0] : '',
        withdrewStatus: withdrawList.searchData.sortBy.val,
        withdrewType: withdrawList.searchData.withdraw.val
      },
      fileName = t('opmsakd')
    exportExcel(url, params, fileName)
  }

  //批量通过
  const passFun = async () => {
    if (withdrawList.dialogInfo.type === 1) {
      if (!withdrawList.dialogInfo.overrule.content) {
        ElMessage({
          message: t('qing-tian-xie-bo-hui-li-you'),
          type: 'warning'
        })
      } else {
        const res = await reject({
          id: withdrawList.dialogInfo.withdrewIds[0],
          reason: withdrawList.dialogInfo.overrule.content
        })
        if (res.data.code === 0) {
          ElMessage({
            message: t('cao-zuo-cheng-gong'),
            type: 'success'
          })
          withdrawList.dialogInfo.isShow = false
          getList()
        }
      }
    } else {
      if (withdrawList.dialogInfo.type === 2) {
        if (!withdrawList.dialogInfo.withdrewIds.length) {
          ElMessage({
            message: t('qing-xuan-ze-xu-yao-cao-zuo-de-shu-ju'),
            type: 'warning'
          })
          return false
        }
      }
      const res = await pass({
        withdrewIds: withdrawList.dialogInfo.withdrewIds
      })
      if (res.data.code === 0) {
        ElMessage({
          message: t('cao-zuo-cheng-gong'),
          type: 'success'
        })
        withdrawList.dialogInfo.isShow = false
        getList()
      }
    }
    withdrawList.dialogInfo.withdrewIds = []
  }
  return { withdrawList, getList, time, exportExcels, passFun }
}
