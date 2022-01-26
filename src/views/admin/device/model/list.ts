import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { getRecord, repair } from '/@/api/admin/device'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = I18n.global

export function list() {
  let errList = reactive({
    tableData: [],
    columns: [
      { slot: 'device' },
      { prop: 'reason', label: t('wen-ti-miao-shu') },
      { slot: 'images' },
      { slot: 'createTime' },
      { slot: 'updateTime' },
      { slot: 'status' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      device: {
        label: t('gu-zhang-she-bei'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('chong-dian-zhuang'),
            val: 0
          },
          {
            label: t('chong-dian-bao'),
            val: 1
          }
        ]
      },
      status: {
        label: t('zhuang-tai'),
        val: '',
        type: 'select',
        list: [
          {
            label: t('dai-pai-cha'),
            val: 0
          },
          {
            label: t('wei-xiu-zhong'),
            val: 1
          },
          {
            label: t('yi-wei-xiu'),
            val: 2
          },
          {
            label: t('fei-gu-zhang'),
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
  const getList = async () => {
    errList.loading = true
    const res = await getRecord({
      endTime: errList.searchData.dates.val ? time(errList.searchData.dates.val[1]) : '',
      pageNo: errList.pageNo,
      pageSize: errList.pageSize,
      startTime: errList.searchData.dates.val ? time(errList.searchData.dates.val[0]) : '',
      status: errList.searchData.status.val,
      termType: errList.searchData.device.val
    })
    if (res.data.code === 0) {
      // @ts-ignore
      errList.tableData = res.data.data.dtos
      // @ts-ignore
      errList.total = res.data.data.count
      errList.loading = false
    }
  }

  const changeStatus = (val: number, status: number, id: number, termNo?: number) => {
    if (val === 0) {
      ElMessageBox({
        title: t('xi-tong-ti-shi'),
        message: `${t('que-ding-biao-ji-wei')}${t('wei-xiu')}/${t('yi-wei-xiu')}/${t('fei-gu-zhang')}吗？`,
        showCancelButton: true,
        confirmButtonText: t('que-ding'),
        center: true,
        cancelButtonText: t('qu-xiao')
      })
        .then(async () => {
          const res = await repair({
            id,
            status,
            termNo
          })
          if (res.data.code === 0) {
            ElMessage({
              message: t('cao-zuo-cheng-gong'),
              type: 'success'
            })
            getList()
          }
        })
        .catch(() => {})
    } else {
      ElMessageBox.prompt(t('qing-shu-ru-she-bei-bian-hao'), t('bao-fei-chu-li'), {
        confirmButtonText: t('que-ding'),
        cancelButtonText: t('qu-xiao'),
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: t('qing-shu-ru-she-bei-bian-hao')
      }).then(async ({ value }) => {
        if (value) {
          const res = await repair({
            id,
            status,
            termNo: value
          })
          if (res.data.code === 0) {
            ElMessage({
              message: t('cao-zuo-cheng-gong'),
              type: 'success'
            })
            getList()
          }
        } else {
          ElMessage({
            message: t('qing-shu-ru-she-bei-bian-hao'),
            type: 'warning'
          })
        }
      })
    }
  }
  return { errList, getList, time, changeStatus }
}
