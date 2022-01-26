import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { dispatcher } from '/@/api/admin/merchant'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

const { t } = I18n.global

export function getInfo() {
  const Checks = (rule: { field: string }, value: any, callback: (arg0?: Error | undefined) => void) => {
    if (rule.field === 'phoneNo') {
      if (!Number.isInteger(value) || value.toString().length < 10) {
        callback(new Error(t('omk')))
      }
    } else if (rule.field === 'password') {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error(t('plm')))
      }
    } else if (rule.field === 'checkPassword') {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error(t('plm')))
      } else if (
        merchantInfo.formInfo.password &&
        merchantInfo.formInfo.password !== merchantInfo.formInfo.checkPassword
      ) {
        callback(new Error(t('qwcaa')))
      }
    } else if (rule.field === 'email') {
      const reg = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
      if (!reg.test(value)) {
        callback(new Error(t('ikm')))
      }
    } else if (rule.field === 'accountPayee') {
      if (merchantInfo.formInfo.accountPayeeType === 0) {
        if (value.toString().length !== 16) {
          callback(new Error(t('wsc')))
        }
      } else {
        if (value.toString().length > 30) {
          callback(new Error(t('rfv')))
        }
      }
    } else if (rule.field === 'taxId') {
      if (value.toString().length !== 11) {
        callback(new Error(t('tgb')))
      }
    } else if (rule.field === 'greenCardNo') {
      if (value) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{16}$/
        if (!reg.test(value)) {
          callback(new Error(t('yhn')))
        }
      }
    } else if (rule.field === 'invoiceCode') {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7}$/
      if (!reg.test(merchantInfo.formInfo.invoiceCode)) {
        callback(new Error(t('ujm')))
      }
    } else if (rule.field === 'pecEmail') {
      const reg = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
      if (!reg.test(merchantInfo.formInfo.pecEmail)) {
        callback(new Error(t('ikm')))
      }
    } else if (rule.field === 'promotionCode') {
      if (value) {
        if (value.toString().length !== 6) {
          callback(new Error(t('olm')))
        }
      }
    }
    callback()
  }
  let merchantInfo = reactive({
    formInfo: {
      password: '', //密码
      checkPassword: '', // 确认密码
      corpName: '', //公司名称 companyName
      corpDesc: '', //公司简介 introduction
      merchantName: '', //商家名称 mName
      linkman: '', //联系人 pName
      phoneNo: '', //联系电话 phone
      countryCode: '39', //区号 phoneT
      email: '', //电子邮箱 email
      accountPayeeType: 0, //收款方式 payType
      // countryId: 1, //国家ID
      accountPayee: '', //收款账户 payNum
      taxId: '', //税号 sNum
      greenCardNo: '', //绿卡号 lNum
      invoiceCode: '', //电子发票码 fNum
      pecEmail: '', // Pec邮箱 pEmail
      weekStart: 1, //营业时间周 weekStart
      weekEnd: 7, //营业时间周 weekEnd
      time: '', //营业时间 time
      // provinceId: 0, //省 province
      // cityId: 0, //市 city
      address: '', //详细地址 address
      logoUrl: '', //logo logo
      images: '', //门店照片 mImg
      contractUrl: '', //合同照片 hImg
      promotionCode: '', //推广码 code
      longitude: '', //店铺经度 longitude
      latitude: '', //店铺维度 latitude
      dayStart: '', //一天营业开始时间
      endStart: '' //一天营业结束时间
    },
    rules: {
      phoneNo: [
        { required: true, message: t('qaz') },
        { validator: Checks, trigger: 'blur' }
      ],
      password: [
        { required: true, message: t('edcs') },
        { validator: Checks, trigger: 'blur' }
      ],
      checkPassword: [
        { required: true, message: t('qing-zai-ci-shu-ru-mi-ma') },
        { validator: Checks, trigger: 'blur' }
      ],
      corpName: [
        { required: true, message: t('ijngs') },
        { min: 1, max: 50, message: t('ikns'), trigger: 'blur' }
      ],
      merchantName: [
        { required: true, message: t('oljs') },
        { min: 1, max: 50, message: t('ikns'), trigger: 'blur' }
      ],
      linkman: [
        { required: true, message: t('okna') },
        { min: 1, max: 30, message: t('yhbs'), trigger: 'blur' }
      ],
      email: [
        { required: true, message: t('yuhs') },
        { validator: Checks, trigger: 'blur' }
      ],
      accountPayee: [
        { required: true, message: t('tysb') },
        { validator: Checks, trigger: 'blur' }
      ],
      taxId: [
        { required: true, message: t('moda') },
        { validator: Checks, trigger: 'blur' }
      ],
      greenCardNo: [{ validator: Checks, trigger: 'blur' }],
      invoiceCode: [
        { required: true, message: t('qing-shu-ru-zheng-que-de-dian-zi-fa-piao-ma') },
        { validator: Checks, trigger: 'blur' }
      ],
      pecEmail: [
        { required: true, message: t('qing-shu-ru-zheng-que-de-you-xiang') },
        { validator: Checks, trigger: 'blur' }
      ],
      time: [{ required: true, message: t('hjsb') }],
      address: [{ required: true, message: t('ygbs') }],
      promotionCode: [{ validator: Checks, trigger: 'blur' }]
    },
    phoneType: [
      {
        value: '39',
        label: '+39'
      }
    ],
    payType: [
      {
        value: 0,
        label: t('gyvs')
      },
      {
        value: 1,
        label: 'PayPal'
      },
      {
        value: 2,
        label: 'Google Pay'
      },
      {
        value: 3,
        label: 'Apple Pay'
      }
    ],
    emailType: [
      { value: 0, label: t('asegh') },
      { value: 1, label: t('vdca') }
    ],
    emailVal: 0,
    weeksList: [],
    weekList: [
      {
        value: 1,
        label: t('zhou-yi')
      },
      {
        value: 2,
        label: t('zhou-er')
      },
      {
        value: 3,
        label: t('zhou-san')
      },
      {
        value: 4,
        label: t('zhou-si')
      },
      {
        value: 5,
        label: t('zhou-wu')
      },
      {
        value: 6,
        label: t('msdhj')
      },
      {
        value: 7,
        label: t('zhou-ri')
      }
    ],
    success: false
  })
  const time = (date: any) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  const addMerchant = async (merchantId: number) => {
    merchantInfo.formInfo.dayStart = merchantInfo.formInfo.time ? merchantInfo.formInfo.time[0] : ''
    merchantInfo.formInfo.endStart = merchantInfo.formInfo.time ? merchantInfo.formInfo.time[1] : ''
    const res = await dispatcher({
      ...merchantInfo.formInfo,
      merchantId: merchantId ? merchantId : ''
    })
    if (res.data.code === 0) {
      let txt = ''
      if (merchantId) {
        txt = t('bian-ji-cheng-gong')
      } else {
        txt = t('lu-ru-cheng-gong')
      }
      merchantInfo.success = true
      merchantInfo.formInfo.time = ''
      ElMessage({
        message: txt,
        type: 'success'
      })
    }
  }
  return { merchantInfo, addMerchant }
}
