import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { notice } from '/@/api/admin/operation'
import dayjs from 'dayjs'

const { t } = I18n.global

export function announcement() {
  let announcementList = reactive({
    tableData: [],
    columns: [
      { slot: 'createTime' },
      { prop: 'title', label: t('biao-ti') },
      { prop: 'content', label: t('zheng-wen') },
      { prop: 'realName', label: t('fa-bu-ren') }
    ],
    page: {},
    loading: true
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const getList = async () => {
    announcementList.loading = true
    const res = await notice()
    if (res.data.code === 0) {
      // @ts-ignore
      announcementList.tableData = res.data.data
      announcementList.loading = false
    }
  }
  getList()
  return { announcementList, time, getList }
}
