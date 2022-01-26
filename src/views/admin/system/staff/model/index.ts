import { reactive } from 'vue'
import I18n from '/@/lang/index'
import { adminList, addAdmin, role, free, del, userInfo } from '/@/api/admin/setting'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = I18n.global

export function staff() {
  const Checks = (rule: { field: string }, value: any, callback: (arg0?: Error | undefined) => void) => {
    if (rule.field === 'name') {
      if (!value) {
        callback(new Error(t('qing-shu-ru-xing-ming')))
      }
    } else if (rule.field === 'role') {
      if (!value) {
        callback(new Error(t('qing-shu-ru-jiao-se-ming-cheng')))
      }
    } else if (rule.field === 'userName') {
      if (!value) {
        callback(new Error(t('qing-shu-ru-zhang-hao')))
      }
    } else if (rule.field === 'password') {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error(t('plm')))
      }
    } else if (rule.field === 'phone') {
      if (!value) {
        callback(new Error(t('qaz')))
      } else {
        const reg = /[^\d]/
        if (reg.test(value) || value.toString().length !== 10) {
          callback(new Error(t('shou-ji-hao-xian-zhi-10-wei-shu-zi')))
        }
      }
    } else if (rule.field === 'email') {
      if (!value) {
        callback(new Error(t('yuhs')))
      } else {
        const reg = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
        if (!reg.test(value)) {
          callback(new Error(t('ikm')))
        }
      }
    }
    callback()
  }
  let staffList = reactive({
    tableData: [],
    columns: [
      { prop: 'realName', label: t('yuan-gong-xing-ming') },
      { prop: 'role', label: t('jiao-se') },
      { prop: 'permName', label: t('quan-xian') },
      { prop: 'phone', label: t('shou-ji-hao') },
      { slot: 'status' },
      { slot: 'operate' }
    ],
    page: {},
    loading: true,
    searchData: {
      input: { label: t('qing-shu-ru-guan-jian-zi'), val: '', showIcon: 'el-icon-search' }
    },
    dialogInfo: {
      isShow: false,
      type: 0,
      adminId: 0,
      title: '',
      userInfo: {
        name: '',
        role: '',
        authority: 1,
        userName: '',
        password: '',
        phoneCode: '39',
        phone: '',
        email: ''
      },
      roleList: [],
      rules: {
        name: [{ validator: Checks, trigger: 'blur' }],
        role: [{ validator: Checks, trigger: 'blur' }],
        userName: [{ validator: Checks, trigger: 'blur' }],
        password: [
          { required: true, message: t('edcs') },
          { validator: Checks, trigger: 'blur' }
        ],
        phone: [{ validator: Checks, trigger: 'blur' }],
        email: [{ validator: Checks, trigger: 'blur' }]
      },
      phoneCode: [{ value: '39', label: '+39' }]
    }
  })

  //获取用户列表
  const getList = async () => {
    staffList.loading = true
    const res = await adminList({
      searchKey: staffList.searchData.input.val
    })
    if (res.data.code === 0) {
      //@ts-ignore
      staffList.tableData = res.data.data
      staffList.loading = false
    }
  }

  //新增/编辑用户
  const addUser = async () => {
    const form = reactive({
      adminNo: staffList.dialogInfo.userInfo.userName,
      adminPwd: staffList.dialogInfo.userInfo.password,
      email: staffList.dialogInfo.userInfo.email,
      phone: staffList.dialogInfo.userInfo.phoneCode + '+' + staffList.dialogInfo.userInfo.phone,
      realName: staffList.dialogInfo.userInfo.name,
      role: staffList.dialogInfo.userInfo.role,
      roleId: staffList.dialogInfo.userInfo.authority
    })
    if (staffList.dialogInfo.type === 2) {
      //@ts-ignore
      form.id = staffList.dialogInfo.adminId
    }
    const res = await addAdmin({ ...form })
    if (res.data.code === 0) {
      if (staffList.dialogInfo.type === 2) {
        ElMessage({
          message: t('qxaxa'),
          type: 'success'
        })
      } else {
        ElMessage({
          message: t('xin-zeng-cheng-gong'),
          type: 'success'
        })
      }
      staffList.dialogInfo.isShow = false
      getList()
    }
  }

  //获取权限列表
  const getRole = async () => {
    const res = await role()
    if (res.data.code === 0) {
      //@ts-ignore
      staffList.dialogInfo.roleList = res.data.data
    }
  }

  //冻结/解冻员工
  const freezeAdmin = (val: any) => {
    let txt = ''
    if (val.status === 1) {
      txt = `${t('qiwq')}？`
    } else {
      txt = `${t('wqkmd')}？`
    }
    ElMessageBox({
      title: t('xi-tong-ti-shi'),
      message: txt,
      showCancelButton: true,
      confirmButtonText: t('que-ding'),
      center: true,
      cancelButtonText: t('qu-xiao')
    })
      .then(async () => {
        const res = await free({
          adminId: val.id,
          form: {}
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
  }

  //删除员工
  const delFun = (adminId: number) => {
    ElMessageBox({
      title: t('xi-tong-ti-shi'),
      message: `${t('qwem')}？`,
      showCancelButton: true,
      confirmButtonText: t('que-ding'),
      center: true,
      cancelButtonText: t('qu-xiao')
    })
      .then(async () => {
        const res = await del(adminId)
        if (res.data.code === 0) {
          ElMessage({
            message: t('cao-zuo-cheng-gong'),
            type: 'success'
          })
          staffList.searchData.input.val = ''
          getList()
        }
      })
      .catch(() => {})
  }

  //获取用户详情
  const getInfo = async (adminId: number, type: number) => {
    if (type === 0) {
      staffList.dialogInfo.title = t('cha-kan-yuan-gong')
      staffList.dialogInfo.isShow = true
      staffList.dialogInfo.type = 1
    } else {
      getRole()
      staffList.dialogInfo.adminId = adminId
      staffList.dialogInfo.title = t('bian-ji-yuan-gong')
      staffList.dialogInfo.isShow = true
      staffList.dialogInfo.type = 2
    }
    const res = await userInfo({ adminId })
    if (res.data.code === 0) {
      //@ts-ignore
      const { adminNo, adminPwd, email, permName, phoneNo, realName, role } = res.data.data
      staffList.dialogInfo.userInfo.name = realName
      staffList.dialogInfo.userInfo.userName = adminNo
      staffList.dialogInfo.userInfo.password = adminPwd
      staffList.dialogInfo.userInfo.email = email
      staffList.dialogInfo.userInfo.role = role

      if (type === 0) {
        staffList.dialogInfo.userInfo.phone = phoneNo
        staffList.dialogInfo.userInfo.authority = permName
      } else if (type === 1) {
        staffList.dialogInfo.userInfo.phone = phoneNo.indexOf('+') !== -1 ? phoneNo.split('+')[1] : phoneNo
        staffList.dialogInfo.userInfo.phoneCode = phoneNo.indexOf('+') !== -1 ? phoneNo.split('+')[0] : '39'
        const authority = staffList.dialogInfo.roleList.filter((val) => {
          //@ts-ignore
          return val.role === permName
        })
        //@ts-ignore
        staffList.dialogInfo.userInfo.authority = authority[0].id
      }
    }
  }
  return { staffList, getList, getRole, addUser, freezeAdmin, delFun, getInfo }
}
