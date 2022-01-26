import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import I18n from '/@/lang/index'
import { getList, orderRefund, orderSettle, deductPledge } from '/@/api/admin/order'
import dayjs from 'dayjs'
import { exportExcel } from '/@/utils/file'

const { t } = I18n.global

export function order() {
  const Checks = (rule: { field: string }, value: string, callback: (arg0?: Error | undefined) => void) => {
    if (rule.field === 'money') {
      const reg = /^[0-9]+(\.\d{0,1})?$/
      const num1 = parseFloat(orderList.dialogInfo.orderInfo.money)
      // @ts-ignore
      const num2 = parseFloat(orderList.dialogInfo.orderInfo.price)
      if (!reg.test(value)) {
        callback(new Error(t('qing-shu-ru-zheng-que-de-jine-jing-que-xiao-shu-dian-hou-yi-wei')))
      } else if (num1 > num2) {
        callback(new Error(t('shu-ru-jinebu-neng-da-yu-ding-dan-jin-e')))
      }
    }
    callback()
  }
  let orderList = reactive({
    tableData: [],
    columns: [
      { prop: 'orderNo', label: t('ding-dan-bian-hao'), width: '150px' },
      { prop: 'uId', label: t('yong-hu-id'), width: '120px' },
      { slot: 'createTime' },
      { prop: 'merchantName', label: t('zu-jie-shang-jia'), width: '120px' },
      { prop: 'lentDuration', label: t('zu-jie-shi-chang') },
      { prop: 'totalAmount', label: t('ding-dan-jin-e') },
      { prop: 'earnAmount', label: t('you-hui') },
      { prop: 'amount', label: t('shi-ji-xu-zhi-fu'), width: '120px' },
      { prop: 'merchantCommission', label: t('shang-jia-shou-ru') },
      { slot: 'payType' },
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
        label: t('ding-dan-zhuang-tai'),
        val: '',
        type: 'select',
        list: []
      },
      payType: {
        label: t('zhi-fu-fang-shi'),
        val: '',
        type: 'select',
        list: []
      },
      dates: { label: t('sou-suo-ri-qi'), val: '', type: 'timerange' }
    },
    dialogInfo: {
      dialogVisible: false,
      title: '',
      orderInfo: {
        userId: 0,
        id: 0,
        phone: '',
        price: 0,
        status: '',
        time: '',
        money: '',
        txt: ''
      },
      type: 0,
      rules: {
        money: [
          { required: true, message: t('qing-shu-ru-jine-jing-que-dao-xiao-shu-dian-hou-yi-wei') },
          { validator: Checks, trigger: 'blur' }
        ],
        txt: [
          { required: true, message: t('qing-shu-ru-li-you') },
          { validator: Checks, trigger: 'blur' }
        ]
      }
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
      orderStatus: orderList.searchData.state.val,
      pageNo: orderList.pageNo,
      pageSize: orderList.pageSize,
      // @ts-ignore
      payType: orderList.searchData.payType.val,
      searchKey: orderList.searchData.input.val,
      startTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[0]) : ''
    })
    if (res.data.data) {
      // @ts-ignore
      orderList.tableData = res.data.data.dtos
      // @ts-ignore
      orderList.total = res.data.data.count
      orderList.loading = false
    }
  }
  const getFormStation = () => {
    setTimeout(() => {
      const state = [
        {
          label: t('zu-jie-zhong'),
          val: 0
        },
        {
          label: t('dai-zhi-fu'),
          val: 1
        },
        {
          label: t('yi-wan-cheng'),
          val: 2
        },
        {
          label: t('yi-yu-qi'),
          val: 3
        },
        {
          label: t('tui-kuan-zhong'),
          val: 4
        },
        {
          label: t('yi-tui-kuan'),
          val: 5
        },
        {
          label: t('yi-kou-ya-jin'),
          val: 6
        }
      ]
      const payType = [
        {
          label: t('yu-e'),
          val: 0
        },
        {
          label: 'PayPal',
          val: 1
        },
        {
          label: t('ya-jin-zhi-fu'),
          val: 4
        }
      ]
      // @ts-ignore
      orderList.searchData.state.list = state
      // @ts-ignore
      orderList.searchData.payType.list = payType
    }, 1000)
  }

  const refund = (type: any, val: any) => {
    if (type === 0) {
      orderList.dialogInfo.title = t('tui-kuan')
      orderList.dialogInfo.type = 0
      orderList.dialogInfo.orderInfo = {
        userId: val.id,
        id: val.orderNo,
        phone: val.userNo,
        price: val.totalAmount,
        status: t('yuan-lu-tui-hui'),
        time: val.lentDuration,
        money: '',
        txt: ''
      }
    } else {
      orderList.dialogInfo.title = t('shou-dong-jie-suan')
      orderList.dialogInfo.type = 1
      orderList.dialogInfo.orderInfo = {
        userId: val.id,
        id: val.orderNo,
        phone: val.userNo,
        price: val.totalAmount,
        status: t('yuan-lu-tui-hui'),
        time: val.lentDuration,
        money: '',
        txt: ''
      }
    }
    orderList.dialogInfo.dialogVisible = true
  }
  const closeDialog = () => {
    orderList.dialogInfo.dialogVisible = false
  }
  const submitDialog = async () => {
    const num1 = parseFloat(orderList.dialogInfo.orderInfo.money)
    // @ts-ignore
    const num2 = parseFloat(orderList.dialogInfo.orderInfo.price)
    if (num1 < 0) {
      ElMessage({
        message: orderList.dialogInfo.type === 1 ? t('qing-shu-ru-jie-suan-jin-e') : t('qing-shu-ru-tui-kuan-jin-e'),
        type: 'warning'
      })
    } else if (!orderList.dialogInfo.orderInfo.txt.replace(/[, ]/g, '')) {
      orderList.dialogInfo.orderInfo.txt = ''
      ElMessage({
        message:
          orderList.dialogInfo.type === 1
            ? t('qing-shu-ru-shou-dong-jie-suan-li-you')
            : t('qing-shu-ru-tui-kuan-li-you'),
        type: 'warning'
      })
    } else {
      if (num1 > num2) {
        ElMessage({
          message: `${orderList.dialogInfo.title}${t('jinebu-neng-chao-guo-ding-dan-jin-e')}`,
          type: 'warning'
        })
      } else {
        let res
        if (orderList.dialogInfo.type === 0) {
          res = await orderRefund({
            orderId: orderList.dialogInfo.orderInfo.userId,
            refundAmount: orderList.dialogInfo.orderInfo.money,
            refundReason: orderList.dialogInfo.orderInfo.txt
          })
        } else {
          res = await orderSettle({
            orderId: orderList.dialogInfo.orderInfo.userId,
            settleAmount: orderList.dialogInfo.orderInfo.money,
            reason: orderList.dialogInfo.orderInfo.txt
          })
        }
        if (res.data.code === 0) {
          orderList.dialogInfo.dialogVisible = true
          ElMessage({
            message: orderList.dialogInfo.type === 1 ? t('shou-dong-jie-suan-cheng-gong') : t('tui-kuan-cheng-gong'),
            type: 'success'
          })
          getLists()
        }
        orderList.dialogInfo.dialogVisible = false
      }
    }
  }
  const deduction = (order: any) => {
    ElMessageBox.confirm(t('que-ding-kou-chu-ya-jin-ma'), t('xi-tong-ti-shi'), {
      confirmButtonText: t('que-ding'),
      cancelButtonText: t('qu-xiao'),
      type: 'warning'
    })
      .then(async () => {
        const res = await deductPledge({ orderId: order.id })
        if (res.data.code === 0) {
          getLists()
          orderList.pageNo = 1
          ElMessage({
            type: 'success',
            message: t('ya-jin-yi-kou-chu')
          })
        }
      })
      .catch(() => {})
  }
  getFormStation()
  const exportExcels = () => {
    const url = '/order/exportOrderExcel',
      params = {
        endTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[1]) : '',
        // @ts-ignore
        orderStatus: orderList.searchData.state.val,
        pageNo: orderList.pageNo,
        pageSize: orderList.pageSize,
        // @ts-ignore
        payType: orderList.searchData.payType.val,
        searchKey: orderList.searchData.input.val,
        startTime: orderList.searchData.dates.val ? time(orderList.searchData.dates.val[0]) : ''
      },
      fileName = t('ding-dan-shu-ju')
    exportExcel(url, params, fileName)
  }
  return { getLists, orderList, refund, deduction, closeDialog, submitDialog, exportExcels }
}
