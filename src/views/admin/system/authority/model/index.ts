import { reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import I18n from '/@/lang/index'
import { role, queryPermPool, addRold, delRole } from '/@/api/admin/setting'

const { t } = I18n.global

export function authority() {
  let authorityList = reactive({
    tableData: [],
    columns: [{ prop: 'role', label: t('quan-xian') }, { slot: 'operate' }],
    page: {},
    loading: true
  })
  let dialogInfo = reactive({
    isShow: false,
    title: '',
    roleId: '',
    defaultProps: {
      children: 'pools',
      label: (data: any) => {
        return data.permName
      }
    },
    authInfo: {
      name: '',
      routeList: [],
      permIds: [],
      checkedList: []
    }
  })
  //获取权限
  const getList = async () => {
    authorityList.loading = true
    const res = await role()
    if (res.data.code === 0) {
      //@ts-ignore
      authorityList.tableData = res.data.data
      authorityList.loading = false
    }
  }

  //获取权限列表
  const getPermPool = async (roleId?: number) => {
    const params = roleId ? { roleId } : {}
    const res = await queryPermPool(params)
    if (res.data.code === 0) {
      //@ts-ignore
      dialogInfo.authInfo.routeList = res.data.data
      if (roleId) {
        let arr: any[] = []
        //@ts-ignore
        res.data.data.forEach((val: any) => {
          arr.push(
            ...val.pools.map((v: any) => {
              if (v.exist === true) {
                return v.permId
              } else {
                return false
              }
            })
          )
        })

        arr = arr.filter((v) => v)
        //@ts-ignore
        dialogInfo.authInfo.checkedList = arr
      }
    }
  }

  const add = () => {
    dialogInfo.title = t('xin-zeng-quan-xian')
    dialogInfo.isShow = true
    dialogInfo.authInfo.name = ''
    dialogInfo.roleId = ''
    getPermPool()
  }
  const edit = (row: any) => {
    dialogInfo.authInfo.checkedList = []
    dialogInfo.title = t('bian-ji-quan-xian')
    dialogInfo.isShow = true
    dialogInfo.roleId = row.id
    // @ts-ignore
    dialogInfo.authInfo.name = row.role
    getPermPool(row.id)
  }
  const del = (row: any) => {
    ElMessageBox({
      title: t('xi-tong-ti-shi'),
      message: t('owiqndj'),
      showCancelButton: true,
      confirmButtonText: t('que-ding'),
      center: true,
      cancelButtonText: t('qu-xiao')
    })
      .then(async () => {
        const res = await delRole(row.id)
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

  //添加角色
  const save = async (obj: any) => {
    dialogInfo.authInfo.permIds = obj.getCheckedKeys()
    if (!dialogInfo.authInfo.name) {
      ElMessage({
        message: t('qing-tian-xie-quan-xian-ming-cheng'),
        type: 'warning'
      })
    } else if (dialogInfo.authInfo.permIds.length === 0) {
      ElMessage({
        message: t('qing-xuan-ze-ke-fang-wen-cao-zuo-mo-kuai'),
        type: 'warning'
      })
    } else {
      dialogInfo.isShow = false

      const res = await addRold({
        permIds: dialogInfo.authInfo.permIds,
        role: dialogInfo.authInfo.name,
        roleId: dialogInfo.roleId
      })
      if (res.data.code === 0) {
        ElMessage({
          message: dialogInfo.roleId ? t('qxaxa') : t('tian-jia-cheng-gong'),
          type: 'success'
        })
        getList()
      }
    }
  }

  return { getList, authorityList, dialogInfo, add, edit, del, save, getPermPool }
}
