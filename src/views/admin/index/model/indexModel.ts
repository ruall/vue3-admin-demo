import { reactive } from 'vue'
import { getDashboard } from '/@/api/layout/index'
import I18n from '/@/lang/index'
const { t } = I18n.global

export function GetList() {
  let CardList = reactive({
    overview: [
      {
        id: 1,
        name: t('jin-ri-ding-dan-shu'),
        count: '0',
        next: {
          name: t('zuo-ri-ding-dan-shu'),
          count: '0'
        }
      },
      {
        id: 2,
        name: t('jin-ri-ding-dan-e'),
        count: '0',
        next: {
          name: t('zuo-ri-ding-dan-e'),
          count: '0'
        }
      },
      {
        id: 3,
        name: t('jin-ri-xin-zeng-yong-hu'),
        count: '0',
        next: {
          name: `${t('jin-ri-huo-yue-yong-hu')}(pv):`,
          count: '0'
        }
      },
      {
        id: 4,
        name: t('tiao-du-yu-jing'),
        count: '0',
        next: {
          name: t('bao-xiu-shi'),
          count: '0'
        }
      },
      {
        id: 5,
        name: t('jin-ri-sao-ma-ren-shu'),
        count: '0'
      },
      {
        id: 10,
        name: t('shang-jia-ru-zhu-shen-qing'),
        count: '0'
      }
    ]
  })
  const getList = async () => {
    let dashboard = await getDashboard()
    if (dashboard.data.data) {
      CardList.overview = [
        {
          id: 1,
          name: t('jin-ri-ding-dan-shu'),
          count: dashboard.data.data.orderNumToday,
          next: {
            name: `${t('zuo-ri-ding-dan-shu')}:`,
            count: dashboard.data.data.orderNumYesterday
          }
        },
        {
          id: 2,
          name: t('jin-ri-ding-dan-e'),
          count: dashboard.data.data.orderAmountToday,
          next: {
            name: `${t('zuo-ri-ding-dan-e')}:`,
            count: dashboard.data.data.orderAmountYesterday
          }
        },
        {
          id: 3,
          name: t('jin-ri-xin-zeng-yong-hu'),
          count: dashboard.data.data.newUserToday,
          next: {
            name: `${t('jin-ri-huo-yue-yong-hu')}(pv):`,
            count: dashboard.data.data.pv
          }
        },
        {
          id: 4,
          name: t('tiao-du-yu-jing'),
          count: dashboard.data.data.warnNum,
          next: {
            name: `${t('bao-xiu-shi')}:`,
            count: dashboard.data.data.eventNum
          }
        },
        {
          id: 5,
          name: t('jin-ri-sao-ma-ren-shu'),
          count: dashboard.data.data.scanNumToday
        },
        {
          id: 10,
          name: t('shang-jia-ru-zhu-shen-qing'),
          count: dashboard.data.data.enterApplyNum
        }
      ]
    }
  }
  getList()
  return { CardList }
}
