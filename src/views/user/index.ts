import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false
    },
    tableData: [],
    columns: [
      { prop: 'name1', label: '用户ID', width: '100px' },
      { prop: 'name2', label: '用户昵称', width: '200px' },
      { prop: 'name3', label: '用户头像', width: '150px' },
      { prop: 'name4', label: '绑定手机号', width: '150px' },
      { prop: 'name5', label: '注册时间', width: '200px' },
      { prop: 'name6', label: '用户所在城市', width: '150px' },
      { prop: 'name7', label: '所属企业', width: '150px' },
      { slot: 'name8' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      dates: { label: '注册时间', val: '', type: 'timerange' },
      input: { label: '用户昵称/ID/绑定手机号', val: '', showIcon: 'el-icon-search' },
      status: {
        label: '企业类型',
        val: '',
        type: 'select',
        list: [
          {
            label: '启用中',
            val: 0
          },
          {
            label: '封禁中',
            val: 1
          }
        ]
      }
    }
  })
  const searchFun = () => {
    console.log('searchBtn')
  }

  const getList = () => {
    info.loading = true
    setTimeout(() => {
      info.tableData = [
        {
          name1: '0001',
          name2: 'xxx用户',
          name3: 'http',
          name4: '0039 13333333333',
          name5: '2019/01/01 00:00:00',
          name6: '城市名称',
          name7: '企业名称',
          name8: 0
        },
        {
          name1: '0002',
          name2: 'xxx用户',
          name3: 'http',
          name4: '0039 13333333333',
          name5: '2019/01/01 00:00:00',
          name6: '城市名称',
          name7: '企业名称',
          name8: 1
        },
        {
          name1: '0003',
          name2: 'xxx用户',
          name3: 'http',
          name4: '0039 13333333333',
          name5: '2019/01/01 00:00:00',
          name6: '城市名称',
          name7: '企业名称',
          name8: 0
        }
      ]
      info.loading = false
      console.log(info.tableData)
    }, 3000)
  }
  const handleCurrentChange = (val: number) => {
    info.pageNo = val
    getList()
  }
  getList()
  return { info, searchFun, handleCurrentChange }
}
