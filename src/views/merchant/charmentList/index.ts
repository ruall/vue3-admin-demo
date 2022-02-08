import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false
    },
    tableData: [],
    columns: [
      { prop: 'name1', label: '排序', width: '100px' },
      { prop: 'name2', label: '企业名称', width: '200px' },
      { prop: 'name3', label: '企业logo', width: '150px' },
      { slot: 'name4' },
      { prop: 'name5', label: '主营类目', width: '200px' },
      { prop: 'name6', label: '企业所在城市', width: '150px' },
      { prop: 'name7', label: '企业管理员', width: '150px' },
      { prop: 'name8', label: '入驻时间', width: '200px' },
      { prop: 'name9', label: '联系电话', width: '200px' },
      { slot: 'name10' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      dates: { label: '入驻时间', val: '', type: 'timerange' },
      input: { label: '搜索企业名称', val: '', showIcon: 'el-icon-search' },
      status: {
        label: '企业类型',
        val: '',
        type: 'select',
        list: [
          {
            label: '',
            val: 0
          },
          {
            label: '',
            val: 1
          }
        ]
      },
      categories: {
        label: '请选择主营类目',
        val: '',
        type: 'select',
        list: [
          {
            label: '',
            val: 0
          },
          {
            label: '',
            val: 1
          }
        ]
      },
      types: {
        label: '请选择状态',
        val: '',
        type: 'select',
        list: [
          {
            label: '',
            val: 0
          },
          {
            label: '',
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
          name1: 1,
          name2: 'xxx股份有限公司',
          name3: 'http',
          name4: 0,
          name5: '类目一 类目二 类目三',
          name6: '城市名称',
          name7: '企业管理员名称',
          name8: '2022/2/13 19:49',
          name9: '0039 18641930459',
          name10: 0
        },
        {
          name1: 2,
          name2: 'xxx股份有限公司',
          name3: 'http',
          name4: 1,
          name5: '类目一 类目二 类目三',
          name6: '城市名称',
          name7: '企业管理员名称',
          name8: '2022/2/13 19:49',
          name9: '0039 18641930459',
          name10: 0
        },
        {
          name1: 3,
          name2: 'xxx股份有限公司',
          name3: 'http',
          name4: 0,
          name5: '类目一 类目二 类目三',
          name6: '城市名称',
          name7: '企业管理员名称',
          name8: '2022/2/13 19:49',
          name9: '0039 18641930459',
          name10: 0
        },
        {
          name1: 4,
          name2: 'xxx股份有限公司',
          name3: 'http',
          name4: 0,
          name5: '类目一 类目二 类目三',
          name6: '城市名称',
          name7: '企业管理员名称',
          name8: '2022/2/13 19:49',
          name9: '0039 18641930459',
          name10: 0
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
  return { info, searchFun, handleCurrentChange, getList }
}
